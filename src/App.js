import React from 'react';
// import data from "./data.json";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
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

  handleClick(index) {
    console.log('clicked', index);
    const completedTask = this.state.toDoList[index];
    completedTask.complete = true;
    // You will need to check that you do not add the same task twice
    this.setState({
      completedTaskList: [...this.state.completedTaskList, completedTask],
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

        <h2>Ongoing list</h2>
        {this.state.toDoList.map((item, index) => (
          <div key={index} className={item.complete ? 'strike' : ''}>
            <input onClick={() => this.handleClick(index)} type="checkbox" />
            {item.task}
          </div>
        ))}

        <h2>Completed List</h2>
        {this.state.completedTaskList.map((item, index) => (
          <div key={index} className={item.complete ? 'strike' : ''}>
            <input readOnly type="checkbox" checked />
            {item.task}
          </div>
        ))}
      </div>
    );
  }
}
