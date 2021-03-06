import React from 'react';
import {Panel } from 'react-bootstrap';
import  './css/TaskCard.css';
import moment from 'moment';

const statusList = {
  to_be_done : "To Be Done",
  inprogress : "In Progress",
  completed : "Completed"
}

const categoryList = {
  high : "High",
  medium : "Medium",
  low : "Low",
}

/**
  taskCard function takes the task from the parent and Displaying in UI
**/
export default function taskCard({ task, deletetask }) {
  let startDate = moment(task.startDate).format("dddd, MMMM Do YYYY")
  let dueDate = moment(task.dueDate).format("dddd, MMMM Do YYYY")
  return (
    <div>
    <Panel className="panel-header text-capitalize" header={task.title} bsStyle="info">
      <div className="panel-content">
        <table>
          <tbody>
          <tr>
            <td>Status : </td>
            <td>{ statusList[task.status] ? statusList[task.status] : "NA"}</td>
          </tr>
          <tr>
            <td>Priority : </td>
            <td>{ categoryList[task.category] ? categoryList[task.category] : "other"}</td>
          </tr>
          <tr>
            <td>Start Date : </td>
            <td>{startDate}</td>
          </tr>
          <tr>
            <td>Due date : </td>
            <td>{dueDate}</td>
          </tr><tr>
            <td>Description : </td>
            <td>{ task.taskContent }</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div>
        {/* <Link to={`/task/${task.id}`} className="ui basic button green panel-button">Edit</Link> */}
        <button className="ui basic button panel-button red deleteTask" onClick={() => deletetask(task.id)}>Delete</button>
      </div>
    </Panel>
    </div>

  );
}

taskCard.propTypes = {
  task: React.PropTypes.object.isRequired,
  deletetask: React.PropTypes.func.isRequired
}
