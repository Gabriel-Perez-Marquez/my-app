import { getClient } from "@/app/db/pool";
import { NextApiRequest, NextApiResponse } from "next";





const deleteTodo = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const client = getClient();
  const {id} = req.body;
  console.log('Datos recibidos para eliminar tarea:', { id});
  try {
    const q = "DELETE FROM tasks WHERE id = $1;";
    const values = [id];
    await client.query(q, values);
    return res.status(201).json({message:"Task created successfully"});
  } catch (err: unknown) {
    res.status(500).json({ message: err as string });
  }
};

export default deleteTodo;