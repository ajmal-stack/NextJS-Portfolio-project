'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className='bg-[#171F38] rounded-lg p-4 animate-pulse'>
      <div className='h-40 bg-gray-700 rounded'></div>
    </div>
  ),
});

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  modules: Record<string, any>;
  formats: string[];
}

export default function QuillEditor({
  value,
  onChange,
  modules,
  formats,
}: QuillEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='bg-[#171F38] rounded-lg p-4 animate-pulse'>
        <div className='h-40 bg-gray-700 rounded'></div>
      </div>
    );
  }

  return (
    <div className='editor-container'>
      <ReactQuill
        theme='snow'
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className='text-white'
      />
    </div>
  );
}
