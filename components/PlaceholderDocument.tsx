"use client"

import { FrownIcon, PlusCircleIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import useSubscription from "@/hooks/useSubscription"

function PlaceholderDocument() {
   const { isOverFileLimit } = useSubscription()
   const router = useRouter()

   function handleClick() {
      if (isOverFileLimit) {
         router.push("/dashboard/upgrade")
      } else {
         router.push("/dashboard/upload")
      }
   }

   return (
      <Button
         onClick={handleClick}
         className="flex flex-col items-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400"
      >
         {isOverFileLimit ? (
            <FrownIcon className="h-16 w-16" />
         ) : (
            <PlusCircleIcon className="h-16 w-16" />
         )}
         <p>Add a document</p>
      </Button>
   )
}

export default PlaceholderDocument