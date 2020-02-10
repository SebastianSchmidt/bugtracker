import React from "react";
import { Router, Link, navigate } from "@reach/router";
import { Form, Formik } from "formik";
import { useLocalStorage } from "react-use";
import uuid from "uuid";
import Board from "./components/Board";
import Layout from "./components/Layout";
import Button from "./components/Button";

const IssueForm = ({ initialData, onSubmit, onCancel }) => {
  const handleSubmit = async (data, actions) => {
    try {
      await onSubmit(data);
      actions.setSubmitting(false);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialData}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleSubmit, handleReset, values }) => (
        <>
          <Form
            style={{
              display: "grid",
              gridTemplateColumns: "50%",
              justifyContent: "center",
              gridGap: 24,
              gridTemplateRows: "auto auto auto 250px",
              padding: 24
            }}
          >
            <label htmlFor="summary">Summary</label>
            <input
              autoFocus
              value={values.summary}
              onChange={handleChange}
              name="summary"
            />
            <label htmlFor="description">Description</label>
            <textarea
              value={values.description}
              onChange={handleChange}
              name="description"
            ></textarea>
            <div className="actions">
              <Button onClick={handleSubmit} type="submit">
                submit
              </Button>
              <Button
                variant="outlined"
                onClick={e => {
                  e.preventDefault();
                  handleReset();
                  onCancel();
                }}
              >
                cancel
              </Button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

const EditIssue = ({ issues, id, path, onSubmit }) => {
  const issue = issues.find(issue => issue.id === id);

  return (
    <IssueForm
      initialData={issue}
      onSubmit={onSubmit}
      onCancel={() => window.history.back()}
    />
  );
};

const CreateIssue = ({ path, onSubmit }) => {
  return (
    <>
      <IssueForm
        initialData={{
          id: uuid.v4(),
          summary: "",
          description: "",
          status: "TODO"
        }}
        onSubmit={onSubmit}
        onCancel={() => window.history.back()}
      />
    </>
  );
};

const IssuesView = ({ path, issues, onDeleteIssue, onUpdateStatus }) => {
  return (
    <div>
      <Board
        statuses={["TODO", "IN_PROGRESS", "DONE"]}
        issues={issues}
        onDeleteIssue={onDeleteIssue}
        onUpdateStatus={onUpdateStatus}
      />
    </div>
  );
};

const IssuePage = ({ path }) => {
  // TODO: useRepository(issueRepository)
  const [issues, setIssues] = useLocalStorage("issues", []);

  const addIssue = issue => {
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

  return (
    <Layout
      actions={
        <Link to="new">
          <Button variant="contained">+ Create</Button>
        </Link>
      }
    >
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
    </Layout>
  );
};

export default IssuePage;
