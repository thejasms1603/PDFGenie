import { cn } from '@/lib/utils'
import { Message } from 'ai/react'
import React from 'react'

type MessageProps = {
    messages: Message[]
}

const MessageList = ({messages} : MessageProps) => {
    if(!messages) return <></>
  return (
    <div className='flex flex-col gap-2 px-4'>
        {messages.map(message => (
            <div 
            key={message.id}
            className={cn('flex', {
                'justify-end': message.role === 'user',
                'justify-start':message.role === 'assistant'
            })}
            >
                <div className={cn('rounded-lg text-sm p-2 shadow-md ring-1 ring-gray-900/10 dark:border-gray-400 dark:border-2 my-2',{
                    'bg-blue-600 text-white' : message.role === 'user',

                })}>
                    <p>{message.content}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default MessageList