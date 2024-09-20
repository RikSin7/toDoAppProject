import React, { useState, useEffect } from "react";
import TodoTasks from "./TodoTasks";
import { v4 as uuidv4 } from "uuid";

function InputTask() {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]); // Array to store tasks

  // Load saved todos from localStorage when the component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("tasks"));
    if (savedTodos) {
      setTasks(savedTodos);
    }
  }, []); // Empty array means this effect runs once when the component mounts

  // Save todos to localStorage whenever the `todos` state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const inputHandler = (e) => {
    e.preventDefault();
    if (value.trim()) {
      // Add new task to the list
      setTasks([...tasks, { id: uuidv4(), text: value, completed: false }]);
      setValue(""); // Clear input field
    }
  };

  return (
    <div className="relative flex mt-8 flex-col w-full min-w-[300px] ">
      <form onSubmit={inputHandler} className="flex w-full xs:flex-col">
        <input
          type="text"
          placeholder="What's the plan today?"
          className="text-white bg-[#252525] dark:bg-black px-4 outline-none md:py-4 py-4 rounded-l-lg rounded-r-none flex justify-center items-center w-full xs:rounded-lg xs:mb-2 dark:transition-all dark:duration-300 transition-all duration-300"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          className="text-white md:font-semibold bg-[#39ac35] dark:bg-[#366d34] active:bg-green-800 active:transition-colors outline-none md:py-4 py-2 rounded-r-lg md:px-6 px-3 text-center xs:rounded-lg dark:transition-all dark:duration-300 transition-all duration-300"
        >
          Add
        </button>
      </form>
      {tasks.length > 0 ? (
        <TodoTasks tasks={tasks} setTasks={setTasks} />
      ) : (
        <span className="text-white mt-4 xs:mb-7 dark:bg-[#933d3d] bg-[#cd5454] p-3 max-w-fit rounded-lg dark:transition-all dark:duration-300 transition-all duration-300">
          No tasks yet. Please add some tasks.
        </span>
      )}
    </div>
  );
}

export default InputTask;
