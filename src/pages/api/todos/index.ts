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
    req.query.done;
    //undefined query
    //done === true query con where
    //done === false query con where
    let q = "SELECT * FROM tasks";
    let queryParam = [];
    if (req.query.done === "true") {
      q = q + ` WHERE completed = 'true'`;
      if(req.query.search){
        q = q + ` AND todo LIKE '%$1%'`;
        queryParam.push(req.query.search);
      }
    }
    if(req.query.done === "false"){
      q = q + ` WHERE completed = 'false'`;
    }
    
    const result = await pool.query(q, queryParam);
    const todos = result.rows;
    return res.json(todos);
  } catch (err: unknown) {
    res.status(500).json({ message: err as string });
  }
};

const createTodo = async (
  req: NextApiRequest,
  res: NextApiResponse<Task | { message: string }>
): Promise<void> => {
  const {id, todo, completed, userId } = req.body;
  console.log('Datos recibidos para crear tarea:', { id, todo, completed, userId });
  try {
    const q = "INSERT INTO tasks (id, todo, completed, userId) VALUES ($1, $2, $3, $4)";
    const values = [id, todo, completed, userId];
    const resul= await pool.query(q, values);
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



