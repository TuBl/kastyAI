import { Command } from "commander";
import { ollama } from "ollama-ai-provider";

export async function buildProgram(
  defaultModel:
    | Parameters<typeof ollama.languageModel>[0]
    | Parameters<typeof ollama.textEmbeddingModel>[0],
  action: (model: string) => Promise<void>
) {
  const program = new Command();

  program
    .option("-m, --model [model]", "The model to be used", defaultModel)
    .action(async (options) => {
      await action(options.model);
    });

  // @ts-expect-error deal
  program.parse();
}
