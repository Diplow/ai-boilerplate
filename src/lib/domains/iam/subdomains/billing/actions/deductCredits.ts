import type { CreditRepository } from "../repositories";
import { tokensToCreditCost } from "../utils";
import { ensureActivePeriod } from "./ensureActivePeriod";

export async function deductCredits(
  repository: CreditRepository,
  userId: string,
  inputTokens: number,
  outputTokens: number,
  model: string,
): Promise<{ creditCost: number; remainingCredits: number }> {
  const balance = await ensureActivePeriod(repository, userId);
  const creditCost = tokensToCreditCost(inputTokens, outputTokens, model);
  const remainingCredits = await repository.deductCredits(balance.id, creditCost);

  return { creditCost, remainingCredits };
}
