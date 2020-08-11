import React from "react";

// Todo component (todo item): receives props and functions from component call
// component calls these by prefix 'props'
export default function Todo(props) {
  return (
    <li className="todo stack-small">
      <div className="c-cb">
        {/* checkbox receives prop values */}
        <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)} />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn">
          Edit <span className="visually-hidden">Eat</span>
        </button>
        <button onClick={() => props.deleteTask(props.id)} type="button" className="btn btn__danger">
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </li>
  );
}
