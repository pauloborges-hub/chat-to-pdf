"use client"

import { PlusCircleIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

function PlaceholderDocument() {
   const router = useRouter()

   function handleClick() {
      // Check if user is FREE tier, and check if they're over the file limit -> then push to upgrade page
      router.push("/dashboard/upload")
   }

   return (
      <Button
         className="flex flex-col items-center justify-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400"
         onClick={handleClick}
      >
         <PlusCircleIcon className="h-16 w-16" />
         <p>Add a document</p>
      </Button>
   )
}

export default PlaceholderDocument