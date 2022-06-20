import React from "react";
// import data from "./data.json";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      id: 0,
      toDoList: [],
      completedTaskList: [],
      complete: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ task: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.task.length > 0) {
      this.setState({
        toDoList: [
          ...this.state.toDoList,
          {
            id: this.state.toDoList.length + 1,
            task: this.state.task,
            complete: false,
          },
        ],
      });
      console.log(this.state.toDoList);
    }
  }

  handleClick() {
    console.log("clicked");
    this.setState((prevState) => ({
      complete: !prevState.complete,
    }));
  }

  ArrayList(props) {
    const items = props.toDoList;
    const listItems = Object.keys(items).map((item) => (
      <div className={items[item].complete ? "strike" : ""}>
        <input onClick={this.handleClick} type="checkbox" />
        {items[item].task}
      </div>
    ));
    return listItems;
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
        <h2>Ongoing list</h2>
        <this.ArrayList toDoList={this.state.toDoList} />

        {/* <h2>Completed List</h2> */}
      </div>
    );
  }
}
