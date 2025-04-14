import { jsonb, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { TableZodSchemas } from "../types";
import { timestamps } from "../utils/drizzle";
import { guild } from "./guild";

const actionType = ["update_guild_setting"] as const;

const targetName = [
	// guild.ts
	"guild",
	// setting.ts
	"join_message",
	"leave_message",
	"report",
	"timeout_log",
	"kick_log",
	"ban_log",
	"voice_log",
	"message_delete_log",
	"message_edit_log",
	"message_expand",
	"auto_change_verify_level",
	"auto_public",
	"auto_create_thread",
	"auto_mod",
] as const;

export const actionTypeEnum = pgEnum("action_type", actionType);
export const actionTypeEnumSchema = createSelectSchema(actionTypeEnum);

export const targetNameEnum = pgEnum("target_name", targetName);
export const targetNameEnumSchema = createSelectSchema(targetNameEnum);

export const auditLog = pgTable("audit_log", {
	guildId: text()
		.primaryKey()
		.references(() => guild.id, { onDelete: "cascade" }),
	authorId: text().notNull(),
	targetName: targetNameEnum().notNull(),
	actionType: actionTypeEnum().notNull(),
	oldValue: jsonb(),
	newValue: jsonb(),
	createdAt: timestamps.createdAt,
});

export const auditLogSchema: TableZodSchemas = {
	db: createInsertSchema(auditLog),
};
