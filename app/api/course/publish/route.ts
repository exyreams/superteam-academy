import { NextResponse } from "next/server";
import { Keypair, PublicKey, Connection, SystemProgram } from "@solana/web3.js";
import { Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";
import fs from "fs";
import path from "path";
import IDL from "@/lib/anchor/idl/onchain_academy.json";
import type { OnchainAcademy } from "@/lib/anchor/idl/onchain_academy";
import { 
  getConfigPda,
  getCoursePda, 
  CLUSTER_URL 
} from "@/lib/anchor/client";
import { client } from "@/sanity/client";

const connection = new Connection(CLUSTER_URL, "confirmed");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courseSlug, creatorAddress } = body;

    if (!courseSlug || !creatorAddress) {
      return NextResponse.json(
        { error: "Missing required parameters" }, 
        { status: 400 }
      );
    }

    const creatorPublicKey = new PublicKey(creatorAddress);

    // 1. Load Backend Signer (Authority keypair)
    const keypairPath = path.resolve(process.cwd(), "wallets", "signer.json");
    if (!fs.existsSync(keypairPath)) {
      return NextResponse.json(
        { error: "Backend signer keypair not found." }, 
        { status: 500 }
      );
    }
    
    const raw = fs.readFileSync(keypairPath, "utf-8");
    const secretKeyArray = JSON.parse(raw);
    const backendSigner = Keypair.fromSecretKey(new Uint8Array(secretKeyArray));

    // 2. Fetch course from Sanity
    const course = await client.fetch(
      `*[_type == "course" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        description,
        difficulty,
        track_id,
        track_level,
        xp_per_lesson,
        creator_reward_xp,
        min_completions_for_reward,
        "moduleCount": count(modules),
        modules[]-> {
          lessons[]-> {
            _id
          }
        }
      }`,
      { slug: courseSlug },
    );

    if (!course) {
        return NextResponse.json({ error: "Course not found in Sanity" }, { status: 404 });
    }

    interface SanityModule {
        lessons?: { _id: string }[];
    }

    // Validate course data
    const totalLessons = course.modules?.reduce(
        (sum: number, module: SanityModule) => sum + (module.lessons?.length || 0),
        0,
    ) || 0;

    if (totalLessons === 0) {
        return NextResponse.json({ error: "Course must have at least one lesson" }, { status: 400 });
    }

    // 3. Initialize Program
    const anchorWallet = new Wallet(backendSigner);
    const provider = new AnchorProvider(connection, anchorWallet, AnchorProvider.defaultOptions());
    const program = new Program<OnchainAcademy>(IDL as OnchainAcademy, provider);

    // 4. Derive PDAs
    const [configPda] = getConfigPda();
    const [coursePda] = getCoursePda(courseSlug);

    const difficultyNum = typeof course.difficulty === "string" 
      ? (course.difficulty === "advanced" ? 3 : course.difficulty === "intermediate" ? 2 : 1) 
      : (course.difficulty || 1);

    // 5. Send Transaction
    const tx = await program.methods
      .createCourse({
        courseId: course.slug,
        creator: creatorPublicKey,
        contentTxId: new Array(32).fill(0), // Placeholder
        lessonCount: totalLessons,
        difficulty: difficultyNum,
        xpPerLesson: course.xp_per_lesson || 100,
        trackId: course.track_id || 1,
        trackLevel: course.track_level || 1,
        prerequisite: null,
        creatorRewardXp: course.creator_reward_xp || 50,
        minCompletionsForReward: course.min_completions_for_reward || 5,
      })
      .accountsPartial({
        course: coursePda,
        config: configPda,
        authority: backendSigner.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([backendSigner])
      .rpc();

    return NextResponse.json({ 
        success: true, 
        signature: tx,
        coursePda: coursePda.toBase58(),
        message: "Course published successfully."
    });
    
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create course" }, 
      { status: 500 }
    );
  }
}
