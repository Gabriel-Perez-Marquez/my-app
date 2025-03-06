import { getClient } from "../../../app/db/pool";
import type { NextApiRequest, NextApiResponse } from "next";

interface Task {
  id: string;
  todo: string;
  completed: boolean;
  userId: number;
}

const editTodo = async (
  req: NextApiRequest,
  res: NextApiResponse<Task | { message: string }>
) => {
  const client = getClient();
  client.connect();
  const { id, todo} = req.body;
  console.log('Datos recibidos para editar tarea:', { id, todo});
  try {
    const q = "UPDATE tasks SET todo = $2 WHERE id = $1 RETURNING *";
    const values = [id, todo ];
    const result = await client.query(q, values);
    console.log('Resultado de la actualización:', result.rows[0]);
    return res.status(200).json(result.rows[0]);
  } catch (err: unknown) {
    console.error('Error al editar tarea:', err);
    res.status(500).json({ message: "Error al editar la tarea"});
  }
};


export default editTodo;