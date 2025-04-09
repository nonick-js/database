CREATE SCHEMA "public_setting";
--> statement-breakpoint
CREATE TABLE "audit_log" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"author_id" text NOT NULL,
	"action_type" integer NOT NULL,
	"old_value" jsonb,
	"new_value" jsonb,
	"create_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"discriminator" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "guild" (
	"id" text PRIMARY KEY NOT NULL,
	"locale" text DEFAULT 'ja' NOT NULL,
	"before_verify_level" integer,
	"enable_experimental_features" boolean DEFAULT false NOT NULL,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "public_setting"."auto_change_verify_level" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"enabled" boolean NOT NULL,
	"start_hour" integer NOT NULL,
	"end_hour" integer NOT NULL,
	"level" integer NOT NULL,
	"enable_log" boolean NOT NULL,
	"log_channel" text,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "public_setting"."auto_create_thread" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"enabled" boolean NOT NULL,
	"channels" text[] NOT NULL,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "public_setting"."auto_mod" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"enabled" boolean NOT NULL,
	"enable_domain_filter" boolean NOT NULL,
	"enable_invite_url_filter" boolean NOT NULL,
	"enable_token_filter" boolean NOT NULL,
	"domain_list" text[] NOT NULL,
	"ignore_channels" text[] NOT NULL,
	"ignore_roles" text[] NOT NULL,
	"enable_log" boolean NOT NULL,
	"log_channel" text,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "public_setting"."auto_public" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"enabled" boolean NOT NULL,
	"channels" text[] NOT NULL,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "public_setting"."ban_log" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"enabled" boolean NOT NULL,
	"channel" text,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "public_setting"."join_message" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"enabled" boolean NOT NULL,
	"channel" text,
	"ignore_bot" boolean NOT NULL,
	"message" jsonb NOT NULL,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "public_setting"."kick_log" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"enabled" boolean NOT NULL,
	"channel" text,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "public_setting"."leave_message" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"enabled" boolean NOT NULL,
	"channel" text NOT NULL,
	"ignore_bot" boolean NOT NULL,
	"message" jsonb NOT NULL,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "public_setting"."message_delete_log" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"enabled" boolean NOT NULL,
	"channel" text,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "public_setting"."message_edit_log" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"enabled" boolean NOT NULL,
	"channel" text,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "public_setting"."message_expand" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"enabled" boolean NOT NULL,
	"allow_external_guild" boolean NOT NULL,
	"ignore_channels" text[] NOT NULL,
	"ignore_channel_types" text[] NOT NULL,
	"ignore_prefixes" text[] NOT NULL,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "public_setting"."report" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"channel" text,
	"include_moderator" boolean NOT NULL,
	"show_progress_button" boolean NOT NULL,
	"enable_mention" boolean NOT NULL,
	"mention_roles" text[] NOT NULL,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "public_setting"."timeout_log" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"enabled" boolean NOT NULL,
	"channel" text,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "public_setting"."voice_log" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"enabled" boolean NOT NULL,
	"channel" text,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public_setting"."auto_change_verify_level" ADD CONSTRAINT "auto_change_verify_level_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public_setting"."auto_create_thread" ADD CONSTRAINT "auto_create_thread_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public_setting"."auto_mod" ADD CONSTRAINT "auto_mod_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public_setting"."auto_public" ADD CONSTRAINT "auto_public_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public_setting"."ban_log" ADD CONSTRAINT "ban_log_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public_setting"."join_message" ADD CONSTRAINT "join_message_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public_setting"."kick_log" ADD CONSTRAINT "kick_log_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public_setting"."leave_message" ADD CONSTRAINT "leave_message_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public_setting"."message_delete_log" ADD CONSTRAINT "message_delete_log_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public_setting"."message_edit_log" ADD CONSTRAINT "message_edit_log_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public_setting"."message_expand" ADD CONSTRAINT "message_expand_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public_setting"."report" ADD CONSTRAINT "report_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public_setting"."timeout_log" ADD CONSTRAINT "timeout_log_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public_setting"."voice_log" ADD CONSTRAINT "voice_log_guild_id_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guild"("id") ON DELETE cascade ON UPDATE no action;