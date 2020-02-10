import { StringOfLength } from "./StringOfLength";

export type IssueDescription = StringOfLength<1, 2147483647>;

export type IssueSummary = StringOfLength<1, 255>;

export interface Issue {
  id: string;
  summary: string; //IssueSummary;
  description?: string; //IssueDescription;
  status?: IssueStatus;
}

export type IssueStatus = "TODO" | "IN_PROGRESS" | "DONE";
