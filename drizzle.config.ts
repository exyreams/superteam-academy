/**
 * @fileoverview Drizzle ORM configuration.
 * Configures the database schema, migrations output, and Supabase-specific roles/RLS.
 */
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./lib/db/schema.ts",
	out: "./lib/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
	// Required for RLS / pgPolicy support
	entities: {
		roles: {
			provider: "supabase",
		},
	},
	verbose: true,
	strict: true,
});
