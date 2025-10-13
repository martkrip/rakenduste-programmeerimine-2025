import { render, screen, fireEvent, act } from "@testing-library/react";
import CreateNote from "./CreateNote";
import { describe, it, expect, beforeEach, vi } from "vitest";

const insertMock = vi.fn(() => Promise.resolve({ error: null }));
vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    from: () => ({
      insert: insertMock,
    }),
  }),
}));

const reloadMock = vi.fn();
vi.stubGlobal("location", { reload: reloadMock });

beforeEach(() => {
  insertMock.mockClear();
  reloadMock.mockClear();
});

describe("CreateNote", () => {
  it("calls supabase.from(...).insert(...) when form is submitted with input", async () => {
    render(<CreateNote />);
    const input = screen.getByPlaceholderText(/write a new note/i);

    await act(async () => {
      fireEvent.change(input, { target: { value: "Test Note" } });
      fireEvent.click(screen.getByText(/add/i));
    });

    expect(insertMock).toHaveBeenCalledWith({ content: "Test Note" });
    expect(reloadMock).toHaveBeenCalled();
  });

  it("does not call insert if input is empty", async () => {
    render(<CreateNote />);
    await act(async () => {
      fireEvent.click(screen.getByText(/add/i));
    });

    expect(insertMock).not.toHaveBeenCalled();
    expect(reloadMock).not.toHaveBeenCalled();
  });
});
