import { and, lte, gte, sql } from "drizzle-orm";
import { db, creditBalance } from "~/server/db";
import type { CreditRepository } from "../../CreditRepository";
import type { CreditBalance, CreateBalanceInput } from "../../../objects";

export class DrizzleCreditRepository implements CreditRepository {
  async findActiveBalance(userId: string): Promise<CreditBalance | null> {
    const now = new Date();
    const rows = await db
      .select()
      .from(creditBalance)
      .where(
        and(
          sql`${creditBalance.userId} = ${userId}`,
          lte(creditBalance.periodStart, now),
          gte(creditBalance.periodEnd, now),
        ),
      )
      .limit(1);

    return rows[0] ?? null;
  }

  async createBalance(input: CreateBalanceInput): Promise<CreditBalance> {
    const rows = await db
      .insert(creditBalance)
      .values({
        userId: input.userId,
        remainingCredits: input.remainingCredits,
        monthlyAllowance: input.monthlyAllowance,
        periodStart: input.periodStart,
        periodEnd: input.periodEnd,
      })
      .returning();

    return rows[0]!;
  }

  async deductCredits(balanceId: number, cost: number): Promise<number> {
    const rows = await db
      .update(creditBalance)
      .set({
        remainingCredits: sql`${creditBalance.remainingCredits} - ${cost}`,
      })
      .where(sql`${creditBalance.id} = ${balanceId}`)
      .returning({ remainingCredits: creditBalance.remainingCredits });

    return rows[0]!.remainingCredits;
  }
}
