import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

import App from "./app/page.tsx";

const user = userEvent.setup();
render(<App />);

describe("Header", () => {
  it("Text", () => {
    const header = screen.getByText("Toolbox");
    expect(header).toBeInTheDocument();
  });

  it("Search", async () => {
    const search = screen.getByPlaceholderText("search");
    await user.type(search, "eyes");
    const eyes = await screen.queryByText("Noise");
    expect(eyes).toBe(null);
  });
});
