import { revalidatePath } from 'next/cache';
import prisma from './db';

async function getData() {
  const data = await prisma.todo.findMany({
    select: {
      input: true,
      id: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}

export default async function HomePage() {
  const data = await getData();

  async function create(formData: FormData) {
    'use server';

    const input = formData.get('input') as string;

    await prisma.todo.create({
      data: { input },
    });

    revalidatePath('/');
  }

  async function update(formData: FormData) {
    'use server';

    const input = formData.get('input') as string;
    const id = formData.get('inputId') as string;

    await prisma.todo.update({
      where: { id },
      data: { input },
    });

    revalidatePath('/');
  }

  async function remove(formData: FormData) {
    'use server';

    const id = formData.get('inputId') as string;

    await prisma.todo.delete({
      where: { id },
    });

    revalidatePath('/');
  }

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <div className="border rounded-lg shadow-xl p-10 w-[30vw]">
        <form className="flex flex-col" action={create}>
          <input
            type="text"
            name="input"
            className="border rounded-lg p-1 border-gray-800"
          />
          <button
            type="submit"
            className="bg-green-500 rounded-lg mt-2 text-white py-2"
          >
            Submit
          </button>
        </form>

        <div className="mt-5 flex flex-col gap-y-2">
          {data.map((todo) => (
            <form key={todo.id} className="flex" action={update}>
              <input hidden name="inputId" value={todo.id} />

              <input
                type="text"
                name="input"
                defaultValue={todo.input}
                className="border p-1"
              />
              <button type="submit" className="border p-2 bg-green-400">
                Save
              </button>
              <button formAction={remove} className="border p-2 bg-red-400">
                Delete
              </button>
            </form>
          ))}
        </div>
      </div>
    </main>
  );
}
