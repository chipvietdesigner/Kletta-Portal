import React, { useState } from 'react';
import { 
  Eye, 
  EyeSlash, 
  Plus,
  Globe
} from '@phosphor-icons/react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex h-screen w-full font-sans bg-white overflow-hidden">
      {/* LEFT SIDE: LOGIN FORM - 40% width */}
      <div className="w-full lg:w-[40%] flex flex-col px-8 md:px-16 lg:px-20 py-12 justify-center overflow-y-auto border-r border-gray-50">
        <div className="max-w-[420px] w-full mx-auto">
          {/* Logo - Increased size to h-10 */}
          <div className="mb-16">
            <img src="https://i.ibb.co/99RKpWNq/Color-Black.png" alt="Kletta" className="h-10 w-auto" />
          </div>

          <div className="mb-8">
            <h1 className="text-[26px] font-bold text-black tracking-tight mb-2">Welcome back!</h1>
            <p className="text-[14px] text-gray-700 font-normal">
              New to Kletta? <button className="text-[#1E6F73] font-bold hover:underline">Sign up</button>
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-black ml-1">Email</label>
              <input 
                type="email" 
                required
                placeholder="Enter your email" 
                className="w-full h-[50px] px-4 rounded-xl border border-gray-300 text-[14px] font-normal text-black focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] outline-none transition-all" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-medium text-black ml-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="Enter your password" 
                  className="w-full h-[50px] px-4 pr-12 rounded-xl border border-gray-300 text-[14px] font-normal text-black focus:border-[#1E6F73] focus:ring-1 focus:ring-[#1E6F73] outline-none transition-all" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  {showPassword ? <EyeSlash size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div 
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all ${rememberMe ? 'bg-[#1E6F73] border-[#1E6F73]' : 'border-gray-300 bg-white group-hover:border-gray-400'}`}
                >
                  {rememberMe && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}
                </div>
                <span className="text-[13px] font-medium text-black select-none">Remember me</span>
              </label>
              <button type="button" className="text-[13px] font-bold text-[#1E6F73] hover:text-[#002b31] transition-colors">
                Forgot password?
              </button>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] h-[50px] rounded-xl font-bold text-[16px] transition-all shadow-sm mt-4 flex items-center justify-center transform active:scale-[0.98]"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE: ILLUSTRATION - 60% width */}
      <div className="hidden lg:flex w-[60%] bg-white relative items-center justify-center p-12 overflow-hidden">
        {/* Top Right Icons */}
        <div className="absolute top-10 right-10 flex items-center gap-4 text-black/60">
           <Plus size={18} weight="bold" />
           <Globe size={18} />
           <div className="text-[18px]">🇬🇧</div>
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/vector-1770532406762-97e5a4028c73?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Accounting Illustration" 
            className="w-[80%] h-auto animate-in fade-in zoom-in-95 duration-700"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;