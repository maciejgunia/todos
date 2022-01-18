import { FC } from "react";
import { MdOutlinePlayArrow } from "react-icons/md";
import Status from "../domain/Status";
import TodoData from "../domain/Todo";
import UpdateButton from "./UpdateButton";

const StartButton: FC<{ todo: TodoData }> = ({ todo }) => {
    return (
        <UpdateButton todo={todo} label="start" status={Status.IN_PROGRESS}>
            <MdOutlinePlayArrow />
        </UpdateButton>
    );
};

export default StartButton;
