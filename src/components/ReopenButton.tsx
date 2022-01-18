import { FC } from "react";
import { MdRemoveDone } from "react-icons/md";
import Status from "../domain/Status";
import TodoData from "../domain/Todo";
import UpdateButton from "./UpdateButton";

const ReopenButton: FC<{ todo: TodoData }> = ({ todo }) => (
    <UpdateButton todo={todo} label="reopen" status={Status.IN_PROGRESS}>
        <MdRemoveDone />
    </UpdateButton>
);

export default ReopenButton;
