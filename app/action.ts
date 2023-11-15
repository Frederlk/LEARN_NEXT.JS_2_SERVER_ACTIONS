'use server';

import { revalidatePath } from 'next/cache';
import prisma from './db';

async function create(prevState: any, formData: FormData) {
  try {
    const input = formData.get('input') as string;

    await prisma.todo.create({
      data: { input },
    });

    revalidatePath('/better');
  } catch (error) {
    return 'Failed to create';
  }
}

async function update(formData: FormData) {
  const input = formData.get('input') as string;
  const id = formData.get('inputId') as string;

  await prisma.todo.update({
    where: { id },
    data: { input },
  });

  revalidatePath('/better');
}

async function remove(formData: FormData) {
  const id = formData.get('inputId') as string;

  await prisma.todo.delete({
    where: { id },
  });

  revalidatePath('/better');
}

export { create, update, remove };
