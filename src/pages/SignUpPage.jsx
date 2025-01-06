import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useState, useRef } from 'react'
import { Eye, EyeOff, Mail, Lock, MessageSquare, User, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

const SignUpPage = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();
  const [formData, setformData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const loadingBarRef = useRef(null);
  const ValidateForm = () => { };
  const handleSubmit = async (e) => {
    e.preventDefault();
    loadingBarRef.current?.continuousStart();
    try {
      await signup(formData);
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      // Complete the loading bar
      loadingBarRef.current?.complete();
    }
  };
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <LoadingBar color="#f11946" ref={loadingBarRef} />
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className="form-control">
              <label className='label'>
                <span className='label-text font-medium'>Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className='size text-base-content/40' />
                </div>
                <input type="text" className={`input input-bordered w-full pl-10`} placeholder='Muhammad Zaid' value={formData.fullName} onChange={(e)=>{setformData({...formData, fullName: e.target.value})}} />
              </div>
            </div>

            <div className="form-control">
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className='size text-base-content/40' />
                </div>
                <input type="email" className={`input input-bordered w-full pl-10`} placeholder='MuhammadZaid@gmail.com' value={formData.email} onChange={(e)=>{setformData({...formData, email: e.target.value})}} />
              </div>
            </div>

            <div className="form-control">
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className='size text-base-content/40' />
                </div>
                <input type={ShowPassword ? "text" : "password"} className={`input input-bordered w-full pl-10`} placeholder='********' value={formData.password} onChange={(e)=>{setformData({...formData, password: e.target.value})}} />
                <button type='button' className='absolute inset-y-0 right-0 pr-3 flex items-center' onClick={()=>{setShowPassword(!ShowPassword)}}>{ShowPassword ? (<EyeOff className='size-5 text-base-content/40' />) : (<Eye className='size-5 text-base-content/40' />)}</button>
              </div>
            </div>

            <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>{isSigningUp ? ("Processing...") : ("Create Account")}</button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
            Already Have an Account?{" "}
            <Link to="/login" className="link link-primary">Sign In</Link>
              </p>
          </div>

        </div>
      </div>
      {/* Right Side */}
      Right Side
    </div>
  )
}

export default SignUpPage
