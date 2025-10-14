import { render, screen, fireEvent, act } from "@testing-library/react";
import UpdateRecipe from "./UpdateRecipe";
import { beforeEach, describe, expect, it, vi } from "vitest";

const updateRecipeMock = vi.fn();
vi.mock("./actions", () => ({
  updateRecipe: (recipeId: number, updatedContent: string) =>
    updateRecipeMock(recipeId, updatedContent),
}));

vi.stubGlobal("location", { reload: vi.fn() });

describe("UpdateRecipe", () => {
  beforeEach(() => {
    updateRecipeMock.mockClear();
  });

  it("calls UpdateRecipe when editing and saving", async () => {
    render(<UpdateRecipe recipeId={1} currentRecipe="Old Recipe" />);

    const editButton = screen.getByText(/edit/i);
    fireEvent.click(editButton);

    const input = screen.getByDisplayValue("Old Recipe");

    await act(async () => {
      fireEvent.change(input, { target: { value: "Updated Recipe" } });
      fireEvent.click(screen.getByText(/save/i));
    });

    expect(updateRecipeMock).toHaveBeenCalledWith(1, "Updated Recipe");
  });
  it("does not call createRecipe if save button is clicked with empty input", async () => {
    render(<UpdateRecipe recipeId={1} currentRecipe="Old Recipe" />);

    const editButton = screen.getByText(/edit/i);
    fireEvent.click(editButton);

    const input = screen.getByDisplayValue("Old Recipe");
    await act(async () => {
      fireEvent.change(input, { target: { value: "" } });
      fireEvent.click(screen.getByText(/save/i));
    });
    expect(updateRecipeMock).not.toHaveBeenCalled();
  });

  it("cancels editing when Cancel is clicked", async () => {
    render(<UpdateRecipe recipeId={1} currentRecipe="Old Recipe" />);

    const editButton = screen.getByText(/edit/i);
    fireEvent.click(editButton);

    fireEvent.click(screen.getByText(/cancel/i));

    expect(screen.queryByText(/save/i)).toBeNull();
  });
});
