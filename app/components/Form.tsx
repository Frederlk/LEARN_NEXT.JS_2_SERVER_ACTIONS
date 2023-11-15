'use client';

import { useRef } from 'react';

import { create } from '@/app/action';

import SubmitButton from './SubmitButton';
import { useFormState } from 'react-dom';

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useFormState(create, null);

  return (
    <form
      ref={formRef}
      className="flex flex-col"
      action={async (formData: FormData) => {
        formAction(formData);
        formRef.current?.reset();
      }}
    >
      <input
        type="text"
        name="input"
        className="border rounded-lg p-1 border-gray-800"
      />
      <SubmitButton />
      <p className="text-red-500">{state as string}</p>
    </form>
  );
}
