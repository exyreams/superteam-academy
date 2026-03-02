import { sql } from "drizzle-orm";
import {
	boolean,
	jsonb,
	pgPolicy,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

/**
 * @fileoverview PostgreSQL database schema using Drizzle ORM.
 * Follows Better Auth requirements with custom extensions for Superteam Academy.
 * All tables implement Row Level Security (RLS) with full access granted to the `postgres` role.
 */

/**
 * Core user identity, profile details, and preferences.
 * The `id` field is typically the user's Solana public key.
 */
export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("emailVerified").notNull(),
	image: text("image"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
	role: text("role").default("learner").notNull(),
	bio: text("bio"),
	location: text("location"),
	github: text("github"),
	twitter: text("twitter"),
	website: text("website"),
	language: text("language").default("en"),
	publicVisibility: boolean("publicVisibility").default(true).notNull(),
	notifications: jsonb("notifications")
		.$type<{
			newCourses: boolean;
			leaderboardAlerts: boolean;
			directMessages: boolean;
		}>()
		.default({
			newCourses: true,
			leaderboardAlerts: false,
			directMessages: true,
		}),
	onboardingCompleted: boolean("onboardingCompleted").default(false).notNull(),
	preferredTracks: text("preferredTracks"),
	avatarSeed: text("avatarSeed"),
	walletAddress: text("walletAddress"),
}).enableRLS();

export const userBackendPolicy = pgPolicy("backend_full_access", {
	for: "all",
	to: "postgres",
	using: sql`true`,
	withCheck: sql`true`,
}).link(user);

/**
 * Active user authentication sessions.
 * Required by Better Auth.
 */
export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expiresAt").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
	ipAddress: text("ipAddress"),
	userAgent: text("userAgent"),
	userId: text("userId")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
}).enableRLS();

export const sessionBackendPolicy = pgPolicy("backend_full_access", {
	for: "all",
	to: "postgres",
	using: sql`true`,
	withCheck: sql`true`,
}).link(session);

/**
 * Links users to authentication providers (e.g. Solana, GitHub).
 * Required by Better Auth.
 */
export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("accountId").notNull(),
	providerId: text("providerId").notNull(),
	userId: text("userId")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("accessToken"),
	refreshToken: text("refreshToken"),
	idToken: text("idToken"),
	accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
	refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
}).enableRLS();

export const accountBackendPolicy = pgPolicy("backend_full_access", {
	for: "all",
	to: "postgres",
	using: sql`true`,
	withCheck: sql`true`,
}).link(account);

/**
 * Verification tokens for email verification and password reset.
 * Required by Better Auth.
 */
export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expiresAt").notNull(),
	createdAt: timestamp("createdAt"),
	updatedAt: timestamp("updatedAt"),
}).enableRLS();

export const verificationBackendPolicy = pgPolicy("backend_full_access", {
	for: "all",
	to: "postgres",
	using: sql`true`,
	withCheck: sql`true`,
}).link(verification);

/**
 * Dedicated storage for connected wallets.
 * Supports multiple wallets per user.
 */
export const wallet = pgTable("wallet", {
	id: text("id").primaryKey(),
	address: text("address").notNull().unique(),
	userId: text("userId")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	provider: text("provider").default("solana").notNull(),
	isPrimary: boolean("isPrimary").default(false).notNull(),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
}).enableRLS();

export const walletBackendPolicy = pgPolicy("backend_full_access", {
	for: "all",
	to: "postgres",
	using: sql`true`,
	withCheck: sql`true`,
}).link(wallet);
