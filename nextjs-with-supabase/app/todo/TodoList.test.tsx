import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TodoList from "./TodoList";

describe("TodoList", () => {
  it("renders heading", () => {
    render(<TodoList todos={[]} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Todo List"
    );
  });

  it("renders tasks when provided", () => {
    const todos = [
      { id: 1, task: "Teha Raimo kodutööd" },
      { id: 2, task: "Tee diskreetse matemaatika kodutöö" },
    ];
    render(<TodoList todos={todos} />);
    expect(screen.getByText("Teha Raimo kodutööd")).toBeDefined();
    expect(
      screen.getByText("Tee diskreetse matemaatika kodutöö")
    ).toBeDefined();
  });

  it("renders empty state when no tasks exist", () => {
    render(<TodoList todos={[]} />);
    expect(screen.getByText("No tasks yet.")).toBeDefined();
  });
});
