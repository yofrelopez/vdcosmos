'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  loadingText?: string;
}

export default function SubmitButton({ children, className, loadingText = 'Guardando...' }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className} disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
    >
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {pending ? loadingText : children}
    </button>
  );
}
