<h1 align = "center">LangGraph负责代理</h1>

## [官网](https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/)

```sh
npm install @langchain/core @langchain/langgraph @langchain/deepseek @langchain/community
```

### 代理暂时跑不了

```js
// agent.ts

// IMPORTANT - Add your API keys here. Be careful not to publish them.

import dotenv from "dotenv";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatDeepSeek } from "@langchain/deepseek";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
dotenv.config();
// Define the tools for the agent to use
const agentTools = [
  new TavilySearchResults({
    maxResults: 3,
    apiKey: process.env.Tavily_API,
  }),
];
const agentModel = new ChatDeepSeek({
  apiKey: process.env.DEEPSEEK_API,
  model: "deepseek-chat",
  temperature: 0,
});

// Initialize memory to persist state between graph runs
const agentCheckpointer = new MemorySaver();
const agent = createReactAgent({
  llm: agentModel,
  tools: agentTools,
  checkpointSaver: agentCheckpointer,
});

// Now it's time to use!
const agentFinalState = await agent.invoke(
  { messages: [new HumanMessage("what is the current weather in sf")] },
  { configurable: { thread_id: "sf-thread" } }
);

console.log(
  agentFinalState.messages[agentFinalState.messages.length - 1].content
);

const agentNextState = await agent.invoke(
  { messages: [new HumanMessage("what about ny")] },
  { configurable: { thread_id: "ny-thread" } }
);

console.log(
  agentNextState.messages[agentNextState.messages.length - 1].content
);
```
