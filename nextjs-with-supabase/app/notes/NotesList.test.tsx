
vi.mock("@/lib/supabase/client", () => ({
    createClient: () => ({
        from: () => ({
            select: () => ({ data: [], error: null }),
            insert: () => ({ data: [], error: null }),
        }),
        auth: {
            getSession: async () => ({ data: { session: null }, error: null})
        }
    })
}))


import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NotesList from "./NotesList";

describe("NotesList", () => {
  it("renders heading", () => {
    render(<NotesList notes={[]} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Notes");
  });

  it("renders notes when provided", () => {
    const notes = [
      { id: 1, content: "Test Note 1" },
      { id: 2, content: "Test Note 2" },
    ];
    render(<NotesList notes={notes} />);
    expect(screen.getByText("Test Note 1")).toBeDefined();
    expect(screen.getByText("Test Note 2")).toBeDefined();
  });

  it("renders empty state when there are no notes", () => {
    render(<NotesList notes={[]} />);
    expect(screen.getByText("No notes yet.")).toBeDefined();
  });
});
