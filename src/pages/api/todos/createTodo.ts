import { pool } from "@/app/db/pool";
import { NextApiRequest, NextApiResponse } from "next";


interface Task {
    id: string;
    todo: string;
    completed: boolean;
    userId: number;
  }


const createTodo = async (
  req: NextApiRequest,
  res: NextApiResponse<Task[] | { message: string }>
): Promise<void> => {
  const {id, todo, completed, userId } = req.body;
  console.log('Datos recibidos para crear tarea:', { id, todo, completed, userId });
  try {
    const q = "INSERT INTO tasks (id, todo, completed, userId) VALUES ($1, $2, $3, $4)";
    const values = [id, todo, completed, userId];
    await pool.query(q, values);
    return res.status(201).json({message:"Task created successfully"});
  } catch (err: unknown) {
    res.status(500).json({ message: err as string });
  }
};

export default createTodo;