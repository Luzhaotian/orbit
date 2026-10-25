// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "./testkit";
import { App } from "./App";
import { dropDraft } from "./feedbackdraft";
import { MockHub } from "../port/mock_hub";

afterEach(() => {
  cleanup();
  dropDraft();
});

function folderless() {
  const hub = new MockHub();
  const build = hub.portFor.bind(hub);
  hub.portFor = (rt) => {
    const port = build(rt);
    port.providerSetup = async () => null;
    port.welcomeSeen = async () => true;
    return port;
  };
  const roots: string[] = [];
  hub.runtimes = async () => [];
  hub.tree = async () => roots.map((root) => ({ root, name: root, open: false, remembered: true, sessions: [] }));
  const add = hub.addWorkspace.bind(hub);
  hub.addWorkspace = (path) => {
    roots.push(path);
    return add(path);
  };
  hub.pickFolder = async () => "~/projects/new";
  return { hub };
}

describe("settings with no pane open", () => {
  it("drops the settings refusal once a folder is added", async () => {
    const { hub } = folderless();
    render(<App hub={hub} />);
    await userEvent.click(await screen.findByRole("button", { name: /工具与集成/ }));
    await waitFor(() => expect(document.querySelector(".errbar")!.textContent).toContain("设置需要一个打开的会话"));
    await userEvent.click(await screen.findByRole("button", { name: "添加文件夹" }));
    await waitFor(() => expect(document.querySelector(".errbar")).toBeNull());
  });
});
