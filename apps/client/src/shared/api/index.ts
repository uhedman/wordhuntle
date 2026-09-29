import * as mock from "./mock";
import * as real from "./real";

export const api = import.meta.env.MODE === "mock" ? mock : real;
