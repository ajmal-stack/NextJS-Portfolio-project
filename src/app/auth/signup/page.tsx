'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success('Account created successfully!');
      router.push('/auth/signin');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#0F1624] flex items-center justify-center px-4'>
      <div className='max-w-md w-full space-y-8 bg-[#171F38] p-8 rounded-xl'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-white'>Create Account</h2>
          <p className='mt-2 text-gray-400'>Sign up for a new account</p>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div>
              <label htmlFor='name' className='text-gray-400 text-sm'>
                Name
              </label>
              <input
                id='name'
                type='text'
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className='w-full bg-[#0F1624] rounded-lg px-4 py-3 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                placeholder='Enter your name'
              />
            </div>
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
                placeholder='Create a password'
              />
            </div>
            <div>
              <label
                htmlFor='confirmPassword'
                className='text-gray-400 text-sm'
              >
                Confirm Password
              </label>
              <input
                id='confirmPassword'
                type='password'
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className='w-full bg-[#0F1624] rounded-lg px-4 py-3 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                placeholder='Confirm your password'
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

          <p className='text-center text-gray-400 text-sm'>
            Already have an account?{' '}
            <Link
              href='/auth/signin'
              className='text-purple-500 hover:text-purple-400'
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
