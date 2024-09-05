import { PgTable, varchar, text, serial } from "drizzle-orm/pg-core";

export const MockPrep = PgTable('mockPrep',
    {
        id: serial('id').primaryKey(),
        jsonMockResponse: text('jsonMockResponse').notNull(),
        jobPosition: varchar('jobDescription').notNull(),
        jobExperience: varchar('jobExperience').notNull(),
        createdBy: varchar('createdBy').notNull(),
        createdAt: varchar('createdAt').notNull(),
        mockId: varchar('mockId').notNull()
    }
)