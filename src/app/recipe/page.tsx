"use client";

import { experimental_useObject as useObject } from "ai/react";
import recipeSchema from "@/schemas/recipe";
import { useState } from "react";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const { object, submit } = useObject({
    api: "/api/recipe",
    schema: recipeSchema,
  });

  const handleSubmit = () => {
    submit({prompt});
  };

  return (
    <div className="flex flex-col justify-start items-start gap-8 w-full p-6">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your recipe prompt"
        className="w-full p-2 border-2 text-purple-800 border-purple-900 rounded-md"
      />
      <button
        className="bg-purple-900 py-2 px-4 rounded-md text-white"
        onClick={handleSubmit}
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
