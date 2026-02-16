import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <header className="px-12 py-[120px] border-b border-ink-primary grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
      <div className="flex flex-col justify-center">
        <span className="bg-ink-primary text-bg-base inline-block px-3 py-1 mb-4 self-start text-[11px] uppercase tracking-widest">
          Terminal Access Granted
        </span>
        <h1 className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[120px] mb-6">
          FORGE YOUR
          <br />
          FUTURE ON
          <br />
          SOLANA
        </h1>
        <p className="text-[18px] text-ink-secondary max-w-[500px] mb-10">
          The premier technical training ground for the next generation of
          Solana architects. Move from zero to production-ready with our
          hardware-accelerated curriculum.
        </p>
        <div className="flex gap-4">
          <Button
            asChild
            variant="landingPrimary"
            className="rounded-none uppercase text-xs font-bold px-8 py-4 h-auto font-mono gap-3"
          >
            <Link href="#">
              Explore Courses <ArrowRight size={16} />
            </Link>
          </Button>
          <Button
            asChild
            variant="landingSecondary"
            className="rounded-none uppercase text-xs font-bold px-8 py-4 h-auto font-mono gap-3"
          >
            <Link href="#">Join Discord</Link>
          </Button>
        </div>
      </div>

      <div className="relative border border-ink-primary bg-[rgba(13,20,18,0.02)] flex items-center justify-center p-8 min-h-[400px]">
        {/* Corner Accents */}
        <div className="absolute -top-[10px] -left-[10px] w-5 h-5 border border-ink-primary bg-bg-base" />
        <div className="absolute -top-[10px] -right-[10px] w-5 h-5 border border-ink-primary bg-bg-base" />
        <div className="absolute -bottom-[10px] -left-[10px] w-5 h-5 border border-ink-primary bg-bg-base" />
        <div className="absolute -bottom-[10px] -right-[10px] w-5 h-5 border border-ink-primary bg-bg-base" />

        <div className="text-[10px] text-ink-tertiary opacity-70 whitespace-pre font-mono">
          {`pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let account = next_account_info(accounts_iter)?;
    
    if account.owner != program_id {
        return Err(ProgramError::IncorrectProgramId);
    }

    msg!("Academy protocol initialized...");
    Ok(())
}`}
        </div>
      </div>
    </header>
  );
}
