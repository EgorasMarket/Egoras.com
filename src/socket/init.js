import { io } from "socket.io-client";
import { EGORAS_PAY_URL } from "../core/constants";

export const socket = io(EGORAS_PAY_URL);
