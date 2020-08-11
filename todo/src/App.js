import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";

// filter object to store filter types
const FILTER_MAP = {
  All: () => true,
  Incomplete: task => !task.completed,
  Completed: task => task.completed
};
// collect names of filters using  object keys
const FILTER_NAMES = Object.keys(FILTER_MAP);

// index.js passed DATA as props so we can access items, pass in Todo component
function App(props) {
  // setTasks hook to update state  (useState always on top)
  const [tasksData, setTasks] = useState(props.tasksData);
  // filter hooks
  const [filter, setFilter] = useState("All");

  // process tasks in DATA, and
  const taskList = tasksData.filter(FILTER_MAP[filter])
  .map(task => 
    <Todo id={task.id} 
      name={task.name} 
      completed={task.completed} 
      key={task.id} 
      toggleTaskCompleted={toggleTaskCompleted} 
      deleteTask={deleteTask} 
      editTask={editTask} />
  ); 
  
  // filter list FILTER_NAMES
  const filterList = FILTER_NAMES.map(name => 
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name === filter} 
      setFilter={setFilter} 
    />);

  // set tasks remaining heading
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const heading = `${taskList.length} ${tasksNoun}`;

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

  // completed tasks
  function toggleTaskCompleted(id) {
    // if this this task has same id as edited task
    const updatedTasks = tasksData.map(task => {
      if (id === task.id) {
        // use 'object spread' syntax to make a new object
        // whose 'completed' prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    console.log(tasksData);
  }

  // delete task
  function deleteTask(id) {
    console.log(id);
    const remainingTasks = tasksData.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  // edit task, receive id and newName from state in component
  function editTask(id, newName) {
    const editedTaskList = tasksData.map(task => {
      //if this task has same id as edited task
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      {/* callback prop, pass addTask function into Form for use*/}
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{heading}</h2>
      <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        {/*using variable now that the component is called in the taskList loop */}
        {taskList}
      </ul>
    </div>
  );
}

export default App;
