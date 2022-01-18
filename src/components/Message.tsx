import { FC } from "react";

const Message: FC<{ text: string }> = ({ text }) => <p className="text-center text-2xl mt-20">{text}</p>;

export default Message;
