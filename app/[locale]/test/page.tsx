
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function ThemeSandbox() {
  return (
    <div className="min-h-screen w-full">
      <header className="p-8 border-b border-border bg-bg-base">
        <h1 className="text-2xl font-bold uppercase tracking-widest mb-2">Theme Sandbox // Dark Mode Variants</h1>
        <p className="text-ink-secondary">Comparing different dark mode color palettes. All elements have `radius: 0`.</p>
      </header>

      {/* 1. CURRENT THEME (Greenish) */}
      <ThemeSection 
        title="1. Current Theme (Deep Swamp Green)" 
        description="The current production theme. Variables rooted in `globals.css`."
        className="bg-bg-base text-ink-primary"
        borderColor="border-border"
        mutedColor="text-ink-secondary"
      />

      {/* 2. ZINC THEME (Neutral) */}
      <ThemeSection 
        title="2. Zinc Theme (Neutral)" 
        description="Standard neutral dark mode. Clean, professional, no tint."
        className="bg-[#09090b] text-[#fafafa]"
        borderColor="border-[#27272a]"
        mutedColor="text-[#a1a1aa]"
        overrideStyles={{
          backgroundColor: '#09090b',
          color: '#fafafa',
          borderColor: '#27272a'
        }}
      />



      {/* 4. STONE THEME (Warm) */}
      <ThemeSection 
        title="4. Stone Theme (Warm)" 
        description="Slightly brown/warm-tinted dark mode. Earthy, substantial."
        className="bg-[#0c0a09] text-[#fafaf9]"
        borderColor="border-[#292524]"
        mutedColor="text-[#a8a29e]"
        overrideStyles={{
          backgroundColor: '#0c0a09',
          color: '#fafaf9',
          borderColor: '#292524'
        }}
      />
    </div>
  );
}

function ThemeSection({ 
  title, 
  description, 
  className, 
  borderColor, 
  mutedColor,
  overrideStyles = {} 
}: { 
  title: string, 
  description: string, 
  className: string,
  borderColor: string,
  mutedColor: string,
  overrideStyles?: React.CSSProperties
}) {
  // We use inline styles for the overrides to ensure they beat Tailwind classes without complex merging
  // But for internal components (Button, Input), we might need to be clever or just rely on the parent container class cascading?
  // Actually, Shadcn components use `bg-background` etc., so we might need to override css variables locally for true accuracy.
  
  // Let's use a style block to override variables locally for this section container!
  const variableOverrides = overrideStyles.backgroundColor ? {
    '--bg-base': overrideStyles.backgroundColor,
    '--background': overrideStyles.backgroundColor,
    '--ink-primary': overrideStyles.color,
    '--foreground': overrideStyles.color,
    '--border': overrideStyles.borderColor,
    '--input': overrideStyles.borderColor,
    '--ink-secondary': '#71717a', // Approximation
    '--muted-foreground': '#71717a',
  } as React.CSSProperties : {};

  return (
    <section 
      className={`p-12 border-b ${borderColor} ${className}`}
      style={variableOverrides}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-widest">{title}</h2>
          <p className={`text-sm ${mutedColor} mt-1`}>{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Column 1: Forms & Interactive */}
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-xs uppercase font-bold tracking-widest opacity-70">Buttons</label>
              <div className="flex flex-wrap gap-4">
                <Button>Primary Action</Button>
                {/* Secondary often uses bg-secondary, we need to ensure variables map linearly if we want accurate test */}
                <Button variant="secondary" className="bg-[#27272a] text-white hover:bg-[#3f3f46]">Secondary</Button>
                <Button variant="outline" className={`border ${borderColor} hover:bg-white/5`}>Outline</Button>
                <Button variant="ghost" className="hover:bg-white/5">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs uppercase font-bold tracking-widest opacity-70">Inputs</label>
              <div className="grid gap-4 max-w-sm">
                <Input placeholder="Standard Input..." className={`border ${borderColor} bg-transparent`} />
                <Input placeholder="Disabled Input..." disabled className={`border ${borderColor}`} />
                <div className="flex gap-2">
                  <Input placeholder="Search..." className={`border ${borderColor} bg-transparent`} />
                  <Button>Search</Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs uppercase font-bold tracking-widest opacity-70">Select / Dropdown</label>
              <div className="max-w-xs">
                <Select>
                  <SelectTrigger className={`border ${borderColor} bg-transparent`}>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent className={`bg-[${overrideStyles.backgroundColor || 'var(--bg-base)'}] border ${borderColor}`}>
                    <SelectItem value="1">Option One</SelectItem>
                    <SelectItem value="2">Option Two</SelectItem>
                    <SelectItem value="3">Option Three</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Column 2: Cards & Content */}
          <div className="space-y-6">
            <label className="text-xs uppercase font-bold tracking-widest opacity-70">Cards</label>
            
            {/* Standard Card */}
            <Card className={`bg-transparent border ${borderColor} shadow-none`}>
              <CardHeader>
                <CardTitle>Standard Card</CardTitle>
                <CardDescription className={mutedColor}>This is a standard card component.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed opacity-80">
                  The quick brown fox jumps over the lazy dog. This text demonstrates the contrast and readability of the font on this background.
                </p>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="ghost" size="sm" className="hover:bg-white/5">Cancel</Button>
                <Button size="sm">Confirm</Button>
              </CardFooter>
            </Card>

            {/* "Landing" Card Variant (if applicable, mocking styled div) */}
            <div className={`p-6 border ${borderColor} bg-white/5 flex flex-col gap-4`}>
               <div className="flex items-center justify-between">
                 <span className="font-bold uppercase tracking-widest text-sm">Feature Card</span>
                 <span className={`text-xs ${mutedColor}`}>PRO</span>
               </div>
               <p className="text-sm opacity-80">
                 A manually styled container representing a feature or content block with a slight transparent background.
               </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
