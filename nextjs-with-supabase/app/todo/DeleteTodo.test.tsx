import { render, screen, fireEvent, act } from "@testing-library/react";
import DeleteTodo from "./DeleteTodo";
import { describe, it, expect, beforeEach, vi } from "vitest";

const deleteTodoMock = vi.fn();
vi.mock("./actions", () => ({
  deleteTodo: (todoId: number) => deleteTodoMock(todoId),
}));
const reloadMock = vi.fn();
vi.stubGlobal("location", { reload: reloadMock });

describe("DeleteTodo", () => {
  beforeEach(() => {
    deleteTodoMock.mockClear();
    reloadMock.mockClear();
  });

  it("calls deleteTodo when delete button is clicked", async () => {
    render(<DeleteTodo todoId={1} />);

    await act(async () => {
      fireEvent.click(screen.getByText(/delete/i));
    });

    expect(deleteTodoMock).toHaveBeenCalledWith(1);
    expect(location.reload).toHaveBeenCalled();
  });
});
