import { getContext } from "@/lib/context";
import db from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { openai } from "@ai-sdk/openai";
import { Message, streamText } from "ai";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();

    // Retrieve chat from database
    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
    if (_chats.length !== 1) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    const fileKey = _chats[0].fileKey;
    const lastMessage = messages[messages.length - 1];

    // Get context based on the last message
    const context = await getContext(lastMessage.content, fileKey);

    // Construct system prompt
    const systemPrompt = {
      role: "system",
      content: `AI Assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in its brain and can accurately answer nearly any question.
      AI Assistant is a big fan of Pinecone and Vercel.

      START CONTEXT BLOCK
      ${context}
      END OF CONTEXT BLOCK

      AI Assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      If the context does not provide the answer to a question, AI Assistant will say:
      "I'm sorry, but I don't know the answer to the given question."
      AI Assistant will not apologize for previous responses but will indicate when new information is gained.
      AI Assistant will not invent anything that is not directly drawn from the context.
      `,
    };

    // Add system prompt to messages
    const aiMessages = [systemPrompt, ...messages.filter((message: Message) => message.role === 'user')];

    // Stream response from AI model
    const result = await streamText({
      model: openai("gpt-4o"),
      messages: aiMessages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in AI response:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
