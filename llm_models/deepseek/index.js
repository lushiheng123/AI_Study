import { AIMessageChunk } from '@langchain/core/messages';
import { concat } from '@langchain/core/utils/stream';

const stream = await llm.stream(input);
let full: AIMessageChunk | undefined;
for await (const chunk of stream) {
  full = !full ? chunk : concat(full, chunk);
}
console.log(full);