import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import { Form, Formik } from "formik";
import { useLocalStorage } from "react-use";
import uuid from "uuid";

const IssueForm = ({ initialData, onSubmit }) => {
  const handleSubmit = async (data, actions) => {
    try {
      await onSubmit(data);
      actions.setSubmitting(false);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <Formik
        initialValues={initialData}
        onSubmit={handleSubmit}
        render={({ handleChange, values }) => (
          <Form>
            <label for="summary">Summary</label>
            <input
              value={values.summary}
              onChange={handleChange}
              name="summary"
            />
            <label for="description">Description</label>
            <textarea
              value={values.description}
              onChange={handleChange}
              name="description"
            ></textarea>
            <button type="submit">submit</button>
          </Form>
        )}
      ></Formik>
    </div>
  );
};

const EditIssue = ({ issues, id, path, onSubmit }) => {
  const issue = issues.find(issue => issue.id === id);
  console.log("TCL: EditIssue -> issue", issue);
  return <IssueForm initialData={issue} onSubmit={onSubmit} />;
};

const CreateIssue = ({ path, onSubmit }) => {
  return (
    <div>
      <Link to="/issues">back</Link>
      <IssueForm
        initialData={{
          id: uuid.v4(),
          summary: "",
          description: "",
          status: "TODO"
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const IssueList = ({ title, issues, onUpdateStatus, onDeleteIssue }) => {
  return (
    <ul>
      <p>{title}</p>
      {issues.map(issue => {
        console.log("TCL: IssuesView -> issue", issue);
        return (
          <li key={issue.id}>
            {issue.summary}
            <button onClick={() => onDeleteIssue(issue.id)}>remove</button>
            <button onClick={() => navigate(`/issues/${issue.id}`)}>
              edit
            </button>
            <select
              value={issue.status}
              onChange={e => {
                onUpdateStatus(issue.id, e.target.value);
              }}
            >
              <option value="TODO">todo</option>
              <option value="IN_PROGRESS">in progress</option>
            </select>
          </li>
        );
      })}
    </ul>
  );
};

const IssuesView = ({ path, issues, onDeleteIssue, onUpdateStatus }) => {
  const [issuesTodo, setIssuesTodo] = useState([]);
  const [issuesInProgress, setIssuesInProgress] = useState([]);
  const [issuesDone, setIssuesDone] = useState([]);

  useEffect(() => {
    const filter = filter => issues.filter(issue => issue.status === filter);
    setIssuesTodo(filter("TODO"));
    setIssuesInProgress(filter("IN_PROGRESS"));
    setIssuesDone(filter("DONE"));
  }, [issues]);
  return (
    <div>
      <Link to="new">new</Link>
      <div className="issues-grid">
        <IssueList title={`Todo (${issuesTodo.length})`} issues={issuesTodo} />
        <IssueList
          title={`In Progress (${issuesInProgress.length})`}
          issues={issuesInProgress}
        />
        <IssueList title={`Done (${issuesDone.length})`} issues={issuesDone} />
      </div>
    </div>
  );
};

const IssuePage = ({ path }) => {
  const [issues, setIssues] = useLocalStorage("issues", []);

  const addIssue = issue => {
    console.log("TCL: IssuePage -> issue", issue);
    setIssues([...issues, issue]);
    navigate("/issues");
  };
  const removeIssue = id => {
    setIssues(issues.filter(issue => issue.id !== id));
  };
  const updateIssue = data => {
    const index = issues.findIndex(issue => issue.id === data.id);
    const newIssues = [...issues];
    newIssues.splice(index, 1, data);
    setIssues(newIssues);
    navigate("/issues");
  };

  const updateStatus = (id, status) => {
    const index = issues.findIndex(issue => issue.id === id);
    const data = {
      ...issues[index],
      status
    };
    const newIssues = [...issues];
    newIssues.splice(index, 1, data);
    setIssues(newIssues);
    navigate("/issues");
  };

  useEffect(() => {
    console.log(issues);
  }, [issues]);
  return (
    <div>
      <Router>
        <IssuesView
          path="/"
          issues={issues}
          onDeleteIssue={removeIssue}
          onUpdateStatus={updateStatus}
        />
        <CreateIssue path="new" onSubmit={addIssue} />
        <EditIssue issues={issues} path=":id" onSubmit={updateIssue} />
      </Router>
    </div>
  );
};

export default IssuePage;
