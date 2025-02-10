"use client"

import { useUser } from "@clerk/nextjs"
import { Message } from "./Chat"
import Image from "next/image"
import { BotIcon } from "lucide-react"

function ChatMessage({ message }: { message: Message }) {
   const isHuman = message.role === "human"
   const { user } = useUser()

   return (
      <div className={`chat ${isHuman ? "chat-end" : "chat-start"}`}>
         <div className="chat-image-avatar">
            <div>
               {isHuman ? (
                  user?.imageUrl && (
                     <Image
                        src={user?.imageUrl}
                        alt="Profile Picture"
                        width={40}
                        height={40}
                        className="rounded-full"
                     />
                  )
               ) : (
                  <div className="h-10 w-10 bg-indigo-600 flex items-center justify-center">
                     <BotIcon className="text-white h-7 w-7" />
                  </div>
               )}
            </div>
         </div>

         <div></div>
      </div>
   )
}

export default ChatMessage