import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { Issue as IssueType, IssueStatus, Issue } from "../types";
import { toStatus } from "../utils/issue";
import "./IssueList.css";
import Button from "./Button";

const IssueList = ({
  title,
  issues,
  onUpdateStatus,
  onDeleteIssue
}: {
  issues: Array<IssueType>;
  title: string;
  onUpdateStatus: (id: string, status: IssueStatus) => void;
  onDeleteIssue: (id: string) => void;
}) => {
  const [sortedIssues, setSortedIssues] = useState<Array<Issue>>([]);
  useEffect(() => {
    const summaries = issues.map(issue => issue.summary);
    const sortedIssues = summaries.sort().map(summary => {
      const index = issues.findIndex(issue => issue.summary === summary);
      const issue = issues[index];
      return issue;
    });
    setSortedIssues(sortedIssues);
  }, [issues]);
  return (
    <ul>
      <p>{title}</p>
      {sortedIssues.map((issue, index) => {
        return (
          <li className={`issue-card ${index === 0 && "first"}`} key={issue.id}>
            <div className="title">{issue.summary}</div>
            <div className="actions">
              <Button onClick={() => onDeleteIssue(issue.id)}>remove</Button>
              <Button onClick={() => navigate(`/issues/${issue.id}`)}>
                edit
              </Button>
              <select
                value={issue.status}
                onChange={e => {
                  const status = toStatus(e.target.value);
                  onUpdateStatus(issue.id, status);
                }}
              >
                <option value="TODO">todo</option>
                <option value="IN_PROGRESS">in progress</option>
                <option value="DONE">done</option>
              </select>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default IssueList;
