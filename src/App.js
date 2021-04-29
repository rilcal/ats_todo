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
    this.state.backlogTasks.push(
      <DisplayBox
        title={this.state.backlogTitle}
        desc={this.state.backlogDesc}
        delete={this.delete.bind(this)}
      />
    );
    this.toggle();
  }

  handleToDOTitle(e) {
    this.setState({
      toDoTitle: e.target.value,
    });
  }

  handleToDODesc(e) {
    this.setState({
      toDoDesc: e.target.value,
    });
  }

  delete(rmvcomp) {
    let i = 0;
    this.state.backlogTasks.forEach((comp) => {
      console.log(comp.props.title);
      console.log(rmvcomp.props.title);
      console.log(comp.props.title === rmvcomp.props.title);
      if (comp.props.title === rmvcomp.props.title) {
        this.state.backlogTasks.splice(i, 1);
        this.toggle();
        return;
      }
    });
  }

  update() {
    this.setState({
      toToDo: this.backlog,
      toComplete: this.complete,
    });
  }

  render() {
    return (
      <div className="App">
        <ul>
          <section>
            <h1>Backlog</h1>
          </section>
          <section>
            {this.state.backlogTasks.map((task) => {
              return task;
            })}
          </section>
          <section>
            <input
              onChange={(e) => {
                this.handleBacklogTitle(e);
              }}
            ></input>
            <br />
            <input
              onChange={(e) => {
                this.handleBacklogDesc(e);
              }}
            ></input>
            <br />
            <button
              onClick={() => {
                this.handleBacklogClick();
              }}
            >
              Add
            </button>
          </section>
        </ul>
        <ul>
          <section>
            <h1>To-Do</h1>
          </section>
          <section>
            {this.state.toDoTasks.map((task) => {
              return task;
            })}
          </section>
          <section>
            <input
              onChange={(e) => {
                this.handleTitle(e);
              }}
            ></input>
            <br />
            <input onChange={this.handleDesc}></input> <br />
            <button onClick={this.handleClick}>Add</button>
          </section>
        </ul>
        <ul>
          <section>
            <h1>Complete</h1>
          </section>
          <section>
            {this.state.completeTasks.map((task) => {
              return task;
            })}
          </section>
        </ul>
      </div>
    );
  }
}

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnName: props.columnName,
      className: props.className,
      title: "",
      desc: "",
      tasks: [],
      update: false,
    };
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDesc = this.handleDesc.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleTitle(e) {
    this.setState((state) => ({
      title: e.target.value,
    }));
  }

  handleDesc(e) {
    this.setState((state) => ({
      desc: e.target.value,
    }));
  }

  handleClick(e) {
    this.setState(() => ({
      update: true,
    }));
    console.log(e);
    this.state.tasks.push(
      <DisplayBox title={this.state.title} desc={this.state.desc} />
    );
    this.setState(() => ({
      update: false,
    }));
  }

  render() {
    return (
      <ul>
        <section>
          <h1>{this.state.columnName}</h1>
        </section>
        <section>
          {this.state.tasks.map((task) => {
            return task;
          })}
        </section>
        <section>
          <input
            onChange={(e) => {
              this.handleTitle(e);
            }}
          ></input>
          <br />
          <input onChange={this.handleDesc}></input> <br />
          <button onClick={this.handleClick}>Add</button>
        </section>
      </ul>
    );
  }
}

class CompleteColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnName: props.columnName,
      className: props.className,
      title: "",
      desc: "",
      tasks: [],
      update: false,
    };
  }

  render() {
    return (
      <ul>
        <section>
          <h1>{this.state.columnName}</h1>
        </section>
        <section>
          {this.state.tasks.map((task) => {
            return task;
          })}
        </section>
      </ul>
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
      <ul>
        <label>{this.state.title}</label>
        <label>{this.state.desc}</label>
        <button
          onClick={() => {
            this.props.delete(this);
          }}
        >
          Delete
        </button>
      </ul>
    );
  }
}

export default App;
