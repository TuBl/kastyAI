import { z } from "zod";

export const recipeSchema = z.object({
  recipe: z.object({
    ingredients: z.array(
      z.object({
        amount: z.string().describe("The amount needed of each ingredient"),
        name: z.string().describe("the name of the ingredient"),
      })
    ),
    name: z.string().describe("name of the recipe"),
    steps: z.array(z.string()).describe("steps required to make the recipe"),
  }),
});

export default recipeSchema;