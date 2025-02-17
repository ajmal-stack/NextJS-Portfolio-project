'use client';
import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success('Signed in successfully!');
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl });
  };

  return (
    <div className='min-h-screen bg-[#0F1624] flex items-center justify-center px-4'>
      <div className='max-w-md w-full space-y-8 bg-[#171F38] p-8 rounded-xl'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-white'>Welcome Back</h2>
          <p className='mt-2 text-gray-400'>Sign in to your account</p>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='text-gray-400 text-sm'>
                Email
              </label>
              <input
                id='email'
                type='email'
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className='w-full bg-[#0F1624] rounded-lg px-4 py-3 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                placeholder='Enter your email'
              />
            </div>
            <div>
              <label htmlFor='password' className='text-gray-400 text-sm'>
                Password
              </label>
              <input
                id='password'
                type='password'
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className='w-full bg-[#0F1624] rounded-lg px-4 py-3 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                placeholder='Enter your password'
              />
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-purple-500 text-white py-3 rounded-lg font-semibold 
                     hover:bg-purple-600 transition-colors disabled:opacity-50 
                     disabled:cursor-not-allowed'
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-700'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-[#171F38] text-gray-400'>
                Or continue with
              </span>
            </div>
          </div>

          <button
            type='button'
            onClick={handleGoogleSignIn}
            className='w-full bg-white text-gray-900 py-3 rounded-lg font-semibold 
                     flex items-center justify-center space-x-2 hover:bg-gray-100 
                     transition-colors'
          >
            <Image
              src='/google.svg'
              alt='Google'
              width={20}
              height={20}
              className='w-5 h-5'
            />
            <span>Sign in with Google</span>
          </button>

          <p className='text-center text-gray-400 text-sm'>
            Don&apos;t have an account?{' '}
            <Link
              href='/auth/signup'
              className='text-purple-500 hover:text-purple-400'
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
