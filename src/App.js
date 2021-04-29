import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      backlogTasks: [],
      toDoTasks: [],
      completeTasks: [],
      backlogTitle: "",
      backlogDesc: "",
      toDoTitle: "",
      toDoDesc: "",
      toggle: false,
    };
  }

  toggle() {
    if (this.state.toggle) {
      this.setState({
        toggle: false,
      });
    } else {
      this.setState({
        toggle: true,
      });
    }
  }

  handleBacklogTitle(e) {
    this.setState({
      backlogTitle: e.target.value,
    });
  }

  handleBacklogDesc(e) {
    this.setState({
      backlogDesc: e.target.value,
    });
  }

  handleBacklogClick() {
    let alreadyPresent = this.checkForDups(this.state.backlogTitle);
    if (!alreadyPresent) {
      this.state.backlogTasks.push(
        <DisplayBox
          title={this.state.backlogTitle}
          desc={this.state.backlogDesc}
          delete={this.deleteBacklog.bind(this)}
        />
      );
      this.toggle();
    } else {
      alert("Task titles must be unique!");
      return;
    }
  }

  handleToDoTitle(e) {
    this.setState({
      toDoTitle: e.target.value,
    });
  }

  handleToDoDesc(e) {
    this.setState({
      toDoDesc: e.target.value,
    });
  }

  handleToDoClick() {
    let alreadyPresent = this.checkForDups(this.state.toDoTitle);
    if (!alreadyPresent) {
      this.state.toDoTasks.push(
        <DisplayBox
          title={this.state.toDoTitle}
          desc={this.state.toDoDesc}
          delete={this.deleteToDo.bind(this)}
        />
      );
      this.toggle();
    } else {
      alert("Task titles must be unique!");
      return;
    }
  }

  moveBacklog(mvcomp) {
    let comp = this.state.backlogTasks.filter((task) => {
      return task.props.title === mvcomp;
    });
    comp = comp[0];
    let arr = this.state.toDoTasks;
    arr.push(
      <DisplayBox
        title={comp.props.title}
        desc={comp.props.desc}
        delete={this.deleteToDo.bind(this)}
        move={this.moveToDo.bind(this)}
      />
    );
    this.deleteBacklog(comp.props.title);
    this.setState(() => ({
      toDoTasks: arr,
    }));
  }

  moveToDo(mvcomp) {
    let comp = this.state.toDoTasks.filter((task) => {
      return task.props.title === mvcomp;
    });
    comp = comp[0];
    let arr = this.state.completeTasks;
    arr.push(
      <DisplayBox
        title={comp.props.title}
        desc={comp.props.desc}
        delete={this.deleteToDo.bind(this)}
        move={this.moveToDo.bind(this)}
      />
    );
    this.deleteToDo(comp.props.title);
    this.setState(() => ({
      completeTasks: arr,
    }));
  }

  deleteBacklog(rmvcomp) {
    let arr = this.state.backlogTasks.filter((task) => {
      return task.props.title !== rmvcomp;
    });
    this.setState(() => ({
      backlogTasks: arr,
    }));
  }

  deleteToDo(rmvcomp) {
    let arr = this.state.toDoTasks.filter((task) => {
      return task.props.title !== rmvcomp;
    });
    this.setState(() => ({
      toDoTasks: arr,
    }));
  }

  deleteComplete(rmvcomp) {
    let arr = this.state.completeTasks.filter((task) => {
      return task.props.title !== rmvcomp;
    });
    this.setState(() => ({
      completeTasks: arr,
    }));
  }

  checkForDups(str) {
    let backlogTitles = this.state.backlogTasks.map((task) => {
      return task.props.title;
    });
    let toDoTitles = this.state.toDoTasks.map((task) => {
      return task.props.title;
    });
    let completeTitles = this.state.completeTasks.map((task) => {
      return task.props.title;
    });
    console.log(str);
    console.log(backlogTitles);
    let inBacklog = backlogTitles.includes(str);
    let inToDo = toDoTitles.includes(str);
    let inComplete = completeTitles.includes(str);

    return inBacklog || inToDo || inComplete;
  }

  render() {
    return (
      <div className="App">
        <span className="backlog">
          <section className="title">
            <h1>Backlog</h1>
          </section>
          <section className="input-box">
            <input
              placeholder="Title..."
              onChange={(e) => {
                this.handleBacklogTitle(e);
              }}
            ></input>
            <br />
            <textarea
              placeholder="Description..."
              onChange={(e) => {
                this.handleBacklogDesc(e);
              }}
            ></textarea>
            <br />
            <button
              onClick={() => {
                this.handleBacklogClick();
              }}
            >
              &darr;
            </button>
          </section>
          {this.state.backlogTasks.map((task) => {
            return (
              <DisplayBox
                title={task.props.title}
                desc={task.props.desc}
                delete={this.deleteBacklog.bind(this)}
                move={this.moveBacklog.bind(this)}
              />
            );
          })}
        </span>
        <span className="to-do">
          <section className="title">
            <h1>To-Do</h1>
          </section>
          <section className="input-box">
            <input
              placeholder="Title..."
              onChange={(e) => {
                this.handleToDoTitle(e);
              }}
            ></input>
            <br />
            <textarea
              placeholder="Description..."
              onChange={(e) => {
                this.handleToDoDesc(e);
              }}
            ></textarea>
            <br />
            <button
              onClick={() => {
                this.handleToDoClick();
              }}
            >
              &darr;
            </button>
          </section>
          {this.state.toDoTasks.map((task) => {
            return (
              <DisplayBox
                title={task.props.title}
                desc={task.props.desc}
                delete={this.deleteToDo.bind(this)}
                move={this.moveToDo.bind(this)}
              />
            );
          })}
        </span>
        <span className="complete">
          <section className="title">
            <h1>Complete</h1>
          </section>
          {this.state.completeTasks.map((task) => {
            return (
              <DisplayBoxComplete
                title={task.props.title}
                desc={task.props.desc}
                delete={this.deleteComplete.bind(this)}
              />
            );
          })}
        </span>
      </div>
    );
  }
}

class DisplayBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      desc: props.desc,
    };
  }

  render() {
    return (
      <section className="display-boxes">
        <span>
          <article>{this.props.title}</article>
          <article>{this.props.desc}</article>
          <a className="buttons">
            <button
              onClick={() => {
                this.props.delete(this.props.title);
              }}
            >
              X
            </button>
            <button
              onClick={() => {
                this.props.move(this.props.title);
              }}
            >
              &rarr;
            </button>
          </a>
        </span>
      </section>
    );
  }
}

class DisplayBoxComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      desc: props.desc,
    };
  }

  render() {
    return (
      <section className="display-complete-boxes">
        <span>
          <article>{this.props.title}</article>
          <article>{this.props.desc}</article>
          <span className="buttons">
            <button
              onClick={() => {
                this.props.delete(this.props.title);
              }}
            >
              X
            </button>
          </span>
        </span>
      </section>
    );
  }
}

export default App;
