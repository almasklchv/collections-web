import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOGvXKgfkuvFBf5acXrAkATB2d7VKfHu0",
  authDomain: "collections-c7751.firebaseapp.com",
  projectId: "collections-c7751",
  storageBucket: "collections-c7751.appspot.com",
  messagingSenderId: "282561037448",
  appId: "1:282561037448:web:0a95de595b759ba7604b3d",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const handleUpload = async (
  file: File | undefined
): Promise<string | null> => {
  const storageRef = ref(storage, "images/" + file?.name);

  try {
    if (file) {
      const snapshot = await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("File available at", downloadURL);
      return downloadURL;
    }
  } catch (error) {
    console.error("Upload failed", error);
  }
  return null;
};
