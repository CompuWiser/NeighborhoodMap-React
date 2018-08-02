import React, { Component } from "react";
import "./ListLocations.css";

class ListLocations extends Component {
  render() {
    return (
      <div className="list-locations">
        <input type="text" placeholder="Filter Markers"/>
        <ul>
          {this.props.locations.map((location, index) => (
            <li key={index}>
              <a href="/">{location.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListLocations;