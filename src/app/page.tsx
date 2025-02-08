"use client";

import { useCompletion } from "ai/react";

export default function Page() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    api: "/api/completion",
  });

  return (
    <div className="flex justify-center items-center gap-">
      <form onSubmit={handleSubmit}>
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          id="input"
        />
        <button type="submit">Submit</button>
      </form>
      <div>{completion}</div>
    </div>
  );
}
