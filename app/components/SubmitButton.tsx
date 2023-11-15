'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-green-500 rounded-lg mt-2 text-white py-2"
    >
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}
