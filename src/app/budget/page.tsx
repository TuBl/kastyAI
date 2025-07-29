import { UploadForm } from "@/components/ClientBudgetForm";

export default function BudgetInsightsPage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Monthly Budget Insights</h1>
      <UploadForm />
    </main>
  );
}
