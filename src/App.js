import React, { useRef } from "react";
import ToDisplayTask from "./toDisplayTask";
import ToDisplayListNames from "./toDisplayListNames";
import "bootstrap/dist/css/bootstrap.min.css";

// import data from "./data.json";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      task: "",
      description: "",
      newList: "",
      listNames: [
        {
          name: "Outstanding List",
          headerMouseEnter: false,
          headerClick: false,
        },
        {
          name: "Completed List",
          headerMouseEnter: false,
          headerClick: false,
        },
      ],
      tasksList: {
        array0: [
          {
            id: 1,
            task: "Project 1",
            description: "fix some bugs and CSS",
            listId: "array0",
            complete: false,
            isEditing: false,
            mouseEnter: false,
          },
          {
            id: 2,
            task: "Buy groceries",
            description: "Milk, honey, sugar, tea, coffee, hotpot ingredients",
            listId: "array0",
            complete: false,
            isEditing: false,
            mouseEnter: false,
          },
          {
            id: 3,
            task: "Throw a party!!",
            description: "Finally project 1 is done. Time to celebrate!",
            listId: "array0",
            complete: false,
            isEditing: false,
            mouseEnter: false,
          },
          {
            id: 4,
            task: "Go for a run",
            description: "",
            listId: "array0",
            complete: false,
            isEditing: false,
            mouseEnter: false,
          },
        ],

        array1: [
          {
            id: 0,
            task: "-",
            complete: false,
            isEditing: false,
            mouseEnter: false,
          },
        ],
      },

      selectedList: [],
      listIndexClicked: 0,
      listClicked: "array0",
      dragItem: useRef,
      dragOverItem: useRef,
      completedDate: "",
    };
    this.handleChangeTask = this.handleChangeTask.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
    this.handleChangeList = this.handleChangeList.bind(this);
    // this.handleNewListSubmit = this.handleNewListSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.removeToDo = this.removeToDo.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.editTask = this.editTask.bind(this);
    this.editDescription = this.editDescription.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragEnter = this.dragEnter.bind(this);
    this.drop = this.drop.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleListNamesClick = this.handleListNamesClick.bind(this);
    this.handleHeaderMouseEnter = this.handleHeaderMouseEnter.bind(this);
    this.handleHeaderMouseLeave = this.handleHeaderMouseLeave.bind(this);
  }
  // ~~~~~~~~~~~~~~~~~~~~ task forms handlers ~~~~~~~~~~~~~~~~~~~~

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

  handleTaskSubmit(e) {
    e.preventDefault();
    let idCopy = this.state.id + 1;
    if (this.state.tasksList.array0[0].id === 0) {
      let outstanding = [
        {
          id: idCopy,
          task: this.state.task,
          description: this.state.description,
          listId: "array0",
          complete: false,
          isEditing: false,
          mouseEnter: false,
        },
      ];
      let copy = this.state.tasksList;
      copy.array0 = outstanding;
      this.setState({
        task: "",
        description: "",
        id: idCopy,
        tasksList: copy,
        listClicked: "array0",
        listIndexClicked: 0,
        // collapseOutstanding: false,
      });
    } else if (this.state.task.length > 0) {
      let copy = this.state.tasksList;
      let outstandingList = copy.array0;

      outstandingList = [
        ...outstandingList,
        {
          id: idCopy,
          task: this.state.task,
          description: this.state.description,
          listId: "array0",
          complete: false,
          isEditing: false,
          mouseEnter: false,
        },
      ];
      copy.array0 = outstandingList;
      this.setState({
        id: idCopy,
        task: "",
        description: "",
        tasksList: copy,
        listClicked: "array0",
        listIndexClicked: 0,
        // collapseOutstanding: false,
      });
    } else alert("Please input a task");
  }

  // ~~~~~~~~~~~~~~~~~~~~ Component Did Update ~~~~~~~~~~~~~~~~~~~~
  componentDidUpdate() {
    for (let i = 0; i < Object.keys(this.state.tasksList).length; i++) {
      if (this.state.tasksList[`array${i}`].length === 0) {
        let copy = this.state.tasksList;
        let emptyTask = [
          {
            id: 0,
            task: "-",
            complete: false,
            isEditing: false,
            mouseEnter: false,
          },
        ];

        copy[`array${i}`] = emptyTask;
        console.log(copy);
        this.setState({
          tasksList: copy,
        });
      }
    }
  }

  // ~~~~~~~~~~~~~~~~~~~~ Headers handler ~~~~~~~~~~~~~~~~~~~~

  handleListNamesClick(index) {
    let selectedList = "array" + index;
    let copy = this.state.listNames;
    copy[index].headerClick = true;
    this.setState({
      listIndexClicked: index,
      listClicked: selectedList,
      listNames: copy,
    });
  }

  handleHeaderMouseEnter(index) {
    let copy = this.state.listNames;
    copy[index].headerMouseEnter = true;
    this.setState({
      listNames: copy,
    });
  }
  handleHeaderMouseLeave(index) {
    let copy = this.state.listNames;
    copy[index].headerMouseEnter = false;
    this.setState({
      listNames: copy,
    });
  }

  // ~~~~~~~~~~~~~~~~~~~~ Headers Form handler ~~~~~~~~~~~~~~~~~~~~

  handleChangeList(e) {
    this.setState({
      newList: e.target.value,
    });
  }

  // handleNewListSubmit(e) {
  //   e.preventDefault();
  //   let copyListNames = [...this.state.listNames, this.state.newList];
  //   let newArrayName = "array" + Object.keys(this.state.tasksList).length - 1;
  //   // let emptyArray =  [newArrayName]: [] ;

  //   let obj = {};
  //   obj[newArrayName] = [];
  //   let copyTasksList = this.state.tasksList;
  //   copyTasksList.push(obj);
  //   this.setState({
  //     listNames: copyListNames,
  //     tasksList: copyTasksList,
  //   });
  // }

  // ~~~~~~~~~~~~~~~~~~~~ Tasks handlers ~~~~~~~~~~~~~~~~~~~~

  // to mark a task has been completed / not
  handleCheck(index) {
    console.log("clicked", index);
    let selectedTask = this.state.tasksList[this.state.listClicked][index];
    console.log(selectedTask.complete);
    selectedTask.complete = selectedTask.complete ? false : true;
    console.log(selectedTask.mouseEnter);
    selectedTask.mouseEnter = false;
    selectedTask.isEditing = false;
    console.log(selectedTask.isEditing);

    let copy = this.state.tasksList;
    let listWithRemovedTask = copy[this.state.listClicked].filter((task) => {
      return this.state.listClicked === "array1"
        ? task.complete
        : !task.complete;
    });
    let listForAddedTask = selectedTask.complete
      ? "array1"
      : selectedTask.listId;
    let listWithAddedTask =
      this.state.tasksList[listForAddedTask][0].id === 0
        ? [selectedTask]
        : [...this.state.tasksList[listForAddedTask], selectedTask];
    copy[this.state.listClicked] = listWithRemovedTask;
    copy[listForAddedTask] = listWithAddedTask;

    console.log(this.state.tasksList);

    // setTimeout(() => {
    this.setState({
      tasksList: copy,
      // }, 2000);
    });
  }

  // removing a task from a list
  removeToDo(index) {
    let copy = this.state.tasksList;
    copy[this.state.listClicked].splice(index, 1);
    this.setState({
      tasksList: copy,
    });
  }
  // ------- dragging tasks -------
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
    let copy = this.state.tasksList;
    let dragItemContent = copy[this.state.listClicked][this.state.dragItem];
    console.log(this.state.dragItem);
    console.log(this.state.dragOverItem);
    copy[this.state.listClicked].splice(this.state.dragItem, 1);
    copy[this.state.listClicked].splice(
      this.state.dragOverItem,
      0,
      dragItemContent
    );
    this.setState({
      dragItem: null,
      dragOverItem: null,
      tasksList: copy,
    });
  }
  // ------- editing tasks -------
  handleEditClick(list, index, e) {
    e.preventDefault();
    console.log("double clicked");
    if (list[index].complete === false) {
      let isEditingList = list;
      isEditingList[index].isEditing = true;
      // let copy = this.state.tasksList;
      // copy[this.state.listClicked] = isEditingList;
      this.setState({
        list: isEditingList,
      });
    }
  }

  handleKeyPress(list, index, e) {
    console.log(e.charCode);
    console.log(list);
    if (e.charCode === 13) {
      let copyList = list;
      copyList[index].isEditing = false;
      // let copy = this.state.tasksList;
      // copy[this.state.listClicked] = copyList;
      this.setState({
        list: copyList,
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

  // ------- handling mouse events -------
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
      <div className="h-100vh">
        <div className="header">
          <header>To-Do-List</header>
        </div>

        <form
          className="task-forms d-flex align-items-end h-20vh"
          onSubmit={this.handleTaskSubmit}
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
            value="Submit"
          ></input>
        </form>
        <div class="container-fluid">
          <div class="row">
            <div class="col-2">
              <div className="name-list">
                <ToDisplayListNames
                  nameList={this.state.listNames}
                  handleListNamesClick={this.handleListNamesClick}
                  handleHeaderMouseEnter={this.handleHeaderMouseEnter}
                  handleHeaderMouseLeave={this.handleHeaderMouseLeave}
                />
              </div>

              {/* <div>
                <form
                  className="task-forms"
                  onSubmit={this.handleNewListSubmit}
                >
                  <div className="form-group">
                    <input
                      class="form-control"
                      type="text"
                      value={this.state.newList}
                      onChange={this.handleChangeList}
                      placeholder="Enter a new list..."
                    ></input>
                  </div>

                  <input
                    class="btn btn-secondary m-2"
                    type="submit"
                    value="Submit"
                  ></input>
                </form>
              </div> */}
            </div>
            <div class="col-10">
              <div className="tasks-body">
                <h1>
                  {this.state.listNames[this.state.listIndexClicked].name}
                </h1>
                <ToDisplayTask
                  list={this.state.tasksList[this.state.listClicked]}
                  handleCheck={this.handleCheck}
                  removeTodo={this.removeToDo}
                  handleEditClick={this.handleEditClick}
                  editTask={this.editTask}
                  editDescription={this.editDescription}
                  handleKeyPress={this.handleKeyPress}
                  dragStart={this.dragStart}
                  dragEnter={this.dragEnter}
                  drop={this.drop}
                  handleMouseEnter={this.handleMouseEnter}
                  handleMouseLeave={this.handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
