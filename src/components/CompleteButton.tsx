import { FC } from "react";
import { MdDone } from "react-icons/md";
import Status from "../domain/Status";
import TodoData from "../domain/Todo";
import UpdateButton from "./UpdateButton";

const CompleteButton: FC<{ todo: TodoData }> = ({ todo }) => (
    <UpdateButton todo={todo} label="complete" status={Status.DONE}>
        <MdDone />
    </UpdateButton>
);

export default CompleteButton;
