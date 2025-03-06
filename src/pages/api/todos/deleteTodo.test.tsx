import "@testing-library/jest-dom";
import deleteTodo from "../../../../src/pages/api/todos/deleteTodo";
import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "../../../app/db/pool";



const queryMock = jest.fn();
const jsonMock = jest.fn();
const statusMock = jest.fn(() => ({
    json: jsonMock,
}));

jest.mock('../../../app/db/pool', () => ({
    getClient: () => {
        return {
            query: queryMock,
            connect: jest.fn()
        }
    }
}))


describe('Delete Todo', () => {
    it('http 200', async () => {
        const req: NextApiRequest = {
            body: {
                id: "1",
            }
        } as any;
        const res: NextApiResponse = {
            status: statusMock,
        } as any;
        queryMock.mockResolvedValueOnce({ message: "Task deleted successfully" });
        await deleteTodo(req, res);
        expect(queryMock).toHaveBeenCalledWith("DELETE FROM tasks WHERE id = $1;", ["1"]);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith({ message: "Task deleted successfully" });
    })

    it('http 500', async () => {
        const req: NextApiRequest = {
            body: {
                id: "1",
            }
        } as any;
        const res: NextApiResponse = {
            status: statusMock
        } as any
        queryMock.mockRejectedValueOnce(new Error("Error al borrar la tarea"));
        await deleteTodo(req, res);
        expect(queryMock).toHaveBeenCalledWith("DELETE FROM tasks WHERE id = $1;", ["1"]);
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ message: "Error deleting the task"});

    })
}) 