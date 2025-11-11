import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // ✅ Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/signin");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // ✅ Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full border border-cyan-500/20 text-center">
        {user ? (
          <>
            {/* ✅ Profile Avatar (photo or alphabet fallback) */}
            <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl font-bold text-white bg-gradient-to-br from-cyan-400 to-blue-500 border-4 border-cyan-400 shadow-[0_0_15px_rgba(14,165,233,0.5)]">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    // fallback if the image fails to load
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                (user.displayName?.charAt(0) ||
                  user.email?.charAt(0) ||
                  "?"
                ).toUpperCase()
              )}
            </div>

            {/* ✅ User Info */}
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome, {user.displayName || "User"}
            </h2>
            <p className="text-gray-300 mb-6">{user.email}</p>

            {/* ✅ Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition-all shadow-md shadow-red-600/20"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-white text-lg">Loading...</p>
        )}
      </div>
    </div>
  );
}
