CREATE TYPE "public"."report_channel_type_enum" AS ENUM('text', 'forum');--> statement-breakpoint
ALTER TABLE "public_setting"."report" ADD COLUMN "forum_channel" text;--> statement-breakpoint
ALTER TABLE "public_setting"."report" ADD COLUMN "forum_completed_tag" text;--> statement-breakpoint
ALTER TABLE "public_setting"."report" ADD COLUMN "forum_ignored_tag" text;--> statement-breakpoint
ALTER TABLE "public_setting"."report" ADD COLUMN "channel_type" "report_channel_type_enum" DEFAULT 'text' NOT NULL;