/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { processBudgetFile } from "@/app/budget/actions";

export function UploadForm() {
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const output = await processBudgetFile(formData);

    if ("error" in output) {
      setError(output.error);
      setResult(null);
    } else {
      setResult(output);
      console.log("output", output);
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" accept=".csv" required />
      <button type="submit" className="mt-2 btn btn-primary">
        Upload and Analyze
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 bg-black text-white p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Insights</h2>

          <h3 className="font-semibold">Total Spending By Month</h3>
          <ul>
            {result.totalSpendingByMonth.map((item: any, i: number) => (
              <li key={i}>
                {item.month}: ${item.total.toFixed(2)}
              </li>
            ))}
          </ul>

          <h3 className="mt-4 font-semibold">Top Categories By Month</h3>
          {result.topCategoriesByMonth.map((monthBlock: any, i: number) => (
            <div key={i} className="mb-4">
              <p className="font-bold">{monthBlock.month}</p>
              <ul className="pl-4 list-disc">
                {monthBlock.categories.map((cat: any, j: number) => (
                  <li key={j}>
                    {cat.category}: ${cat.amount.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <h3 className="mt-4 font-semibold">Flagged Items</h3>
          <ul>
            {result.flaggedItems.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-4 font-semibold">Spending Trends</h3>
          <p>{result.spendingTrends}</p>

          <h3 className="mt-4 font-semibold">Recommendations</h3>
          <ul>
            {result.recommendations.map((rec: string, i: number) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
