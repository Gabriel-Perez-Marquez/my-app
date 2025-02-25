import { pool } from "@/app/db/pool";
import { NextApiRequest, NextApiResponse } from "next";

const deleteTodo = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {id} = req.body;
  console.log('Datos recibidos para eliminar tarea:', { id});
  try {
    const q = "DELETE FROM tasks WHERE id = $1;";
    const values = [id];
    await pool.query(q, values);
    return res.status(201).json({message:"Task created successfully"});
  } catch (err: unknown) {
    res.status(500).json({ message: err as string });
  }
};

const editTodo = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, todo} = req.body;
  console.log('Datos recibidos para editar tarea:', { id, todo});
  try {
    const q = "UPDATE tasks SET todo = $2 WHERE id = $1 RETURNING *";
    const values = [id, todo ];
    const result = await pool.query(q, values);
    console.log('Resultado de la actualización:', result.rows[0]);
    return res.status(200).json(result.rows[0]);
  } catch (err: unknown) {
    console.error('Error al editar tarea:', err);
    res.status(500).json({ message: err as string });
  }
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    return await editTodo(req, res);
  } else if(req.method === 'DELETE'){
    return await deleteTodo(req, res);
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}