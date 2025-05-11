ALTER TABLE "report" RENAME COLUMN "message_id" TO "thread_id";--> statement-breakpoint
ALTER TABLE "report" RENAME COLUMN "user_id" TO "target_user_id";--> statement-breakpoint
ALTER TABLE "report" DROP CONSTRAINT "report_guild_id_guild_id_fk";
--> statement-breakpoint
ALTER TABLE "report" ALTER COLUMN "channel_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "report" ADD COLUMN "target_channel_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "report" ADD COLUMN "target_message_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_guild_id_report_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public_setting"."report"("guild_id") ON DELETE cascade ON UPDATE no action;