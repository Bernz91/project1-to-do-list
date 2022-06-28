import React from "react";

const ToDoListDisplayed = ({
  list,
  handleClick,
  handleKeyPress,
  handleDoubleClick,
  editTask,
  dragStart,
  dragEnter,
  drop,
}) => {
  return (
    <div>
      {list.map((item, index) => {
        return (
          <div
            class="collapse"
            id={item.complete ? "completed_collapse" : "to_do_collapse"}
            key={index}
            className={item.complete ? "strike" : ""}
            draggable={item.complete ? "false" : "true"}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnd={drop}
            onKeyPress={(e) => handleKeyPress(list, index, e)}
          >
            <input
              onClick={() => handleClick(list, index)}
              type="checkbox"
              checked={item.complete}
            />
            <span
              onClick={(e) => handleDoubleClick(list, index, e)}
              contentEditable={item.isEditing ? "true" : "false"}
              onInput={(e) =>
                editTask(list, index, e.currentTarget.textContent)
              }
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
