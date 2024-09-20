import React from "react";

function TodoTasks({ tasks, setTasks }) {
  // Delete a task from the list
  const deleteHandler = (e, id) => {
    e.stopPropagation(); // Prevent checkbox click from triggering the label click event

    let deletableTask = [...tasks]; // Create a copy of the tasks array
    deletableTask.splice(id, 1); // Remove the task at the given index

    setTasks(deletableTask); // Update tasks state with the new array
    localStorage.setItem("tasks", JSON.stringify(deletableTask)); // Persist the updated task list to localStorage
  };

  return (
    <div className="flex justify-start gap-4 flex-col my-4 min-w-full">
      <ul>
        {tasks.map((task, index) => (
          <li
            className="bg-black rounded-full px-4 mb-2 md:py-3 py-2 items-center flex cursor-pointer"
            key={task.id}
          >
            <label
              htmlFor={`todo${index}`}
              className="flex items-center cursor-pointer w-full"
            >
              <input
                type="checkbox"
                id={`todo${index}`}
                className="hidden peer"
                // Add checked attribute if the task is marked completed
                checked={task.completed}
                onChange={() => {
                  const updatedTasks = [...tasks];
                  updatedTasks[index].completed =
                    !updatedTasks[index].completed; // Toggle completed state
                  setTasks(updatedTasks); // Update the state
                  localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save updated tasks to localStorage
                }}
              />
              <svg
                className="w-6 h-6 rounded-full peer-checked:bg-[#61de7e] peer-checked:fill-[#000000] fill-transparent border-2 border-[#41c541] transition-colors duration-300 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
              </svg>
              <span className="ml-4 text-white peer-checked:line-through peer-checked:text-zinc-600 flex-grow">
                {task.text}
              </span>
            </label>
            <svg
              onClick={(e) => deleteHandler(e, index)} // Call the deleteHandler function
              className="w-7 h-7 ml-4 cursor-pointer flex-shrink-0 fill-[#c03e3e] active:fill-rose-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path>
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoTasks;
