import React, { Component, createRef, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import data from "./style.json";
import Cytoscape from "cytoscape-qtip";
import { fetchBalanceData, fetchTransactionData, parseIntoMap } from "../api/covalantApi";
import { Button, CardActions, CardContent, Grid, Popper, Table, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { DataGrid,GridValueGetterParams,GridColDef} from "@mui/x-data-grid";
import BalanceTable, { createBalanceTableData } from "./BalanceTable";
var cytoscape = require("cytoscape");
var cyqtip = require("cytoscape");
cyqtip(cytoscape); // register extension
const radius = 100;
Math.radians = function (degrees) {
  return (degrees * Math.PI) / 180;
};
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
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
      balanceTableData: [],
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
      console.log("clicked node");
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
    this.cy.on("click", "edge", (event) => {
      console.log("clicked edge");
      let addr = event.target._private.data.id;
      console.log(event.originalEvent.target);
      console.log(event.target)

    });
  }
  updateCardText(addr){
    fetchBalanceData(addr).then(data => {
      console.log("data Received");
      console.log(data);
      this.setState({
        balanceTableData: createBalanceTableData(data)
      })
      
    }).catch(err=> {

    });
  }

  render() {
    return (
      <div>
        <Container>
          <Grid container spacing={4} columns={12}>
            <Grid item xs={8}>
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
            <Grid item xs={4}>
            <React.Fragment>
              <CardContent>
              <Typography variant="h5" component="div">
                {this.state.isContract && "Contract"} 
                  {!this.state.isContract && "User"}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {this.state.clickedAddress}
                </Typography >
                <Typography variant="h7" component="div">
                  Balances
                </Typography>
                <div style={{ height: 500, width: '100%' }}>
                
                <BalanceTable rows={this.state.balanceTableData}>
                  
                </BalanceTable>
                </div>
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
