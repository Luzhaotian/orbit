// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import "./testkit";
import { Sponsor } from "./Sponsor";

afterEach(cleanup);

describe("sponsor", () => {
  it("renders nothing in this fork", () => {
    const { container } = render(<Sponsor />);
    expect(container.innerHTML).toBe("");
  });
});
