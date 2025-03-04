
import { getClient } from "../../../app/db/pool";
import type { NextApiRequest, NextApiResponse } from "next";

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
  try {
    const client= getClient();
    console.log('Client:', client);  
    const result = await client.query('SELECT * FROM tasks');
    console.log('Result:', result);
    const todos: Task[] = result.rows;
    return res.json(todos);
  } catch (err: unknown) {
    res.status(500).json({ message: err as string });
  }
};

const createTodo = async (
  req: NextApiRequest,
  res: NextApiResponse<Task | { message: string }>
): Promise<void> => {
  try {
    const client = getClient();
    const {id, todo, completed, userId } = req.body;
    console.log('Datos recibidos para crear tarea:', { id, todo, completed, userId });
    const q = "INSERT INTO tasks (id, todo, completed, userId) VALUES ($1, $2, $3, $4)";
    const values = [id, todo, completed, userId];
    const resul= await client.query(q, values);
    return res.status(201).json(resul.rows[0]);
  } catch (err: unknown) {
    res.status(500).json({ message: err as string });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return await getTodos(req, res);
  } else if (req.method === 'POST') {
    return await createTodo(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}



