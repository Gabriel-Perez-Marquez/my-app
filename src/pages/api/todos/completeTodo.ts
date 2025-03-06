import { getClient } from "../../../app/db/pool";
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
  client.connect();
  const { id, completed } = req.body;
  try {
    const q = "UPDATE tasks SET completed = $2 WHERE id = $1 RETURNING *";
    const values = [id, !completed];
    const result = await client.query(q, values);
    return res.status(200).json(result.rows[0]);
  } catch (err: unknown) {
    res.status(500).json({ message: "Error al editar la tarea" });
  }
};

export default completeTodo;