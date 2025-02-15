'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Settings() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: true,
    language: 'en',
    timezone: 'UTC',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        throw new Error('Failed to update settings');
      }

      toast.success('Settings updated successfully!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#0F1624] py-20'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='max-w-2xl mx-auto bg-[#171F38] rounded-xl p-8'
        >
          <h1 className='text-2xl font-bold text-white mb-6'>Settings</h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-white font-medium'>
                    Email Notifications
                  </h3>
                  <p className='text-gray-400 text-sm'>
                    Receive email notifications about updates
                  </p>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        emailNotifications: e.target.checked,
                      })
                    }
                    className='sr-only peer'
                  />
                  <div
                    className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 
                                peer-focus:ring-purple-500/25 rounded-full peer 
                                peer-checked:after:translate-x-full peer-checked:after:border-white 
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                after:bg-white after:rounded-full after:h-5 after:w-5 
                                after:transition-all peer-checked:bg-purple-500"
                  ></div>
                </label>
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-white font-medium'>Dark Mode</h3>
                  <p className='text-gray-400 text-sm'>
                    Toggle dark mode appearance
                  </p>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={settings.darkMode}
                    onChange={(e) =>
                      setSettings({ ...settings, darkMode: e.target.checked })
                    }
                    className='sr-only peer'
                  />
                  <div
                    className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 
                                peer-focus:ring-purple-500/25 rounded-full peer 
                                peer-checked:after:translate-x-full peer-checked:after:border-white 
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                after:bg-white after:rounded-full after:h-5 after:w-5 
                                after:transition-all peer-checked:bg-purple-500"
                  ></div>
                </label>
              </div>

              <div>
                <label
                  htmlFor='language'
                  className='block text-white font-medium mb-1'
                >
                  Language
                </label>
                <select
                  id='language'
                  value={settings.language}
                  onChange={(e) =>
                    setSettings({ ...settings, language: e.target.value })
                  }
                  className='w-full bg-[#0F1624] text-white rounded-lg px-4 py-3 
                           focus:outline-none focus:ring-2 focus:ring-purple-500'
                >
                  <option value='en'>English</option>
                  <option value='es'>Spanish</option>
                  <option value='fr'>French</option>
                  <option value='de'>German</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor='timezone'
                  className='block text-white font-medium mb-1'
                >
                  Timezone
                </label>
                <select
                  id='timezone'
                  value={settings.timezone}
                  onChange={(e) =>
                    setSettings({ ...settings, timezone: e.target.value })
                  }
                  className='w-full bg-[#0F1624] text-white rounded-lg px-4 py-3 
                           focus:outline-none focus:ring-2 focus:ring-purple-500'
                >
                  <option value='UTC'>UTC</option>
                  <option value='EST'>EST</option>
                  <option value='PST'>PST</option>
                  <option value='IST'>IST</option>
                </select>
              </div>
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                disabled={loading}
                className='bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold 
                         hover:bg-purple-600 transition-colors disabled:opacity-50 
                         disabled:cursor-not-allowed'
              >
                {loading ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
