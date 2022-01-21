import UpdateButton from "../UpdateButton";
import { Wrapper } from "../../testHelpers";
import { fireEvent, render, screen } from "@testing-library/react";
import Status from "../../domain/Status";
import { testTodo } from "../../mocks/data";

jest.mock("../../hooks/useUpdateTodo.ts");

describe("UpdateButton", () => {
    test("should do something", () => {
        render(
            <Wrapper>
                <UpdateButton todo={testTodo} label={"start"} status={Status.IN_PROGRESS} />
            </Wrapper>
        );

        fireEvent(screen.getByRole("button", { name: "start" }), new MouseEvent("click"));
    });
});
