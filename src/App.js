import { render } from "@testing-library/react";
import React from "react";

function App() {
  return (
    <div className="App">
      <ul className="backlog" id="backlog-root">
        <h1 className="backlog">Backlog</h1>
        <InputBox className="backlog" />
      </ul>
      <ul className="to-do" id="to-do-root">
        <h1 className="to-do">To-Do</h1>
        <InputBox className="to-do" />
      </ul>
      <ul className="complete" id="complete-root">
        <h1 className="complete">Complete</h1>
      </ul>
    </div>
  );
}

// function InputBox() {
//   return (
//     <p>
//       <input></input> <br />
//       <input></input> <br />
//       <button onClick={storeTask}>Add</button>
//     </p>
//   );
// }

class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: props.className,
      title: "",
      desc: "",
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

  handleClick() {
    console.log(this.state.className + "-root");
    document.getElementById(this.state.className + "-root").insertBefore(() => {
      DisplayBox(this.state.title, this.state.desc);
    }, document.getElementById());
  }

  render() {
    return (
      <p>
        <input
          onChange={(e) => {
            this.handleTitle(e);
          }}
        ></input>{" "}
        <br />
        <input onChange={this.handleDesc}></input> <br />
        <button onClick={this.handleClick}>Add</button>
      </p>
    );
  }
}

function DisplayBox(title, desc) {
  render(
    <p>
      <h3>{title}</h3>
      <h6>{desc}</h6>
    </p>
  );
}

function storeTask(par) {}

export default App;
