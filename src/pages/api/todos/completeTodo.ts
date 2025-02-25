import { pool } from "@/app/db/pool";
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
)=> {
  const {id, completed} = req.body;
  try {
    console.log(id, !completed);
    const q = "UPDATE tasks SET completed = $2 WHERE id = $1 RETURNING ";
    const values = [id, !completed];
    const result= await pool.query(q, values);
    console.log('Resultado de la actualización:', result.rows[0]);
    return res.status(200).json(result.rows[0]);
  } catch (err: unknown) {
    console.error('Error al editar tarea:', err);
    res.status(500).json({ message: err as string });
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