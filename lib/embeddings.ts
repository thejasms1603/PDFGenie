import { OpenAIApi, Configuration } from "openai-edge";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("No OpenAI Environment variables available");
}
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
  try {
    const inputText = text.replace(/\n/g, " ");
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: inputText,
    });
    const result = await response.json();
    return result.data[0].embedding as number[];
  } catch (error) {
    console.log("Error while calling openai embeddings api", error);
    throw error;
  }
}
