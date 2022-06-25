import React from 'react';
import logo from './logo.svg';
import data from "./components/style.json";

import Home from './components/Home';
import './App.css';
import CytoscapeComponent from "react-cytoscapejs";
import Cytoscape from "cytoscape";
import Graph from './components/Graph';
//var CoSELayout = require('cose-base').CoSELayout;
var coseLayout = require("cytoscape-cose-bilkent");
Cytoscape.use(coseLayout);
const elements = [
  { data: { id: "one", label: "Node 1" }, position: { x: 0, y: 0 } },
  { data: { id: "two", label: "Node 2" }, position: { x: 100, y: 0 } },
  { data: { source: "one", target: "two", label: "Edge from Node1 to Node2" } },
];
function App() {
  return (
    <div className="App">

      <Home>

      </Home>
        <Graph>
        </Graph>
      
    </div>
    
  );
}

export default App;
