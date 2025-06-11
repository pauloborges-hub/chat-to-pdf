"use client"

import { toast } from "@/hooks/use-toast"
import useSubscription from "@/hooks/useSubscription"
import useUpload, { StatusText } from "@/hooks/useUpload"
import { CheckCircleIcon, CircleArrowDown, HammerIcon, RocketIcon, SaveIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"

function FileUploader() {
   const { progress, status, fileId, handleUpload } = useUpload()
   const { isOverFileLimit, filesLoading } = useSubscription()
   const router = useRouter()

   useEffect(() => {
      if (fileId) {
         router.push(`/dashboard/files/${fileId}`)
      }
   }, [fileId, router])

   const onDrop = useCallback(async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
         if (!isOverFileLimit && !filesLoading) {
            await handleUpload(file)
         } else {
            toast({
               variant: "destructive",
               title: "Free Plan Limit Reached",
               description: "You have the maximum number of files allowed for your account. Please upgrade to add more documents."
            })
         }
      } else {
         // TODO: add toast
      }
   }, [handleUpload, isOverFileLimit, filesLoading])

   const statusIcons: {
      [key in StatusText]: JSX.Element
   } = {
      [StatusText.UPLOADING]: (
         <RocketIcon className="h-20 w-20 text-orange-600" />
      ),
      [StatusText.UPLOADED]: (
         <CheckCircleIcon className="h-20 w-20 text-orange-600" />
      ),
      [StatusText.SAVING]: (
         <SaveIcon className="h-20 w-20 text-orange-600" />
      ),
      [StatusText.GENERATING]: (
         <HammerIcon className="h-20 w-20 text-orange-600 animate-bounce" />
      )
   }

   const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
      useDropzone({
         onDrop,
         maxFiles: 1,
         maxSize: 5000000, //max file size: 5MB
         accept: {
            "application/pdf": [".pdf"]
         }
      })

   const uploadInProgress = progress != null && progress >= 0 && progress <= 100

   return (
      <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
         {/* Loading */}
         {uploadInProgress && (
            <div className="mt-32 flex flex-col justify-center items-center gap-5">
               <div
                  className={`radial-progress bg-orange-300 text-white border-orange-600 border-4 ${progress === 100 && "hidden"}`}
                  role="progressbar"
                  style={{
                     // @ts-ignore
                     "--value": progress,
                     "--size": "12rem",
                     "--thickness": "1.3rem"
                  }}
               >
                  {progress} %
               </div>

               {/* Render status icon */}
               {
                  // @ts-ignore
                  statusIcons[status!]
               }

               {/* @ts-ignore */}
               <p className="text-orange-600 animate-pulse">{status}</p>
            </div>
         )}

         {!uploadInProgress && (
            <div
               {...getRootProps()}
               className={`p-10 border-2 border-dashed mt-10 w-[90%] border-orange-600 text-orange-600 
            rounded-lg h-96 flex items-center justify-center ${isFocused || isDragAccept ? "bg-orange-300" : "bg-orange-100"
                  }`}>
               <input {...getInputProps()} />

               <div className="flex flex-col items-center justify-center">
                  {isDragActive ? (
                     <>
                        <RocketIcon className="h-20 w-20 animate-ping" />
                        <p>Drop the files here ...</p>
                     </>

                  ) : (
                     <>
                        <CircleArrowDown className="h-20 w-20 animate-bounce" />
                        <p>Drag and drop some files here, or click to select files</p>
                     </>
                  )}
               </div>
            </div>
         )}
      </div>
   )
}

export default FileUploader