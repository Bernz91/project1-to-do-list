import React from "react";
import { Button } from "react-bootstrap";

const ToDisplayTask = ({
  list,
  handleCheck,
  handleKeyPress,
  handleEditClick,
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

            // class={heading ? "collapse" : "collapse show"}
            // id={item.complete ? "completed_collapse" : "to_do_collapse"}
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
              onMouseEnter={() => handleMouseEnter(list, index)}
              onMouseLeave={() => handleMouseLeave(list, index)}
            >
              <div
                className="todo"
                style={{ textDecoration: item.complete ? "line-through" : "" }}
                onKeyPress={(e) => handleKeyPress(list, index, e)}
                onClick={(e) => handleEditClick(list, index, e)}
              >
                <div
                  className={
                    item.mouseEnter && item.id !== 0
                      ? "tasks-selected"
                      : "tasks"
                  }
                  contentEditable={
                    item.isEditing && !item.complete && item.id !== 0
                      ? "true"
                      : "false"
                  }
                  onInput={(e) =>
                    editTask(list, index, e.currentTarget.textContent)
                  }
                >
                  {item.task}
                </div>
                <div
                  class={item.isEditing ? "description" : "d-none"}
                  contentEditable={
                    item.isEditing && !item.complete && item.id !== 0
                      ? "true"
                      : "false"
                  }
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
                  onClick={() => handleCheck(index)}
                >
                  {item.complete && item.id !== 0 ? "Undone" : "Done"}
                </Button>{" "}
                <Button
                  variant="outline-danger"
                  onClick={() => removeTodo(index)}
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

export default ToDisplayTask;
