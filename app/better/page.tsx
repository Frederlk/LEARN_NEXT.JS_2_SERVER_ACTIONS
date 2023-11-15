import prisma from '@/app/db';
import { remove, update } from '@/app/action';
import SaveButton from '@/app/components/SaveButton';
import DeleteButton from '@/app/components/DeleteButton';
import Form from '@/app/components/Form';

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

export default async function BetterPage() {
  const data = await getData();

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <div className="border rounded-lg shadow-xl p-10 w-[30vw]">
        <Form />

        <div className="mt-5 flex flex-col gap-y-2">
          {data.map((todo) => (
            <div key={todo.id} className="w-full h-full flex items-center">
              <form className="flex" action={update}>
                <input hidden name="inputId" value={todo.id} />
                <input
                  type="text"
                  name="input"
                  defaultValue={todo.input}
                  className="border p-1"
                />
                <SaveButton />
              </form>
              <form className="flex" action={remove}>
                <input hidden name="inputId" value={todo.id} />
                <DeleteButton />
              </form>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
