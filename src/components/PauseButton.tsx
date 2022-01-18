import { FC } from "react";
import { MdPause } from "react-icons/md";
import Status from "../domain/Status";
import TodoData from "../domain/Todo";
import UpdateButton from "./UpdateButton";

const PauseButton: FC<{ todo: TodoData }> = ({ todo }) => {
    return (
        <UpdateButton todo={todo} label="pause" status={Status.TODO}>
            <MdPause />
        </UpdateButton>
    );
};

export default PauseButton;
