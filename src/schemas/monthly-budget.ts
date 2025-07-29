import { z } from "zod";

export const MonthlyBudgetInsightsSchema = z.object({
  totalSpendingByMonth: z
    .array(
      z.object({
        month: z.string().describe("Month label, e.g., 'June 2024'"),
        total: z.number().describe("Total spending for this month."),
      })
    )
    .describe("Total spending categorized by month."),
  topCategoriesByMonth: z
    .array(
      z.object({
        month: z.string(),
        categories: z.array(
          z.object({
            category: z.string(),
            amount: z.number(),
          })
        ),
      })
    )
    .describe("Top categories of spending per month."),
  flaggedItems: z.array(z.string()).describe("Items flagged for review."),
  spendingTrends: z
    .string()
    .describe("Summary of how spending has changed over time."),
  recommendations: z
    .array(z.string())
    .describe("Actionable suggestions to improve budgeting habits."),
});
