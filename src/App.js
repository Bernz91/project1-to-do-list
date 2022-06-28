import React, { useRef } from "react";
import ToDoListDisplayed from "./ToDoListDisplayed";

// import data from "./data.json";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      toDoList: [],
      completedTaskList: [],
      dragItem: useRef,
      dragOverItem: useRef,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.editTask = this.editTask.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragEnter = this.dragEnter.bind(this);
    this.drop = this.drop.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.task.length > 0) {
      let outstanding = [...this.state.toDoList];
      outstanding = [
        ...outstanding,
        {
          id:
            this.state.toDoList.length +
            this.state.completedTaskList.length +
            1,
          task: this.state.task,
          complete: false,
          isEditing: false,
        },
      ];
      this.setState({
        task: "",
        toDoList: outstanding,
      });
    } else alert("Please input a task");
  }

  handleChange(e) {
    this.setState({ task: e.target.value });
  }
  handleClick(list, index) {
    console.log("clicked", index);
    let selectedTask = list[index];
    selectedTask.complete = selectedTask.complete ? false : true;
    // let tempCompletedTaskList = [];
    // let tempToDoList = [];
    // let filteredToDoList = [];
    // let filteredCompletedList = [];
    if (selectedTask.complete) {
      var tempCompletedTaskList = [
        ...this.state.completedTaskList,
        selectedTask,
      ];
      var filteredToDoList = this.state.toDoList.filter((task) => {
        return !task.complete;
      });
    } else if (!selectedTask.complete) {
      var tempToDoList = [...this.state.toDoList, selectedTask];
      var filteredCompletedList = this.state.completedTaskList.filter(
        (task) => {
          return task.complete;
        }
      );
    }
    this.setState({
      toDoList: selectedTask.complete ? filteredToDoList : tempToDoList,
      completedTaskList: selectedTask.complete
        ? tempCompletedTaskList
        : filteredCompletedList,
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
      // let isEditingList = list;
      list[index].isEditing = false;
      this.setState({
        toDoList: list,
      });
    }
  }

  editTask(list, index, e) {
    let editedList = list;
    editedList[index].task = e;
  }

  render() {
    return (
      <div className="to-do-toDoList">
        <h1>To-Do-List</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.task}
            onChange={this.handleChange}
          ></input>
          <input type="submit" task="Submit"></input>
        </form>
        <h2
          class="btn"
          data-toggle="collapse"
          href="#to_do_collapse"
          role="button"
          aria-expanded="false"
          aria-controls="to_do_collapse"
        >
          Outstanding list
        </h2>
        <ToDoListDisplayed
          list={this.state.toDoList}
          handleClick={this.handleClick}
          handleDoubleClick={this.handleDoubleClick}
          editTask={this.editTask}
          dragStart={this.dragStart}
          dragEnter={this.dragEnter}
          drop={this.drop}
          handleKeyPress={this.handleKeyPress}
        />
        <h2
          class="btn"
          data-toggle="collapse"
          href="#completed_collapse"
          role="button"
          aria-expanded="false"
          aria-controls="completed_collapse"
        >
          Completed list
        </h2>
        <ToDoListDisplayed
          list={this.state.completedTaskList}
          handleClick={this.handleClick}
          handleDoubleClick={this.handleDoubleClick}
          editTask={this.editTask}
          handleKeyPress={this.handleKeyPress}
        />
        {/* <h2>Completed List</h2>
        {this.state.completedTaskList.map((item, index) => (
          <div key={index} className={item.complete ? "strike" : ""}>
            <input readOnly type="checkbox" checked />
            {item.task}
          </div>
        ))} */}
      </div>
    );
  }
}
