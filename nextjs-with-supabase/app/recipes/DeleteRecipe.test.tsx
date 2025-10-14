import { render, screen, fireEvent, act } from "@testing-library/react";
import DeleteRecipe from "./DeleteRecipe";
import { describe, it, expect, beforeEach, vi } from "vitest";

const deleteRecipeMock = vi.fn();
vi.mock("./actions", () => ({
  deleteRecipe: (recipeId: number) => deleteRecipeMock(recipeId),
}));
const reloadMock = vi.fn();
vi.stubGlobal("location", { reload: reloadMock });

describe("DeleteRecipe", () => {
  beforeEach(() => {
    deleteRecipeMock.mockClear();
    reloadMock.mockClear();
  });

  it("calls deleteRecipe when delete button is clicked", async () => {
    render(<DeleteRecipe recipeId={1} />);

    await act(async () => {
      fireEvent.click(screen.getByText(/delete/i));
    });

    expect(deleteRecipeMock).toHaveBeenCalledWith(1);
    expect(location.reload).toHaveBeenCalled();
  });
});
