"use client"

import { DrizzleChat } from '@/lib/db/schema'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { MessageCircle, PlusCircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'


type ChatSidebarProps = {
    chats: DrizzleChat[],
    chatId: number
}
const ChatSidebar = ({chats, chatId} : ChatSidebarProps) => {
  return (
    <div className='w-full h-screen p-4 text-gray-200 bg-gray-900 dark:bg-black'>
        <div >

        </div>
        <Link href='/'>
        <Button className='w-full border-dashed border-white border cursor-pointer'>
            <PlusCircleIcon className='mr-2 w-4 h-4'/>
            New Chat
        </Button>
        </Link>

        <div className='flex flex-col gap-2 mt-4'>
           {chats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chatId}`}>
                <div className={cn('rounded-lg p-3 text-slate-300 flex items-center',{
                    'bg-blue-600 text-white' : chat.id === chatId,
                    "hover:text-white":chat.id !== chatId
                })}>
                    <MessageCircle className='mr-2'/>
                    <p className='text-center w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis'>{chat.pdfName}</p>
                </div>
            </Link>
           ))} 
        </div>

        <div className='absolute bottom-4 left-4'>
            <div className='flex items-center gap-2 flex-wrap text-sm text-slate-500'>
                <Link href='/'>Home</Link>
                <Link href="/billing">Billing</Link>
            </div>
        </div>
    </div>
  )
}

export default ChatSidebar