CREATE TYPE "public"."report_type" AS ENUM('message', 'user');--> statement-breakpoint
CREATE TABLE "report" (
	"guild_id" text NOT NULL,
	"type" "report_type" NOT NULL,
	"user_id" text NOT NULL,
	"channel_id" text,
	"message_id" text,
	"create_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "audit_log" ALTER COLUMN "guild_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;