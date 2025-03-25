import ChatComponent from "@/components/ChatComponent";
import ChatSidebar from "@/components/ChatSidebar";
import PDFViewer from "@/components/PDFViewer";
import db from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type ChatProps = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params }: ChatProps) => {
  const { chatId } = await params;
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  return (
    <div className='flex max-h-screen overflow-scroll'>
      <div className='flex w-full max-h-screen overflow-scroll'>
        <div className='flex-[1] max-w-xs'>
          <ChatSidebar chats={_chats} chatId={parseInt(chatId)} />
        </div>
        <div className='max-h-screen p-4 overflow-scroll flex-[5]'>
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        <div className='flex-[3] border-l-4 border-l-slate-200'>
          <ChatComponent chatId={parseInt(chatId)}/>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
