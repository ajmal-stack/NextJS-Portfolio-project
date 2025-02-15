'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { showToast } from '../components/Toast';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      showToast({
        message: 'Logged in successfully',
        type: 'success',
      });
      router.push('/dashboard');
    } catch (error: any) {
      showToast({
        message: error.message,
        type: 'error',
      });
    }
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#0F1624]'>
      <div className='bg-[#171F38] p-8 rounded-xl shadow-lg w-96'>
        <h2 className='text-2xl font-bold text-white mb-6'>Login</h2>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className='w-full bg-white text-gray-800 py-2 px-4 rounded mb-4 flex items-center justify-center gap-2 hover:bg-gray-100'
        >
          <FcGoogle className='text-2xl' />
          Continue with Google
        </button>

        <div className='relative my-6'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-600'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 text-gray-400 bg-[#171F38]'>Or</span>
          </div>
        </div>

        {/* Email Login Form */}
        <form onSubmit={handleEmailLogin} className='space-y-4'>
          <div>
            <label className='text-gray-300'>Email</label>
            <input
              type='email'
              className='w-full bg-[#0F1624] text-white rounded p-2'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className='text-gray-300'>Password</label>
            <input
              type='password'
              className='w-full bg-[#0F1624] text-white rounded p-2'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button
            type='submit'
            className='w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600'
          >
            Login with Email
          </button>
        </form>
      </div>
    </div>
  );
}
