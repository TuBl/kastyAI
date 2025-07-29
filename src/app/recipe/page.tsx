// app/recipe/page.tsx
import { describeImage } from "@/app/actions";
import ClientRecipeForm from "@/components/ClientRecipeForm"

export default async function RecipePage() {
  const description = await describeImage("kastana.jpg");

  return (
    <div className="flex flex-col justify-start items-start gap-8 w-full p-6">
      <p className="italic text-slate-600">
        🖼️ Image description: {description}
      </p>
      <ClientRecipeForm />
    </div>
  );
}
