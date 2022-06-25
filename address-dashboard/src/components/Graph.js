import React, { Component, createRef } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import data from "./style.json";
const elements = [
    { data: { id: "one", label: "Node 1" }, position: { x: 0, y: 0 } },
    { data: { id: "two", label: "Node 2" }, position: { x: 100, y: 0 } },
    { data: { source: "one", target: "two", label: "Edge from Node1 to Node2" } },
  ];
class Graph extends Component {
  constructor() {
    super();
    this.ref = createRef();
    this.layout = { name: "cose-bilkent" };
    this.state = {};
  }

  render() {
    return (
      <CytoscapeComponent
        elements={elements}
        stylesheet={data.style}
        layout={this.layout}
        style={{ width: "100%", height: "600px" }}
        cy={cy => (this.ref = cy)}
      />
    );
  }
}
export default Graph;

// https://mocks.neux.io/graph/03
