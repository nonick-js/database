ALTER TABLE "report" DROP COLUMN "channel_id";--> statement-breakpoint
ALTER TABLE "report" DROP COLUMN "closed_at";--> statement-breakpoint
ALTER TABLE "public_setting"."report" DROP COLUMN "forum_channel";--> statement-breakpoint
ALTER TABLE "public_setting"."report" DROP COLUMN "channel_type";--> statement-breakpoint
DROP TYPE "public"."report_channel_type_enum";