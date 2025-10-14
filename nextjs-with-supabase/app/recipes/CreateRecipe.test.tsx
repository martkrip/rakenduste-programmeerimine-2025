import { render, screen, fireEvent, act } from "@testing-library/react";
import CreateRecipe from "./CreateRecipe";
import { beforeEach, describe, expect, it, vi } from "vitest";

const createRecipeMock = vi.fn();
vi.mock("./actions", () => ({
  createRecipe: (recipeId: number) => createRecipeMock(recipeId),
}));

vi.stubGlobal("location", { reload: vi.fn() });

describe("createRecipe", () => {
  beforeEach(() => {
    createRecipeMock.mockClear();
  });

  it("calls CreateRecipe when form is submitted", async () => {
    render(<CreateRecipe />);
    const input = screen.getByPlaceholderText(/write a new recipe/i);

    await act(async () => {
      fireEvent.change(input, { target: { value: "Test Recipe" } });
      fireEvent.click(screen.getByText(/add/i));
    });

    expect(createRecipeMock).toHaveBeenCalled();
  });
  it("does not call createRecipe if input is empty", async () => {
    render(<CreateRecipe />);
    await act(async () => {
      fireEvent.click(screen.getByText(/add/i));
    });
    expect(createRecipeMock).not.toHaveBeenCalled();
  });
});
