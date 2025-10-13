import { render, screen, fireEvent, act } from "@testing-library/react";
import CreateTodo from "./CreateTodo";
import { beforeEach, describe, expect, it, vi } from "vitest";

const createTodoMock = vi.fn();
vi.mock("./actions", () => ({
  createTodo: (todoId: number) => createTodoMock(todoId),
}));

vi.stubGlobal("location", { reload: vi.fn() });

describe("createTodo", () => {
    beforeEach(() => {
        createTodoMock.mockClear();
    });

    it("calls CreateTodo when form is submitted", async () => {
        render(<CreateTodo />);
        const input = screen.getByPlaceholderText(/write a new task/i)

        await act(async () => {
            fireEvent.change(input, { target: { value: "Test Task" } });
            fireEvent.click(screen.getByText(/add/i))
        });

        expect(createTodoMock).toHaveBeenCalled();
    })
  it("does not call createTodo if input is empty", async () => {
    render(<CreateTodo />);
    await act(async () => {
      fireEvent.click(screen.getByText(/add/i));
    });
      expect(createTodoMock).not.toHaveBeenCalled();
  });
});
