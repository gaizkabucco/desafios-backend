import admin from "firebase-admin"
import { FIRESTORE_CREDENTIALS } from "../firestore_credentials.js"

admin.initializeApp({
	credential: admin.credential.cert(FIRESTORE_CREDENTIALS),
})

export const firestoreDatabase = admin.firestore()
