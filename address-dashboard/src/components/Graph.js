import React, { Component, createRef, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import data from "./style.json";
import Cytoscape from "cytoscape-qtip";
import { fetchTransactionData, parseIntoMap } from "../api/covalantApi";
import { Button, CardActions, CardContent, Grid, Popper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
var cytoscape = require("cytoscape");
var cyqtip = require("cytoscape");
cyqtip(cytoscape); // register extension
const radius = 100;
Math.radians = function (degrees) {
  return (degrees * Math.PI) / 180;
};

// const elements = [
//     { data: { id: "one", label: "Node 1" }, position: { x: 0, y: 0 } },
//     { data: { id: "two", label: "Node 2" }, position: { x: 100, y: 0 } },
//     { data: { source: "one", target: "two", label: "Edge from Node1 to Node2" } },
//   ];
function truncate(str) {
  return String(str).substring(0, 6) + "..." + String(str).substring(36, 42);
}
class Graph extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.ref = createRef();
    this.layout = { name: "cose-bilkent" };
    this.state = {
      address: props.userAddress,
      transactionMap: {},
      elements: props.elements,
      isPopperOpen: false,
      isContract: false,
      clickedAddress: "",
      anchorEl: null,
    };
    console.log(props.userAddress);
    console.log("state", this.state);
    this.generateElements = this.generateElements.bind(this);
    this.updateCardText = this.updateCardText.bind(this);
    // this.cy.on('click', 'node', (event) => {
    //   console.log("clicked");
    //   console.log(event);
    // })
  }
  componentDidMount() {
    this.generateElements();
  }
  generateElements() {}

  componentDidMount() {
    this.cy.on("click", "node", (event) => {
      console.log("clicked");
      let addr = event.target._private.data.id;
      console.log(event.originalEvent.target);
      console.log(event.target)

      this.setState({
        isPopperOpen: true,
        clickedAddress: addr,
        anchorEl: event.originalEvent.target,
        isContract: event.target._private.data.isContract
      });
      this.updateCardText(addr);
    });
  }
  updateCardText(addr){
    fetchTransactionData(addr).then(data => {
      console.log("data Received");
      console.log(data);
    }).catch(err=> {

    });
  }

  render() {
    return (
      <div>
        <Container>
          <Grid container spacing={4} columns={12}>
            <Grid item xs={10}>
              <CytoscapeComponent
                cy={(cy) => {
                  this.cy = cy;
                }}
                elements={this.state.elements}
                stylesheet={data.style}
                layout={{
                  animate: true,
                  name: "cose",
                  idealEdgeLength: 100,
                  nodeOverlap: 20,
                  refresh: 20,
                  fit: true,
                  padding: 30,
                  randomize: true,
                  componentSpacing: 100,
                  nodeRepulsion: 400000,
                  edgeElasticity: 100,
                  nestingFactor: 5,
                  gravity: 80,
                  numIter: 1000,
                  initialTemp: 200,
                  coolingFactor: 0.95,
                  minTemp: 1.0,
                }}
                style={{ width: "100%", height: "600px" }}
              />
            </Grid>
            <Grid item xs={2}>
            <React.Fragment>
              <CardContent>
              <Typography variant="h5" component="div">
                {this.state.isContract && "Contract"} 
                  {!this.state.isContract && "User"}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {this.state.clickedAddress}
                </Typography>
               
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Etherscan</Button>
              </CardActions>
            </React.Fragment>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
export default Graph;

// https://mocks.neux.io/graph/03
