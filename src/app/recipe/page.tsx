"use client";

import { experimental_useObject as useObject } from "ai/react";
import recipeSchema from "@/schemas/recipe";

export default function Page() {
  const { object, submit } = useObject({
    api: "/api/recipe",
    schema: recipeSchema,
  });

  
  return (
    <div className="flex flex-col justify-start items-start gap-8 w-full p-6">
      <button
        className="bg-purple-900 py-2 px-4 rounded-md"
        onClick={() =>
          submit(
            "Palestinian Kunefe! Kunefe is a traditional Middle Eastern dessert originating from Palestine and the Levant. It's a shredded phyllo pastry dessert made with layers of phyllo dough, cheese, and syrup. The shredded phyllo is typically soaked in a sweet syrup, which gives kunefe its signature flavor and texture. This sweet treat is often served warm and topped with pistachios or sesame seeds. Kunefe is a popular dessert in countries such as Turkey, Lebanon, and Syria, and is often enjoyed on special occasions and celebrations. Its rich flavor and unique texture make it a beloved dessert in the Middle East."
          )
        }
      >
        Generate a recipe
      </button>

      <section className="flex flex-col gap-4 bg-slate-50 text-purple-800 w-full p-4 rounded-md">
        <div className="min-h-20 shadow-md pl-4 pt-4">
          <h3>Name</h3>
          <p>{object?.recipe?.name}</p>
        </div>

        <div className="min-h-20 shadow-md pl-4 pt-4">
          <h3>Ingredients</h3>
          {object?.recipe?.ingredients &&
            object?.recipe?.ingredients.map((ingredient, index) => (
              <div key={index}>
                <p>{ingredient?.name}</p>
                <p>{ingredient?.amount}</p>
              </div>
            ))}
        </div>

        <div className="min-h-20 shadow-md pl-4 pt-4">
          <h3>steps</h3>
          {object?.recipe?.steps &&
            object?.recipe?.steps.map((step, index) => (
              <div key={index}>
                <p>{step}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
