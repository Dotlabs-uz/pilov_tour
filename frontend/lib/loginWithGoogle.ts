import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/app/(public)/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";


export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user) throw new Error("User not found after Google sign-in.");

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        avatar: user.photoURL || "/avatar-default.svg",
        createdAt: serverTimestamp(),
      });
    }

    return user;
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};
