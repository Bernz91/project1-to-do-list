import React from "react";
import { Button, Card } from "react-bootstrap";

const ToDoListDisplayed = ({
  list,
  handleClick,
  handleKeyPress,
  handleDoubleClick,
  editTask,
  editDescription,
  dragStart,
  dragEnter,
  drop,
  removeTodo,
  heading,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  return (
    <div>
      {list.map((item, index) => {
        return (
          <div
            key={index}
            class={heading ? "collapse" : "collapse show"}
            id={item.complete ? "completed_collapse" : "to_do_collapse"}
          >
            <div
              class={
                item.mouseEnter && item.id !== 0
                  ? "list-group-item active"
                  : "list-group-item"
              }
              draggable={item.complete ? "false" : "true"}
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnd={drop}
              onKeyPress={(e) => handleKeyPress(list, index, e)}
              onMouseOver={() => handleMouseEnter(list, index)}
              onMouseLeave={() => handleMouseLeave(list, index)}
              onClick={(e) => handleDoubleClick(list, index, e)}
            >
              <div
                className="todo"
                style={{ textDecoration: item.complete ? "line-through" : "" }}
              >
                <div
                  contentEditable={item.isEditing ? "true" : "false"}
                  onInput={(e) =>
                    editTask(list, index, e.currentTarget.textContent)
                  }
                >
                  {item.task}
                </div>
                <div
                  class={item.isEditing ? "description" : "d-none"}
                  contentEditable={item.isEditing ? "true" : "false"}
                  onInput={(e) =>
                    editDescription(list, index, e.currentTarget.textContent)
                  }
                  data-text="Notes"
                >
                  {item.description}
                </div>
              </div>

              <div class={item.mouseEnter && item.id !== 0 ? "" : "d-none"}>
                <Button
                  variant={
                    item.complete ? "outline-warning" : "outline-success"
                  }
                  onClick={() => handleClick(list, index)}
                >
                  {item.complete && item.id !== 0 ? "Undone" : "Done"}
                </Button>{" "}
                <Button
                  variant="outline-danger"
                  onClick={() => removeTodo(list, index)}
                >
                  ✕
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ToDoListDisplayed;
