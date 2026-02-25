import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const keypairPath = path.resolve(process.cwd(), "wallets", "xp-mint-keypair.json");
    if (!fs.existsSync(keypairPath)) {
        return NextResponse.json({ error: "XP Mint keypair not found. Please ensure wallets/xp-mint-keypair.json exists." }, { status: 404 });
    }
    const raw = fs.readFileSync(keypairPath, "utf-8");
    const secretKeyArray = JSON.parse(raw);
    
    return NextResponse.json({ secretKey: secretKeyArray });
  } catch (error: unknown) {
      console.error("Error reading XP Mint keypair:", error);
      return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown Error" }, { status: 500 });
  }
}
