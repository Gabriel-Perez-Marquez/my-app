import "@testing-library/jest-dom";
import completeTodo from "../../../../src/pages/api/todos/completeTodo";
import { NextApiRequest, NextApiResponse } from "next";

interface todoProps{
    id: string,
    todo: string,
    completed: boolean,
    userId: number
}


const rowsMock = [{ id: "1", completed: true }]
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
}))

describe('complete Todo', () => {
    it('http 200', async () => {
        const req: NextApiRequest = {
            body: {
                id: "1",
                completed: false
            }
        } as any

        const res: NextApiResponse = {
            status: statusMock
        } as any
        queryMock.mockResolvedValueOnce({rows: rowsMock})
        await completeTodo(req, res);
        expect(queryMock).toHaveBeenCalledWith("UPDATE tasks SET completed = $2 WHERE id = $1 RETURNING *", ["1", true]);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(rowsMock[0])
    })

    it('http 500', async () => {
        const req: NextApiRequest = {
            body: {
                id: "1",
                completed: false
            }
        } as any

        const res: NextApiResponse = {
            status: statusMock
        } as any
        queryMock.mockRejectedValueOnce(new Error("Error al editar la tarea"))
        await completeTodo(req, res);
        expect(queryMock).toHaveBeenCalledWith("UPDATE tasks SET completed = $2 WHERE id = $1 RETURNING *", ["1", true]);
        expect(statusMock).toHaveBeenCalledWith(500);
    })
})