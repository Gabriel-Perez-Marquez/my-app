import { NextApiRequest, NextApiResponse } from 'next';
import { getClient } from '../../../app/db/pool';

const deleteTodo = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const client = getClient();
  client.connect();
  const { id } = req.body;
  console.log('Datos recibidos para eliminar tarea:', { id });
  try {
    const q = "DELETE FROM tasks WHERE id = $1;";
    const values = [id];
    await client.query(q, values);
    return res.status(201).json({ message: "Task deleted successfully" });
  } catch (err: unknown) {
    res.status(500).json({ message: err as string });
  }
};

const editTodo = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const client = getClient();
  client.connect();
  const { id, todo } = req.body;
  console.log('Datos recibidos para editar tarea:', { id, todo });
  try {
    const q = "UPDATE tasks SET todo = $1 WHERE id = $2 RETURNING *;";
    const values = [todo, id];
    const result = await client.query(q, values);
    res.status(200).json(result.rows[0]);
  } catch (err: unknown) {
    res.status(500).json({ message: 'Error al editar la tarea' });
  }
};

export default async function TodoIdhandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    await editTodo(req, res);
  } else if (req.method === 'DELETE') {
    await deleteTodo(req, res);
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}