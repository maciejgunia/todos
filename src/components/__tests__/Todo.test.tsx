import { render, screen } from "@testing-library/react";
import Status from "../../domain/Status";
import Todo from "../Todo";
import { Wrapper } from "../../testHelpers";

jest.mock("../StartButton");
jest.mock("../CompleteButton");
jest.mock("../RemoveButton");
jest.mock("../PauseButton");
jest.mock("../ReopenButton");

describe("TODO", () => {
    test("should display proper buttons when not started", () => {
        render(
            <Wrapper>
                <Todo todo={{ status: Status.TODO }} />
            </Wrapper>
        );

        expect(screen.getByRole("button", { name: "start" })).toBeDefined();
        expect(screen.getByRole("button", { name: "remove" })).toBeDefined();

        expect(screen.queryByRole("button", { name: "pause" })).toBeNull();
        expect(screen.queryByRole("button", { name: "complete" })).toBeNull();
        expect(screen.queryByRole("button", { name: "reopen" })).toBeNull();
    });

    test("should display proper buttons when in progress", () => {
        render(
            <Wrapper>
                <Todo todo={{ status: Status.IN_PROGRESS }} />
            </Wrapper>
        );

        expect(screen.getByRole("button", { name: "pause" })).toBeDefined();
        expect(screen.getByRole("button", { name: "complete" })).toBeDefined();

        expect(screen.queryByRole("button", { name: "start" })).toBeNull();
        expect(screen.queryByRole("button", { name: "remove" })).toBeNull();
        expect(screen.queryByRole("button", { name: "reopen" })).toBeNull();
    });

    test("should display proper buttons when done", () => {
        render(
            <Wrapper>
                <Todo todo={{ status: Status.DONE }} />
            </Wrapper>
        );

        expect(screen.getByRole("button", { name: "reopen" })).toBeDefined();
        expect(screen.getByRole("button", { name: "remove" })).toBeDefined();

        expect(screen.queryByRole("button", { name: "start" })).toBeNull();
        expect(screen.queryByRole("button", { name: "pause" })).toBeNull();
        expect(screen.queryByRole("button", { name: "complete" })).toBeNull();
    });
});
