"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function generateEmbeddings(docId: string) {
   auth.protect() // route protection with Clerk

   // turn a PDF into embeddings (string of numbers)
   await generateEmbeddingsInPineconeVectorStore(docId)

   revalidatePath("/dashboard")

   return { completed: true }
}