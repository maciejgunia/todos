import { render, screen } from "@testing-library/react";
import { Wrapper } from "../../testHelpers";
import TodoForm from "../TodoForm";
import userEvent from "@testing-library/user-event";

fdescribe("TodoForm", () => {
    test("should add a todo", () => {
        render(
            <Wrapper>
                <TodoForm />
            </Wrapper>
        );

        userEvent.type(screen.getByRole("textbox", { name: "name" }), "123");
        userEvent.click(screen.getByRole("button", { name: "create" }));

        // TODO: test if the request is going out
    });
});
