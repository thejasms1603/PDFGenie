"use client";
import React, { useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import MessageList from "./MessageList";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

type Props = {
  chatId: number;
};

const ChatComponent = ({ chatId }: Props) => {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
  });
  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <div
      className='relative max-h-screen overflow-scroll'
      id='message-container'
    >
      <div className='sticky top-0 inset-x-0 p-2 bg-white dark:bg-black h-fit'>
        <h3 className='font-bold text-xl'>Chat</h3>
      </div>

      <MessageList messages={messages} />

      <form
        onSubmit={handleSubmit}
        className='sticky bottom-0 inset-x-0 px-2 py-4 mt-2 bg-white rounded-lg'
      >
        <div className='flex'>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder='Ask any question...'
            className='w-full dark:bg-black text-white'
          />
          <Button className='bg-blue-600 ml-2 dark:text-white'>
            <Send className='h-4 w-4' />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
