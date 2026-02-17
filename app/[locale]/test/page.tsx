"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ModeToggle } from "@/components/theme-toggle";

export default function ToastTestPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 bg-bg-base p-8 relative">
      <div className="absolute top-8 right-8">
        <ModeToggle />
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-ink-primary">
          System Notifications
        </h1>
        <p className="text-ink-secondary font-mono">
          Testing interaction response modules (&quot;Sonner&quot;).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
        <Button 
          variant="outline" 
          onClick={() => toast("Operation Successful", {
            description: "Module completion verified on-chain.",
            action: {
              label: "View Tx",
              onClick: () => console.log("Undo"),
            },
          })}
        >
          Default Toast
        </Button>

        <Button 
          variant="default"
          onClick={() => toast.success("Module Completed", {
            description: "You have earned 100 XP.",
          })}
        >
          Success Toast
        </Button>

        <Button 
          variant="destructive"
          onClick={() => toast.error("Connection Failed", {
            description: "Wallet adapter rejected the request.",
          })}
        >
          Error Toast
        </Button>

        <Button 
          variant="secondary"
          onClick={() => toast.info("New Quest Available", {
            description: "Check your dashboard for details.",
          })}
        >
          Info Toast
        </Button>
        
        <Button 
          variant="ghost"
          className="col-span-1 md:col-span-2 border border-dashed border-ink-secondary/30 text-ink-secondary hover:text-ink-primary hover:bg-ink-secondary/10"
          onClick={() => {
            const promise = new Promise((resolve) => setTimeout(resolve, 2000));
            toast.promise(promise, {
              loading: 'Processing Transaction...',
              success: () => {
                return `Transaction Confirmed: 0x...${Math.random().toString(16).slice(2, 6)}`;
              },
              error: 'Error',
            });
          }}
        >
          Simulate Transaction (Promise)
        </Button>
      </div>
    </div>
  );
}
