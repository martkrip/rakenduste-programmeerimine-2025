import { render, screen, fireEvent, act } from "@testing-library/react";
import DeleteNote from "./DeleteNote";
import { describe, it, expect, beforeEach, vi } from "vitest";

const eqMock = vi.fn(() => Promise.resolve({ error: null }));
const deleteMock = vi.fn(() => ({ eq: eqMock }));
vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    from: () => ({
      delete: deleteMock,
    }),
  }),
}));

const reloadMock = vi.fn();
vi.stubGlobal("location", { reload: reloadMock });

beforeEach(() => {
  deleteMock.mockClear();
  eqMock.mockClear();
  reloadMock.mockClear();
});

describe("DeleteNote", () => {
  it("calls supabase.from(...).delete().eq(...) and reloads when delete button is clicked", async () => {
    render(<DeleteNote noteId={1} />);

    await act(async () => {
      fireEvent.click(screen.getByText(/delete/i));
    });

    expect(deleteMock).toHaveBeenCalled();
    expect(eqMock).toHaveBeenCalledWith("id", 1);
    expect(reloadMock).toHaveBeenCalled();
  });
});
