import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";

// index.js passed DATA as props so we can access items, pass in Todo component
function App(props) {
  const [tasksData, setTasks] = useState(props.tasksData); // setTasks hook to update state
  // process tasks in DATA, and
  const taskList = tasksData.map(task => <Todo id={task.id} name={task.name} completed={task.completed} key={task.id} />);

  // name field gets passed in args from the Form component
  function addTask(name) {
    // create new task object to add to tasksData array
    const newTask = {
      id: "todo-" + nanoid(),
      name: name, // from form
      completed: false
    };
    console.log(newTask);
    // use spread to add object to tasksData
    setTasks([...tasksData, newTask]);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      {/* callback prop, pass addTask function into Form for use*/}
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        {/*using variable now that the component is called in the taskList loop */}
        {taskList}
      </ul>
    </div>
  );
}

export default App;
