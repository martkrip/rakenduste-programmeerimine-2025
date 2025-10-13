import { render, screen, fireEvent, act } from "@testing-library/react";
import UpdateNote from "./UpdateNote";
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock Supabase client with chained methods
const eqMock = vi.fn(() => Promise.resolve({ error: null }));
const updateMock = vi.fn(() => ({ eq: eqMock }));
vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    from: () => ({
      update: updateMock,
    }),
  }),
}));

// Mock location.reload
const reloadMock = vi.fn();
vi.stubGlobal("location", { reload: reloadMock });

beforeEach(() => {
  updateMock.mockClear();
  eqMock.mockClear();
  reloadMock.mockClear();
});

describe("UpdateNote", () => {
  it("calls supabase.from(...).update(...).eq(...) and reloads when saving updated note", async () => {
    render(<UpdateNote noteId={1} currentContent="Old Note" />);

    // Click the Edit button to enable editing
    fireEvent.click(screen.getByText(/edit/i));

    // Change the input value
    const input = screen.getByDisplayValue("Old Note");
    await act(async () => {
      fireEvent.change(input, { target: { value: "Updated Note" } });
      fireEvent.click(screen.getByText(/save/i));
    });

    expect(updateMock).toHaveBeenCalledWith({ content: "Updated Note" });
    expect(eqMock).toHaveBeenCalledWith("id", 1);
    expect(reloadMock).toHaveBeenCalled();
  });

  it("does not call supabase if save button is clicked with empty input", async () => {
    render(<UpdateNote noteId={1} currentContent="Old Note" />);
    fireEvent.click(screen.getByText(/edit/i));

    const input = screen.getByDisplayValue("Old Note");
    await act(async () => {
      fireEvent.change(input, { target: { value: "" } });
      fireEvent.click(screen.getByText(/save/i));
    });

    expect(updateMock).not.toHaveBeenCalled();
    expect(eqMock).not.toHaveBeenCalled();
    expect(reloadMock).not.toHaveBeenCalled();
  });

  it("cancels editing when Cancel is clicked", async () => {
    render(<UpdateNote noteId={1} currentContent="Old Note" />);
    fireEvent.click(screen.getByText(/edit/i));

    fireEvent.click(screen.getByText(/cancel/i));

    // The Save button should no longer be in the document
    expect(screen.queryByText(/save/i)).toBeNull();
  });
});
