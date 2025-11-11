import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Save user to Firestore
  const saveUserToFirestore = async (user: any) => {
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          uid: user.uid,
          name: user.displayName || "Google User",
          email: user.email || "",
          phone: user.phoneNumber || "",
          photoURL:
            user.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png",
          provider: user.providerData[0]?.providerId || "google",
          lastLogin: new Date().toISOString(),
        },
        { merge: true }
      );
      toast.success("User saved successfully!");
    } catch (err) {
      console.error("❌ Firestore save error:", err);
      toast.error("Failed to save user data.");
    }
  };

  // ✅ Google Sign-In
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      console.log("✅ Logged in user:", result.user);
      await saveUserToFirestore(result.user);
      toast.success(`Welcome, ${result.user.displayName || "User"}!`);
      navigate("/dashboard"); // ✅ redirect after login
    } catch (err: any) {
      console.error("Google Sign-in Error:", err.message);
      toast.error("Google sign-in failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout Error:", err);
      toast.error("Logout failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full border border-cyan-500/20">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-8">
          Welcome to Intern AI
        </h2>

        {/* ✅ Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 rounded-lg transition-transform duration-200 mb-6 shadow-md shadow-cyan-600/20 hover:scale-105 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <FcGoogle size={24} />
          {loading ? "Signing in..." : "Continue with Google"}
        </button>

        {/* ✅ Logout */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-lg transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
