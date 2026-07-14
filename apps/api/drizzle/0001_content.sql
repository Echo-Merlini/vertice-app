CREATE TABLE IF NOT EXISTS "content_card" (
	"id" text PRIMARY KEY NOT NULL,
	"section" text DEFAULT 'work' NOT NULL,
	"slug" text NOT NULL,
	"n" text DEFAULT '' NOT NULL,
	"category" text,
	"name" text NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"tags" text DEFAULT '[]' NOT NULL,
	"accent" text,
	"href" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "content_card_section_idx" ON "content_card" ("section","sort_order");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "site_text" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text DEFAULT '' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
