import Status from "./Status";

export default interface TodoData {
    _id: string;
    name: string;
    status: Status;
}
