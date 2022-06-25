import React from "react";
import ToDoListDisplayed from "./ToDoListDisplayed";
// import data from "./data.json";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      toDoList: [],
      completedTaskList: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setIsEditing = this.setIsEditing.bind(this);
    this.editTask = this.editTask.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    this.setState({ task: e.target.value });
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
        toDoList: outstanding,
      });
    }
  }

  handleClick(list, index) {
    console.log("clicked", index);
    // let striked = this.state.toDoList.map((task) => {
    //   return task.id - 1 === Number(index)
    //     ? { ...task, complete: !task.complete }
    //     : { ...task };
    // });
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

  setIsEditing(list, index) {
    console.log("double clicked");
    let isEditingList = list;
    isEditingList[index].isEditing = true;
    this.setState({
      list: isEditingList,
    });
  }

  handleKeyPress(list, index, e) {
    if (e.key === "Enter") {
      let isEditingList = list;
      isEditingList[index].isEditing = true;
      this.setState({
        list: isEditingList,
      });
    }
  }

  editTask(list, index, e) {
    console.log(e);
    let editedList = list;
    editedList[index].task = e;
    this.setState({
      toDoList: editedList,
    });
  }

  render() {
    return (
      <div className="to-do-toDoList">
        <h1>To-Do-List</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            task={this.state.task}
            onChange={this.handleChange}
          ></input>
          <input type="submit" task="Submit"></input>
        </form>
        <h2>Outstanding list</h2>
        <ToDoListDisplayed
          list={this.state.toDoList}
          handleClick={this.handleClick}
          setIsEditing={this.setIsEditing}
          editTask={this.editTask}
          handleKeyPress={this.handleKeyPress}
        />
        <h2>Completed list</h2>
        <ToDoListDisplayed
          list={this.state.completedTaskList}
          handleClick={this.handleClick}
          setIsEditing={this.setIsEditing}
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
