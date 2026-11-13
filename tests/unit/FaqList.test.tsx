import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FaqList } from "@/components/sections/FaqList";

const ITEMS = [
  { question: "Q1", answer: "A1" },
  { question: "Q2", answer: "A2" },
];

describe("FaqList", () => {
  it("starts with every answer collapsed", () => {
    render(<FaqList items={ITEMS} />);
    for (const button of screen.getAllByRole("button")) {
      expect(button).toHaveAttribute("aria-expanded", "false");
    }
    expect(screen.getByText("A1")).not.toBeVisible();
  });

  it("opens one answer at a time and closes on second click", async () => {
    const user = userEvent.setup();
    render(<FaqList items={ITEMS} />);
    const [q1, q2] = screen.getAllByRole("button");

    await user.click(q1);
    expect(q1).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("A1")).toBeVisible();
    expect(document.getElementById(q1.getAttribute("aria-controls")!)).toHaveTextContent("A1");

    await user.click(q2);
    expect(q1).toHaveAttribute("aria-expanded", "false");
    expect(q2).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("A1")).not.toBeVisible();

    await user.click(q2);
    expect(q2).toHaveAttribute("aria-expanded", "false");
  });
});
