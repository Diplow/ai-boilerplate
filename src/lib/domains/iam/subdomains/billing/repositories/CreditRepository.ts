import type { CreditBalance, CreateBalanceInput } from "../objects";

export interface CreditRepository {
  findActiveBalance(userId: string): Promise<CreditBalance | null>;
  createBalance(input: CreateBalanceInput): Promise<CreditBalance>;
  deductCredits(balanceId: number, cost: number): Promise<number>;
}
