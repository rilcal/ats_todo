import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = { toToDo: "", toComplete: "" };
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
        <ul className="backlog" id="backlog-root">
          <Column
            ref={(component) => (this.backlog = component)}
            columnName="Backlog"
            className="backlog"
            tasks={this.backlogTasks}
          />
          <Column
            ref={(component) => (this.toDo = component)}
            columnName="To-Do"
            className="to-do"
            tasks={this.toDoTasks}
          />
          <CompleteColumn
            ref={(component) => (this.complete = component)}
            columnName="Complete"
            className="complete"
            tasks={this.completeTasks}
          />
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
        <button>Delete</button>
      </ul>
    );
  }
}

export default App;
