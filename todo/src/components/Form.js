import React, { useState } from "react"; // components own their own state. useState hook allows us to update it.

function Form(props) {
  // useState to update components data
  const [name, setName] = useState(""); // name is empty

  // onChange
  function handleChange(e) {
    setName(e.target.value);
  }

  // submit
  function handleSubmit(e) {
    e.preventDefault();
    // use callback prop to gain access to addTask function in App.js
    props.addTask(name);
    setName(""); // set name field blank
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input 
        onChange={handleChange} 
        value={name} type="text" 
        id="new-todo-input" 
        className="input input__lg" 
        name="text" 
        autoComplete="off"
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
