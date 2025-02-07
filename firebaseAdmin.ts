import { initializeApp, getApps, App, getApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

// Imports the firebase keys for access
const serviceKey = require("@/service_key.json")

let app: App

if (getApps().length === 0) {
   app = initializeApp({
      credential: cert(serviceKey)
   })
} else {
   app = getApp()
}

const adminDb = getFirestore(app)

export { app as adminApp, adminDb }