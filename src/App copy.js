import React, { useRef } from "react";
import ToDoListDisplayed from "./toDisplayTask";
import "bootstrap/dist/css/bootstrap.min.css";

// import data from "./data.json";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      description: "",
      toDoList: [
        {
          id: 0,
          task: "-",
          complete: false,
          isEditing: false,
          mouseEnter: false,
        },
      ],
      completedTaskList: [
        {
          id: 0,
          task: "-",
          complete: false,
          isEditing: false,
          mouseEnter: false,
        },
      ],
      dragItem: useRef,
      dragOverItem: useRef,
      collapseOutstanding: true,
      collapseCompleted: true,
      completedDate: "",
    };
    this.handleChangeTask = this.handleChangeTask.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeToDo = this.removeToDo.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.editTask = this.editTask.bind(this);
    this.editDescription = this.editDescription.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragEnter = this.dragEnter.bind(this);
    this.drop = this.drop.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOutstandingHeaderClick =
      this.handleOutstandingHeaderClick.bind(this);
    this.handleCompletedHeaderClick =
      this.handleCompletedHeaderClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidUpdate() {
    if (this.state.toDoList.length === 0) {
      this.setState({
        collapseOutstanding: true,
        toDoList: [
          {
            id: 0,
            task: "-",
            complete: false,
            isEditing: false,
            mouseEnter: false,
          },
        ],
      });
    }

    if (this.state.completedTaskList.length === 0) {
      this.setState({
        collapseCompleted: true,
        completedTaskList: [
          {
            id: 0,
            task: "-",
            complete: false,
            isEditing: false,
            mouseEnter: false,
          },
        ],
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.toDoList[0].id === 0) {
      let outstanding = [
        {
          id: 1,
          task: this.state.task,
          description: this.state.description,
          complete: false,
          isEditing: false,
          mouseEnter: false,
        },
      ];
      this.setState({
        task: "",
        description: "",
        toDoList: outstanding,
        collapseOutstanding: false,
      });
    } else if (this.state.task.length > 0) {
      let outstanding = [...this.state.toDoList];
      outstanding = [
        ...outstanding,
        {
          id:
            this.state.toDoList.length +
            this.state.completedTaskList.length +
            1,
          task: this.state.task,
          description: this.state.description,
          complete: false,
          isEditing: false,
          mouseEnter: false,
        },
      ];
      this.setState({
        task: "",
        description: "",
        toDoList: outstanding,
        collapseOutstanding: false,
      });
    } else alert("Please input a task");
  }

  handleChangeTask(e) {
    this.setState({
      task: e.target.value,
    });
  }

  handleChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  handleClick(list, index) {
    console.log("clicked", index);
    let selectedTask = list[index];
    selectedTask.complete = selectedTask.complete ? false : true;
    selectedTask.mouseEnter = false;
    // let copy = list;
    // copy[index].complete = copy[index].complete ? false : true;

    // this.setState({
    //   toDoList: copy,
    // });

    if (selectedTask.complete) {
      var tempCompletedTaskList =
        this.state.completedTaskList[0].id === 0
          ? [selectedTask]
          : [...this.state.completedTaskList, selectedTask];
      var filteredToDoList = this.state.toDoList.filter((task) => {
        return !task.complete;
      });
    } else if (!selectedTask.complete) {
      var tempToDoList =
        this.state.toDoList[0].id === 0
          ? [selectedTask]
          : [...this.state.toDoList, selectedTask];
      var filteredCompletedList = this.state.completedTaskList.filter(
        (task) => {
          return task.complete;
        }
      );
    }

    // setTimeout(() => {
    this.setState({
      toDoList: selectedTask.complete ? filteredToDoList : tempToDoList,
      completedTaskList: selectedTask.complete
        ? tempCompletedTaskList
        : filteredCompletedList,
    });
    // }, 2000);
  }

  removeToDo(list, index) {
    let copyList = list;
    copyList.splice(index, 1);
    this.setState({
      list: copyList,
    });
  }

  dragStart(e, position) {
    this.setState({
      dragItem: position,
    });
    console.log(e.target.innerHTML);
  }

  dragEnter(e, position) {
    this.setState({
      dragOverItem: position,
    });
    console.log(e.target.innerHTML);
  }

  drop(e) {
    e.preventDefault();
    const copyListItems = [...this.state.toDoList];
    const dragItemContent = copyListItems[this.state.dragItem];
    console.log(this.state.dragItem);
    console.log(this.state.dragOverItem);
    copyListItems.splice(this.state.dragItem, 1);
    copyListItems.splice(this.state.dragOverItem, 0, dragItemContent);
    this.setState({
      dragItem: null,
      dragOverItem: null,
      toDoList: copyListItems,
    });
  }

  handleDoubleClick(list, index, e) {
    e.preventDefault();
    console.log("double clicked");
    let isEditingList = list;
    isEditingList[index].isEditing = true;
    this.setState({
      list: isEditingList,
    });
  }

  handleKeyPress(list, index, e) {
    console.log(e.charCode);
    if (e.charCode === 13) {
      let copy = list;
      copy[index].isEditing = false;
      this.setState({
        toDoList: list,
      });
    }
  }

  editTask(list, index, e) {
    let editedList = list;
    editedList[index].task = e;
  }

  editDescription(list, index, e) {
    let editedList = list;
    editedList[index].description = e;
  }
  handleOutstandingHeaderClick() {
    const copy = this.state.collapseOutstanding;
    let state = copy ? false : true;
    this.setState({
      collapseOutstanding: state,
      collapseCompleted: true,
    });
    console.log(this.state.collapseOutstanding);
  }

  handleCompletedHeaderClick() {
    const copy = this.state.collapseCompleted;
    let state = copy ? false : true;
    this.setState({
      collapseCompleted: state,
      collapseOutstanding: true,
    });
    console.log(this.state.collapseOutstanding);
  }

  handleMouseEnter(list, index) {
    console.log("mouse here");
    let copy = list;

    copy[index].mouseEnter = true;
    this.setState({
      list: copy,
    });
    console.log("mouse enter" + list[index].mouseEnter);
  }

  handleMouseLeave(list, index) {
    console.log("mouse leave");
    let copy = list;
    copy[index].mouseEnter = false;
    copy[index].isEditing = false;
    this.setState({
      list: copy,
    });
  }

  render() {
    return (
      <div>
        <div className="header">
          <header>To-Do-List</header>
        </div>

        <form
          className="task-forms d-flex align-items-end"
          onSubmit={this.handleSubmit}
        >
          <div class="d-flex flex-column">
            <div class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                value={this.state.task}
                onChange={this.handleChangeTask}
                id="task"
                placeholder="Enter task..."
              ></input>
            </div>
            <div class="form-group">
              <textarea
                className="form-control"
                type="text"
                value={this.state.description}
                onChange={this.handleChangeDescription}
                placeholder="(Optional) Enter a description..."
                rows="3"
              ></textarea>
            </div>
          </div>
          <input
            class="btn btn-secondary m-2"
            type="submit"
            task="Submit"
          ></input>
        </form>
        <div class="container">
          <div class="row">
            <div class="col-3">
              {/* <Card
              // data-toggle="collapseOutstanding"
              // href="#to_do_collapse"
              // role="button"
              // aria-expanded={this.state.collapseOutstanding ? false : true}
              // onClick={this.handleOutstandingHeaderClick}
              > */}
              Outstanding list
              {/* </Card> */}
            </div>

            <div class="col-9">
              <ToDoListDisplayed
                list={this.state.toDoList}
                handleClick={this.handleClick}
                handleDoubleClick={this.handleDoubleClick}
                editTask={this.editTask}
                editDescription={this.editDescription}
                dragStart={this.dragStart}
                dragEnter={this.dragEnter}
                drop={this.drop}
                handleKeyPress={this.handleKeyPress}
                removeTodo={this.removeToDo}
                heading={this.state.collapseOutstanding}
                handleMouseEnter={this.handleMouseEnter}
                handleMouseLeave={this.handleMouseLeave}
              />
            </div>
          </div>
        </div>
        <div>
          <div
            className="card"
            data-toggle="collapseOutstanding"
            href="#completed_collapse"
            role="button"
            onClick={this.handleCompletedHeaderClick}
          >
            Completed list
          </div>
          <ToDoListDisplayed
            list={this.state.completedTaskList}
            handleClick={this.handleClick}
            handleDoubleClick={this.handleDoubleClick}
            editTask={this.editTask}
            handleKeyPress={this.handleKeyPress}
            removeTodo={this.removeToDo}
            heading={this.state.collapseCompleted}
            handleMouseEnter={this.handleMouseEnter}
            handleMouseLeave={this.handleMouseLeave}
          />
        </div>
      </div>
    );
  }
}
