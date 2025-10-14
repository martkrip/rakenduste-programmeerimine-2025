import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RecipesList from "./RecipesList";

describe("RecipesList", () => {
  it("renders heading", () => {
    render(<RecipesList recipes={[]} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Recipe List"
    );
  });

  it("renders recipes when provided", () => {
    const recipes = [
      { id: 1, content: "Pelmeenid" },
      { id: 2, content: "Makaronid" },
    ];
    render(<RecipesList recipes={recipes} />);
    expect(screen.getByText("Pelmeenid")).toBeDefined();
    expect(
      screen.getByText("Makaronid")
    ).toBeDefined();
  });

  it("renders empty state when no recipes exist", () => {
    render(<RecipesList recipes={[]} />);
    expect(screen.getByText("No recipes yet to cook.")).toBeDefined();
  });
});
