import { pool } from "@/app/db/pool";
import type { NextApiRequest, NextApiResponse } from "next";

interface Task {
  id: string;
  todo: string;
  completed: boolean;
  userId: number;
}

const getTodos = async (
  req: NextApiRequest,
  res: NextApiResponse<Task[] | { message: string }>
) => {
  try {
    const q = "SELECT * FROM tasks";
    const result = await pool.query(q);
    const todos = result.rows;
    return res.json(todos);
  } catch (err: unknown) {
    res.status(500).json({ message: err as string });
  }
};

const createTodo = async (
  req: NextApiRequest,
  res: NextApiResponse<Task[] | { message: string }>
) => {
  const {id, children, completed, userId } = req.body;
  console.log('Datos recibidos para crear tarea:', { id, children, completed, userId });
  try {
    const q = "INSERT INTO tasks (id, children, completed, userId) VALUES ($1, $2, $3, $4)";
    const values = [id, children, completed, userId];
    await pool.query(q, [id, children, completed, userId]);
    return res.status(201).json({message:"Task created successfully"});
  } catch (err: unknown) {
    res.status(500).json({ message: err as string });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task[] | { message: string }>
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



