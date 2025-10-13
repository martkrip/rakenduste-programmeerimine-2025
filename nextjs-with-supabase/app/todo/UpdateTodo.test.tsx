import { render, screen, fireEvent, act } from "@testing-library/react";
import UpdateTodo from "./UpdateTodo";
import { beforeEach, describe, expect, it, vi } from "vitest";

const updateTodoMock = vi.fn();
vi.mock("./actions", () => ({
  updateTodo: (todoId: number, updatedTask: string) => updateTodoMock(todoId, updatedTask)
}));

vi.stubGlobal("location", { reload: vi.fn() });

describe("UpdateTodo", () => {
  beforeEach(() => {
    updateTodoMock.mockClear();
  });

  it("calls UpdateTodo when editing and saving", async () => {
      render(<UpdateTodo todoId={1} currentTask="Old Task" />);
      
      const editButton = screen.getByText(/edit/i);
      fireEvent.click(editButton)

      const input = screen.getByDisplayValue("Old Task")

    await act(async () => {
      fireEvent.change(input, { target: { value: "Updated Task" } });
      fireEvent.click(screen.getByText(/save/i));
    });

    expect(updateTodoMock).toHaveBeenCalledWith(1, "Updated Task");
  });
  it("does not call createTodo if save button is clicked with empty input", async () => {
      render(<UpdateTodo todoId={1} currentTask="Old Task" />);
      
      const editButton = screen.getByText(/edit/i);
      fireEvent.click(editButton);

      const input = screen.getByDisplayValue("Old Task");
      await act(async () => {
          fireEvent.change(input, { target: { value: "" } });
      fireEvent.click(screen.getByText(/save/i));
    });
    expect(updateTodoMock).not.toHaveBeenCalled();
  });
    
    it("cancels editing when Cancel is clicked", async () => {
        render(<UpdateTodo todoId={1} currentTask="Old Task" />);

        const editButton = screen.getByText(/edit/i);
        fireEvent.click(editButton);

        fireEvent.click(screen.getByText(/cancel/i));

        expect(screen.queryByText(/save/i)).toBeNull();
    })
});
