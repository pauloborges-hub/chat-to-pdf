"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

import { v4 as uuidv4 } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { db, storage } from "@/firebase"
import { doc, setDoc } from "firebase/firestore"
import { generateEmbeddings } from "@/actions/generateEmbeddings"

export enum StatusText {
   UPLOADING = "Uploading file...",
   UPLOADED = "File uploaded successfully",
   SAVING = "Saving file to database...",
   GENERATING = "Generating AI Embeddings, this will take only a few seconds..."
}

export type Status = StatusText[keyof StatusText]

function useUpload() {
   const [progress, setProgress] = useState<number | null>(null)
   const [fileId, setFileId] = useState<String | null>(null)
   const [status, setStatus] = useState<Status | null>(null)
   const { user } = useUser()
   const router = useRouter()

   async function handleUpload(file: File) {
      if (!file || !user) return

      const fileIdToUploadTo = uuidv4() // Generate a unique ID for the file

      const storageRef = ref(
         storage,
         `users/${user.id}/files/${fileIdToUploadTo}`
      )

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on("state_changed", (snapshot) => {
         const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
         )
         setStatus(StatusText.UPLOADING)
         setProgress(percent)
      },
         (error) => {
            console.error("Error uploading file", error)
            // TODO: add toast for error
         }, async () => {
            setStatus(StatusText.UPLOADED)

            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)

            setStatus(StatusText.SAVING)
            await setDoc(doc(db, "users", user.id, "files", fileIdToUploadTo), {
               name: file.name,
               size: file.size,
               type: file.type,
               downloadUrl: downloadUrl,
               ref: uploadTask.snapshot.ref.fullPath,
               createdAt: new Date()
            })

            setStatus(StatusText.GENERATING)
            
            await generateEmbeddings(fileIdToUploadTo)

            setFileId(fileIdToUploadTo)
         }
      )
   }

   return { progress, status, fileId, handleUpload }
}

export default useUpload