import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";

const pc = new Pinecone({
  apiKey: process.env.PINE_CONE_API_KEY || "",
});

const index = pc.Index("pdfchat");

export const getMatchesFromEmbeddings = async (
  embeddings: number[],
  fileKey: string
) => {
  if (!process.env.PINE_CONE_API_KEY) {
    throw new Error(
      "PINE_CONE_API_KEY is missing. Please set it in your environment variables."
    );
  }

  try {
    const namespace = convertToAscii(fileKey);
    const queryResult = await index.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
      filter:{namespace}
    });

    return queryResult.matches || [];
  } catch (error) {
    console.error("Error querying embeddings:", error);
    throw new Error(`Failed to fetch matches from Pinecone: ${error}`);
  }
};

export const getContext = async (query: string, fileKey: string) => {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);
  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.7
  );
  type MetaData = {
    text: string;
    pageNumber: number;
  };

  const docs = qualifyingDocs.map((match) => (match.metadata as MetaData).text);
  return docs.join("\n").substring(0, 3000);
};
