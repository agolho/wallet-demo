import { NextApiRequest, NextApiResponse } from 'next';
import { collection, addDoc } from 'firebase/firestore';
import {getFirestore} from "@firebase/firestore";
import {initializeApp} from "@firebase/app";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const firebaseConfig = {
        apiKey: "AIzaSyDx0s34dTsZTZXXE26qWSxIyIGCVqrAQHs",
        authDomain: "strayhub-65a3f.firebaseapp.com",
        projectId: "strayhub-65a3f",
        storageBucket: "strayhub-65a3f.appspot.com",
        messagingSenderId: "322139941913",
        appId: "1:322139941913:web:bd2ebc51ebe8b905220e88",
        measurementId: "G-YNYHYPW2XJ"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    try {
        const docRef = await addDoc(collection(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
        res.status(200).json({ message: "Document added successfully", id: docRef.id });
    } catch (e) {
        console.error("Error adding document: ", e);
        res.status(500).json({ error: "Error adding document" });
    }
}