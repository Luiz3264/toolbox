import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import App from "./src/app.tsx";

render(<App />);

describe("Header", () => {
  it("Header display", () => {
    const header = screen.getByText("Toolbox");
    expect(header).toBeInTheDocument();
  });

  it("Github link", () => {
    const link = screen.getByText("github");
    const address = link.getAttribute("href");
    expect(address).toBe("https://github.com/Luiz3264/toolbox");
  });

  it("Theme buttons", async () => {
    const user = userEvent.setup();
    const dark = screen.getByText("dark");
    const light = screen.getByText("light");
    const auto = screen.getByText("auto");

    await user.click(dark);
    expect(localStorage.getItem("theme")).toBe("dark");
    await user.click(light);
    expect(localStorage.getItem("theme")).toBe("light");
    await user.click(auto);
    expect(localStorage.getItem("theme")).toBe(null);
  });
});
/*
describe("Components", () => {
  it("All working", () => {});
});
*/
