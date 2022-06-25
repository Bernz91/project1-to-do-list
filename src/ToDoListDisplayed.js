import React from "react";

const ToDoListDisplayed = ({
  list,
  handleClick,
  setIsEditing,
  editTask,
  handleKeyPress,
}) => {
  return (
    <div>
      {list.map((item, index) => {
        return (
          <div key={index} className={item.complete ? "strike" : ""}>
            <input
              onClick={() => handleClick(list, index)}
              type="checkbox"
              checked={item.complete}
            />
            <span
              onDoubleClick={() => setIsEditing(list, index)}
              contentEditable={item.isEditing ? "true" : "false"}
              onInput={(e) =>
                editTask(list, index, e.currentTarget.textContent)
              }
              // onKeyPress={(e) => handleKeyPress(list, index, e)}
            >
              {item.task}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ToDoListDisplayed;
