import { useDispatch, useSelector } from "react-redux";
import { FaGoogle } from "react-icons/fa";
import ArtifactPanel from "../components/ArtifactPanel";
import ChatArea from "../components/ChatArea";
import Sidebar from "../components/Sidebar";
import api from "../utils/axios";
import { setUserData } from "../redux/user.slice";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";

function Home() {
  const { userData } = useSelector(state => state.user);
  const dispatch=useDispatch()
const login=async (token)=>{
  try {
    const {data}=await api.post(`/api/auth/login`,{token})
    dispatch(setUserData(data.user))
  } catch (error) {
    console.log(error)
  }
}
  const handleGoogleLogin =async () => {
     const result =
     await signInWithPopup(auth,googleProvider);
    
     const token =await result.user.getIdToken();
     await login(token)
  };

  return (
    <div className="relative h-screen flex bg-[#07080e] text-white overflow-hidden">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0" />

      {/* Background ambient glow circles */}
      <div className="absolute top-[-15%] left-[-15%] w-[55%] h-[55%] rounded-full bg-indigo-500/8 blur-[130px] pointer-events-none z-0 animate-float-1" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[55%] h-[55%] rounded-full bg-violet-600/8 blur-[130px] pointer-events-none z-0 animate-float-2" />
      <div className="absolute top-[25%] left-[35%] w-[35%] h-[35%] rounded-full bg-cyan-500/5 blur-[110px] pointer-events-none z-0 animate-float-1" />

      <Sidebar />
      <ChatArea />
      <ArtifactPanel />

      {!userData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[360px] bg-[#0f1118]/80 border border-white/[0.08] backdrop-blur-md rounded-2xl p-8 flex flex-col items-center gap-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            
            {/* Custom Glowing Logo */}
            <div className="relative w-16 h-16 flex items-center justify-center animate-logo-glow">
              <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-[8px] animate-pulse" />
              <svg width="44" height="44" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
                <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke="url(#loginHex)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="32" cy="32" r="8" fill="url(#loginCore)" />
                <defs>
                  <linearGradient id="loginHex" x1="8" y1="4" x2="56" y2="60">
                    <stop stopColor="#818CF8" />
                    <stop offset="0.5" stopColor="#C084FC" />
                    <stop offset="1" stopColor="#22D3EE" />
                  </linearGradient>
                  <linearGradient id="loginCore" x1="24" y1="24" x2="40" y2="40">
                    <stop stopColor="#C084FC" />
                    <stop offset="1" stopColor="#818CF8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex flex-col gap-1.5 text-center">
              <h2 className="text-[20px] font-bold text-slate-100 tracking-tight font-sans">
                Welcome to CortexAI
              </h2>
              <p className="text-[12.5px] text-slate-400 leading-normal max-w-[240px] mx-auto">
                Sign in to access your multi-agent workspace, search, and coding environments.
              </p>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-br from-indigo-500 to-violet-700 hover:from-indigo-400 hover:to-violet-600 border border-indigo-400/30 shadow-[0_4px_16px_rgba(99,102,241,0.2)] hover:shadow-[0_4px_20px_rgba(99,102,241,0.35)] transition-all duration-200 cursor-pointer active:scale-[0.98] outline-none"
            >
              <FaGoogle size={14} className="text-white" />
              Continue with Google
            </button>
            
            <p className="text-[11px] text-slate-500 text-center leading-normal max-w-[220px]">
              By continuing, you agree to our Terms of Service & Privacy Policy.
            </p>

          </div>
        </div>
      )}
    </div>
  );
}

export default Home;