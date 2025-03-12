import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3Server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings";
import md5 from "md5";
import { PineconeRecord } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";

if (!process.env.PINE_CONE_API_KEY) {
  throw new Error("Missing Pinecone API Key.");
}

const pc = new Pinecone({
  apiKey: process.env.PINE_CONE_API_KEY,
});

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: {
      pageNumber: number;
    };
  };
};
export const loadS3intoPinecone = async (fileKey: string) => {
  try {
    console.log("Downloading from S3 into file system...");

    const file_name = await downloadFromS3(fileKey);
    if (!file_name) {
      throw new Error("Could not download file from S3.");
    }

    console.log("Loading PDF with LangChain...");
    const loader = new PDFLoader(file_name);
    const pages = (await loader.load()) as PDFPage[];
    const documents = await Promise.all(
      pages.map((page) => prepareDocument(page))
    );
    const vectors = await Promise.all(
      documents.flat().map((doc) => embedDocument(doc))
    );

    const pineconeIndex = pc.index("pdfchat");
    console.log("inserting vectores in to pinecone");
    const nameSpace = convertToAscii(fileKey);
    const validVectors = vectors.filter(
      (vector): vector is PineconeRecord => vector !== null
    );
    await pineconeIndex.namespace(nameSpace).upsert(validVectors);
    return documents[0];
  } catch (error) {
    console.error("Error loading S3 file into Pinecone:", error);
    throw error;
  }
};

export const truncateStringByBytes = (str: string, bytes: number) => {
  const encoder = new TextEncoder();
  return new TextDecoder("utf-8").decode(encoder.encode(str).slice(0, bytes));
};
export const prepareDocument = async (page: PDFPage) => {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
};

export async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);
    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("Error embedding documents", error);
    return null;
  }
}
