// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "./testkit";
import { Community } from "./Community";
import { AuthorLine } from "./AuthorLine";
import { profileUrl } from "./communityLinks";
import type { AgentPort } from "../port/port";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const portWith = (openExternal = vi.fn(async () => {})) => ({ openExternal }) as unknown as Pick<AgentPort, "openExternal">;

describe("upstream attribution", () => {
  it("opens the upstream repo and issues through the host", async () => {
    const openExternal = vi.fn(async () => {});
    render(<Community port={portWith(openExternal)} />);
    await userEvent.click(screen.getByRole("button", { name: "打开上游仓库" }));
    expect(openExternal).toHaveBeenLastCalledWith("https://github.com/esengine/DeepSeek-Reasonix");
    await userEvent.click(screen.getByRole("button", { name: "GitHub issues" }));
    expect(openExternal).toHaveBeenLastCalledWith("https://github.com/esengine/DeepSeek-Reasonix/issues");
  });

  it("says so, with the address, when the host cannot open it", async () => {
    const openExternal = vi.fn(async () => { throw new Error("no browser"); });
    render(<Community port={portWith(openExternal)} />);
    await userEvent.click(screen.getByRole("button", { name: "打开上游仓库" }));
    expect((await screen.findByRole("alert")).textContent).toContain("https://github.com/esengine/DeepSeek-Reasonix");
  });

  it("links upstream attribution through the host", async () => {
    const openExternal = vi.fn(async () => {});
    render(<AuthorLine port={portWith(openExternal)} />);
    expect(screen.getByText("基于上游项目")).toBeTruthy();
    const link = screen.getByRole("link", { name: "esengine/DeepSeek-Reasonix" });
    expect(link.getAttribute("href")).toBe("https://github.com/esengine/DeepSeek-Reasonix");
    await userEvent.click(link);
    expect(openExternal).toHaveBeenCalledWith("https://github.com/esengine/DeepSeek-Reasonix");
  });

  it("never turns a hostile login into a URL", () => {
    const hostile = ["a/b", 'x"y', "../../evil", "-lead", "trail-", "a--b", "", "x".repeat(40), "https://evil.test"];
    for (const login of hostile) expect(profileUrl(login)).toBeNull();
    expect(profileUrl("A-b1")).toBe("https://github.com/A-b1");
  });
});
