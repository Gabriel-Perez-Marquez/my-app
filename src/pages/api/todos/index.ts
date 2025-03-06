import { NextApiRequest, NextApiResponse } from 'next';
import { getClient } from '../../../app/db/pool';

interface Task {
  id: string;
  todo: string;
  completed: boolean;
  userId: number;
}

export const getTodos = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const client = getClient();
  try {
    const result = await client.query('SELECT * FROM tasks');
    res.status(200).json(result.rows);
  } catch (err: unknown) {
    res.status(500).json({ message: 'Error al obtener las tareas' });
  } finally {
    client.end();
  }
};

const createTodo = async (
  req: NextApiRequest,
  res: NextApiResponse<Task | { message: string }>
): Promise<void> => {
  const client = getClient();
  try {
    const { id, todo, completed, userId } = req.body;
    const q = "INSERT INTO tasks (id, todo, completed, userId) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [id, todo, completed, userId];
    const result = await client.query(q, values);
    res.status(201).json(result.rows[0]);
  } catch (err: unknown) {
    res.status(500).json({ message: 'Error al crear la tarea' });
  } finally {
    client.end();
  }
};

export default async function indexHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await getTodos(req, res);
  } else if (req.method === 'POST') {
    await createTodo(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}