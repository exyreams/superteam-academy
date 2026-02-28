"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const languages = [
	{ code: "en", label: "EN", full: "English (EN)" },
	{ code: "es", label: "ES", full: "Español (ES)" },
	{ code: "pt-br", label: "PT-BR", full: "Português (PT-BR)" },
	{ code: "hi", label: "HI", full: "हिंदी (HI)" },
	{ code: "zh", label: "ZH", full: "中文 (ZH)" },
	{ code: "fr", label: "FR", full: "Français (FR)" },
	{ code: "ru", label: "RU", full: "Русский (RU)" },
	{ code: "jp", label: "JP", full: "日本語 (JP)" },
];

type SupportedLocale = "en" | "es" | "pt-br" | "hi" | "zh" | "fr" | "ru" | "jp";

interface LanguageDropdownProps {
	variant?: "simple" | "detailed";
	className?: string;
}

export function LanguageDropdown({
	variant = "simple",
	className,
}: LanguageDropdownProps) {
	const locale = useLocale();
	const t = useTranslations("Footer");
	const router = useRouter();
	const pathname = usePathname();

	const handleLanguageChange = (newLocale: string) => {
		router.replace(pathname, { locale: newLocale as SupportedLocale });
	};

	if (variant === "detailed") {
		return (
			<Select value={locale} onValueChange={handleLanguageChange}>
				<SelectTrigger
					className={cn(
						"w-auto border border-ink-secondary/20 dark:border-border px-3 py-1.5 h-auto bg-bg-base text-ink-secondary hover:text-ink-primary font-mono text-[11px] uppercase ring-offset-0 focus:ring-0 flex justify-start items-center gap-2 shadow-sm rounded-none data-placeholder:text-ink-secondary cursor-pointer relative z-50",
						className,
					)}
				>
					<span className="font-bold text-ink-primary whitespace-nowrap">
						{t("language")}
					</span>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{languages.map((lang) => (
						<SelectItem
							key={lang.code}
							value={lang.code}
							className="text-[11px] uppercase"
						>
							{lang.full}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		);
	}

	return (
		<Select value={locale} onValueChange={handleLanguageChange}>
			<SelectTrigger
				className={cn(
					"w-[80px] h-auto py-1 px-2 text-[11px] uppercase border-ink-secondary bg-transparent",
					className,
				)}
			>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{languages.map((lang) => (
					<SelectItem
						key={lang.code}
						value={lang.code}
						className="text-[11px] uppercase"
					>
						{lang.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
