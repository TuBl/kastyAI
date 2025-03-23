import { z } from "zod";
import { tool } from "ai";

async function getWeather({ location }: { location: string }) {''
  return { location, temperature: 72 + Math.floor(Math.random() * 21) - 10 };
}

async function convertFahrenheitToCelsius({
  temperature,
}: {
  temperature: number;
}) {
  const celsius = Math.round((temperature - 32) * (5 / 9));
  return {
    celsius,
  };
}

const conversionTool = tool({
  description: "Convert a temperature in fahrenheit to celsius",
  parameters: z.object({
    temperature: z
      .number()
      .describe("The temperature in fahrenheit to convert"),
  }),
  execute: convertFahrenheitToCelsius,
});

const weatherTool = tool({
  description: "Get the weather in a location (fahrenheit)",
  parameters: z.object({
    location: z.string().describe("The location to get the weather for"),
  }),
  execute: getWeather,
});

export { conversionTool, weatherTool };
