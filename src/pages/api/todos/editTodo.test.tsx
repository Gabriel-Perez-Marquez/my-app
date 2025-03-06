import "@testing-library/jest-dom";
import editTodo from "../../../../src/pages/api/todos/editTodo";
import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";


interface todoProps {
    id: string,
    todo: string,
    completed: boolean,
    userId: number
}

const rowsMock = [{ id:"1", todo:"Comer"}];
const queryMock = jest.fn();
const jsonMock = jest.fn();
const statusMock = jest.fn(() => ({
    json: jsonMock
})) 

jest.mock('../../../app/db/pool', () => ({
    getClient: () => {
        return {
            query: queryMock,
            connect: jest.fn()
        }
    }
}));


describe('edit Todo', () => {
    it('http 200', async () => {
        const req: NextApiRequest = {
            body: {
                id: "1",
                todo: "Comer"
            }
        } as any
        const res: NextApiResponse = {
            status: statusMock
        } as any
        queryMock.mockResolvedValueOnce({ rows: rowsMock });
        await editTodo(req, res);
        expect(queryMock).toHaveBeenCalledWith("UPDATE tasks SET todo = $2 WHERE id = $1 RETURNING *", ["1", "Comer"]);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(rowsMock[0]);
    })

    it('http 500', async () => {
        const req: NextApiRequest = {
            body: {
                id: "1",
                todo: "Comer"
            }
        } as any
        const res: NextApiResponse = {
            status: statusMock
        } as any
        queryMock.mockRejectedValueOnce(new Error("Error al editar la tarea"));
        await editTodo(req, res);
        expect(queryMock).toHaveBeenCalledWith("UPDATE tasks SET todo = $2 WHERE id = $1 RETURNING *", ["1", "Comer"]);
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ message: "Error al editar la tarea"})
    })
})