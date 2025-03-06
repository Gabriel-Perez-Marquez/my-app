import "@testing-library/jest-dom";
import { getTodos } from "../../../../src/pages/api/todos";
import { NextApiRequest, NextApiResponse } from "next";
import {createTodo} from "./index";
import indexHandler from "./index";

interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

const rowsMock: Todo[] = [];
const queryMock = jest.fn();
const jsonMock = jest.fn();
const statusMock = jest.fn((status) => ({
  json: jsonMock,
  setHeader: jest.fn(),
  end: jest.fn(),
}));

jest.mock('../../../app/db/pool', () => ({
  getClient: () => {
    return {
      query: queryMock,
      end: jest.fn(),
      connect: jest.fn()
    };
  }
}));

beforeEach(() => {
  queryMock.mockClear();
  jsonMock.mockClear();
  statusMock.mockClear();
});

describe("get todos", () => {
  it("http 200", async () => {
    const request: NextApiRequest = {} as any;
    const response: NextApiResponse = {
      status: statusMock,
    } as any;
    queryMock.mockResolvedValueOnce({ rows: rowsMock });
    await getTodos(request, response);
    expect(queryMock).toHaveBeenCalledWith("SELECT * FROM tasks");
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(rowsMock);
  });

  it("http 500", async () => {
    const request: NextApiRequest = {} as any;
    const response: NextApiResponse = {
      status: statusMock,
    } as any;
    queryMock.mockRejectedValueOnce(new Error("Error en la base de datos"));
    await getTodos(request, response);
    expect(queryMock).toHaveBeenCalledWith("SELECT * FROM tasks");
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Error al obtener las tareas"});
  });
});

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
          status: statusMock,
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


describe('indexHandler', () => {
  it('should handle GET requests', async () => {
  const req: NextApiRequest = {
    method: 'GET'
  } as any;
  const res: NextApiResponse = {
    status: statusMock,
    setHeader: jest.fn()
  } as any;
  await indexHandler(req, res);
  expect(statusMock).toHaveBeenCalledWith(200);
  });

  it('should handle POST requests', async () => {
  const req: NextApiRequest = {
    method: 'POST',
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
  await indexHandler(req, res);
  expect(statusMock).toHaveBeenCalledWith(201);
  });

  it('should return 405 for unsupported methods', async () => {
  const req: NextApiRequest = {
    method: 'PUT'
  } as any;
  const res: NextApiResponse = {
    status: statusMock,
    setHeader: jest.fn()
  } as any;
  await indexHandler(req, res);
  expect(statusMock).toHaveBeenCalledWith(405);
  });
});
