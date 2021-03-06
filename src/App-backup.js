import React from "react";
import data from "./data.json";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      id: 0,
      toDoList: {},
      completedTaskList: [],
      complete: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.value.length > 0) {
      this.setState({
        toDoList: [
          ...this.state.toDoList,
          {
            id: this.state.toDoList.length + 1,
            value: this.state.value,
            complete: false,
          },
        ],
      });
    }
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  ArrayList(props) {
    const items = props.toDoList;
    const listItems = items.map((item) => (
      <div>
        <input type="checkbox" />
        {item}
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
            value={this.state.value}
            onChange={this.handleChange}
          ></input>
          <input type="submit" value="Submit"></input>
        </form>
        <h2>Ongoing list</h2>
        <this.ArrayList toDoList={this.state.toDoList} />
        <h2>Completed List</h2>
      </div>
    );
  }
}
