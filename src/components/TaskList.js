import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { archiveTask, pinTask } from "../lib/redux";

import Task from "./Task";

export function PureTaskList({ loading, tasks, onArchiveTask, onPinTask }) {
  const events = {
    onArchiveTask,
    onPinTask,
  };

  const LoadingRow = () => (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>loading</span>
        <span>cool</span>
        <span>state</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="list-items">
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no task</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  const taskInOrder = [
    ...tasks.filter((task) => task.state === "TASK_PINNED"),
    ...tasks.filter((task) => task.state !== "TASK_PINNED"),
  ];

  return (
    <div className="list-items">
      {taskInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}

PureTaskList.propTypes = {
  loading: PropTypes.bool.isRequired,
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  onArchiveTask: PropTypes.func,
  onPinTask: PropTypes.func,
};

PureTaskList.defaultProps = {
  loading: false,
};

export default connect(
  ({ tasks }) => ({
    tasks: tasks.filter(
      (task) => task.status === "TASK_INBOX" || task.status === "TASK_PINNED"
    ),
  }),
  (dispatch) => ({
    onArchiveTask: (id) => dispatch(archiveTask(id)),
    onPinTask: (id) => dispatch(pinTask(id)),
  })
)(PureTaskList);
