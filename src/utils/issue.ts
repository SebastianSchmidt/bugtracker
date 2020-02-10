import { IssueStatus } from "../types";

export const toStatus = (val: string): IssueStatus => {
  switch (val) {
    case "TODO":
      return "TODO";
    case "DONE":
      return "DONE";
    case "IN_PROGRESS":
      return "IN_PROGRESS";
  }
  throw Error("none");
};
