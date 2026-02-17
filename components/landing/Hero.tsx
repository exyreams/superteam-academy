'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { TypingAnimation } from "@/components/shared/TypingAnimation";

// Hero Section
// Displays the primary value proposition with a large typographic title,
// description, and call-to-action buttons.
// Also includes a technical typing animation of a Solana program.
export function Hero() {
  const t = useTranslations("Hero");

  return (
    <header className="px-6 lg:px-12 py-16 lg:py-[120px] border-b border-ink-secondary/20 dark:border-border grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative">
      <div className="flex flex-col justify-center">
        {/* Entrance Badge */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-ink-primary text-bg-base inline-block px-3 py-1 mb-4 self-start text-[11px] uppercase tracking-widest"
        >
          {t("badge")}
        </motion.span>
        
        {/* Main Title - Uses Rich Text for Line Breaks */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[60px] lg:text-[120px] mb-6"
        >
          {t.rich("title", {
            br: () => <br />,
          })}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base lg:text-[18px] text-ink-secondary max-w-[500px] mb-10"
        >
          {t("description")}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Button
              asChild
              variant="landingPrimary"
              className="rounded-none uppercase text-xs font-bold px-8 py-4 h-auto font-mono gap-3 w-full sm:w-auto justify-center"
            >
              <Link href="/courses">
                {t("explore")} <ArrowRightIcon size={16} />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Button
              asChild
              variant="landingSecondary"
              className="rounded-none uppercase text-xs font-bold px-8 py-4 h-auto font-mono gap-3 w-full sm:w-auto justify-center"
            >
              <Link href="https://discord.gg/superteam" target="_blank" rel="noopener noreferrer">{t("discord")}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:flex relative border border-ink-secondary/20 dark:border-border bg-[rgba(13,20,18,0.02)] items-center justify-center p-4 lg:p-8 min-h-[300px] lg:min-h-[400px]"
      >
        {/* Corner Accents with floating animation */}
        {[
          { top: '-10px', left: '-10px' },
          { top: '-10px', right: '-10px' },
          { bottom: '-10px', left: '-10px' },
          { bottom: '-10px', right: '-10px' },
        ].map((pos, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -5, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute w-5 h-5 border border-ink-primary bg-bg-base"
            style={pos}
          />
        ))}

        <TypingAnimation
          text={`pub fn process_instruction(
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
          speed={15}
          className="text-[9px] lg:text-[10px] whitespace-pre font-mono overflow-x-auto max-w-full"
          syntaxHighlight={true}
        />
      </motion.div>
    </header>
  );
}
