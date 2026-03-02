CREATE TABLE "wallet" (
	"id" text PRIMARY KEY NOT NULL,
	"address" text NOT NULL,
	"userId" text NOT NULL,
	"provider" text DEFAULT 'solana' NOT NULL,
	"isPrimary" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "wallet_address_unique" UNIQUE("address")
);
--> statement-breakpoint
ALTER TABLE "wallet" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "walletAddress" text;--> statement-breakpoint
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "backend_full_access" ON "wallet" AS PERMISSIVE FOR ALL TO "postgres" USING (true) WITH CHECK (true);