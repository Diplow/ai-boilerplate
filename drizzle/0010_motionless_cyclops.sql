ALTER TABLE "pg-drizzle_conversation" DROP CONSTRAINT "pg-drizzle_conversation_contactId_pg-drizzle_contact_id_fk";
--> statement-breakpoint
ALTER TABLE "pg-drizzle_conversation" ADD CONSTRAINT "pg-drizzle_conversation_contactId_pg-drizzle_contact_id_fk" FOREIGN KEY ("contactId") REFERENCES "public"."pg-drizzle_contact"("id") ON DELETE cascade ON UPDATE no action;