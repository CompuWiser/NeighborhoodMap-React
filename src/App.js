import React, { Component } from "react";
import "./App.css";
import ListLocations from "./Components/ListLocations"
import MapContainer from "./Components/MapContainer"

class App extends Component {
  render() {
    return (
      <div className="main">
        <ListLocations/>
        <MapContainer/>
      </div>
    );
  }
}

export default App;