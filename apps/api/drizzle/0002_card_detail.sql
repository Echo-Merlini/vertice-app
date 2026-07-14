ALTER TABLE "content_card" ADD COLUMN IF NOT EXISTS "detail" text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE "content_card" ADD COLUMN IF NOT EXISTS "image" text;
--> statement-breakpoint
ALTER TABLE "content_card" ADD COLUMN IF NOT EXISTS "gallery" text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE "content_card" ADD COLUMN IF NOT EXISTS "year" text;
--> statement-breakpoint
ALTER TABLE "content_card" ADD COLUMN IF NOT EXISTS "role" text;
