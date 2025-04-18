# How to use this repo

This can serve as a starting point for any AI-driven application that you wanna use the
Vercel AI SDK in. I have included few examples and structured the code in a way that should
allow you to switch between providers easily and to write modular, easy-to-maintain code.

## api
```
src
├── app
│   ├── api
│   │   ├── completion
│   │   │   └── route.ts
│   │   ├── recipe
│   │   │   └── route.ts
│   │   └── weather
        └── route.ts
```
Each `route` contains a handler that will recieve a request from one of our pages, notice that these usually come in pairs. the page.tsx will have something like `import { experimental_useObject as useObject } from "ai/react";` from the ai `client` library and it will be expecting the api route to utilize `import { streamObject } from "ai";` something equivalent from the `ai` library.
        

## Providers
```
src
└── providers
     ├── ollama.ts
     └── openai.ts
```
    
Here you will find a quick way to switch between different providers eg; `ollama`, `openai`, etc.. Just import one of the many providers offered by Vercel (full list [here](https://sdk.vercel.ai/providers/ai-sdk-providers)) add your config, and export it for usage in your application.

## Schemas
```
src
└── schemas
    ├── recipe.ts
    └── weather.ts
```

In this directory, you will export a [Zod](https://zod.dev/) object describing the shape of the shape of data your LLM is going to return the data in. This helps it to provide more accurate and predictable results.

## Tools
```
src
└── tools
    ├── command.ts
    └── weather.ts
```
Here you will write `tools` which are a set of functions that can perform some pieces of logic eg; interact with external API to supercharge your model with access to external data or give it the ability to perform operations specific to your application needs.

The template my require some minor clean up, removing some unused files, but for the most part I believe it can serve as a very good basis to get started with!
