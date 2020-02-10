import React, { useState, useEffect } from "react";
import { IssueStatus, Issue } from "../types";

import "./Board.css";
import IssueList from "./IssueList";

const Board = ({
  issues,
  statuses,
  onDeleteIssue,
  onUpdateStatus
}: {
  issues: Array<Issue>;
  statuses: Array<IssueStatus>;
  onDeleteIssue: (id: string) => void;
  onUpdateStatus: (id: string, status: IssueStatus) => void;
}) => {
  const [issuesByStatus, setIssuesByStatus] = useState<{
    [key: string]: Array<Issue>;
  }>({});

  useEffect(() => {
    const filter = (filter: string) =>
      issues.filter(issue => issue.status === filter);
    const byStatus = statuses.reduce(
      (
        acc: {
          [key: string]: Array<Issue>;
        },
        current
      ) => {
        acc[current] = filter(current);

        return acc;
      },
      {}
    );
    setIssuesByStatus(byStatus);
  }, [issues, statuses]);

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: "auto ".repeat(statuses.length)
      }}
    >
      {Object.keys(issuesByStatus).map(status => (
        <IssueList
          key={status}
          onDeleteIssue={onDeleteIssue}
          onUpdateStatus={onUpdateStatus}
          title={`${status} (${issuesByStatus[status].length})`}
          issues={issuesByStatus[status]}
        />
      ))}
    </div>
  );
};

export default Board;
