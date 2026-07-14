ALTER TABLE "site_text" ADD COLUMN IF NOT EXISTS "value_pt" text;
--> statement-breakpoint
ALTER TABLE "content_card" ADD COLUMN IF NOT EXISTS "i18n" text DEFAULT '{}' NOT NULL;
