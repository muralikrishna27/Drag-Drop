import React, { Component } from 'react';

import './Dropdown.css';

class App extends Component {
  state = {
    levels: [
      { name: "Coding Test", status: "pending", bgcolor: "#c0d66f" },
      { name: "React", status: "pending", bgcolor: "#d596e0" },
      { name: "Vue", status: "complete", bgcolor: "#78a1e3" }
    ]
  }


  onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  }

  onDragOver = (ev) => {
    ev.preventDefault();
  }

  onDrop = (ev, sts) => {
    let id = ev.dataTransfer.getData("id");

    let filteLevels = this.state.levels.filter((level) => {
      if (level.name == id) {
        level.status = sts;
      }
      return level;
    });

    this.setState({
      ...this.state,
      filteLevels
    });
  }

  render() {
    var levels = {
      pending: [],
      complete: []
    }
    this.state.levels.forEach((t) => {
      levels[t.status].push(
        <div key={t.name}
          onDragStart={(e) => this.onDragStart(e, t.name)}
          draggable
          className="draggable"
          style={{ backgroundColor: t.bgcolor }}>
          {t.name}
        </div>
      );
    });

    return (
      <div className="container-drag">
        <div className="pi"
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => { this.onDrop(e, "pending") }}>
          <span className="levels-header">Pending Interviews</span>
          {levels.pending}
        </div>
        <div className="droppable"
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, "complete")}>
          <span className="levels-header">Completed Interviews</span>
          {levels.complete}
        </div>
      </div>
    );
  }
}
export default App;