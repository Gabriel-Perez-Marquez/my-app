import { getClient } from "@/app/db/pool";
import { NextApiRequest, NextApiResponse } from "next";

interface Task {
    id: string;
    todo: string;
    completed: boolean;
    userId: number;
}

const completeTodo = async (
  req: NextApiRequest,
  res: NextApiResponse<Task | { message: string }>
) => {
  const client = getClient();
  const { id, completed } = req.body;
  try {
    const q = "UPDATE tasks SET completed = $2 WHERE id = $1 RETURNING *";
    const values = [id, !completed];
    const result = await client.query(q, values);
    if (result.rows.length === 0) {
      throw new Error('Task not found');
    }
    return res.status(200).json(result.rows[0]);
  } catch (err: unknown) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task | { message: string }>
) {
  if (req.method === 'PUT') {
    return await completeTodo(req, res);
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}