import "@testing-library/jest-dom";
import createTodo from "../../../../src/pages/api/todos/createTodo";
import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "@/app/db/pool";


interface todoProps {
    id: string;
    todo: string;
    completed: boolean;
    userId: number;
}


const rowsMock: todoProps[]= [];
const queryMock = jest.fn();
const jsonMock = jest.fn();
const statusMock = jest.fn((status) => ({
    json: jsonMock
}));


jest.mock('../../../app/db/pool', () => ({
    getClient: () => {
        return {
            query: queryMock
        }
    }
}))




describe('create a todo', () => {
    it("http 200", async () => {
        const req: NextApiRequest = {
            body: {
                id: "1",
                todo: "Test Task",
                completed: false,
                userId: 1
            }
        } as any;
        const res: NextApiResponse = {
            status: statusMock
        } as any;
        queryMock.mockResolvedValueOnce({ rows: rowsMock})
        await createTodo(req, res);
        expect(queryMock).toHaveBeenCalledWith("INSERT INTO tasks (id, todo, completed, userId) VALUES ($1, $2, $3, $4)", ['1', 'Test Task', false, 1])
        expect(statusMock).toHaveBeenCalledWith(201);
    });

    it("http 500", async () => {
        const req: NextApiRequest = {
            body: {
                id: "1",
                todo: "Test Task",
                completed: false,
                userId: 1
            }
        } as any;
        const res: NextApiResponse = {
            status: statusMock
        } as any;
        queryMock.mockRejectedValueOnce(new Error("Error en la base de datos"))
        await createTodo(req, res);
        expect(queryMock).toHaveBeenCalledWith("INSERT INTO tasks (id, todo, completed, userId) VALUES ($1, $2, $3, $4)", ['1', 'Test Task', false, 1])
        expect(statusMock).toHaveBeenCalledWith(500);
    })
});
