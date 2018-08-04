import React, { Component } from "react";
import "./ListLocations.css";

class ListLocations extends Component {

  render() {
    return (
      <div className="list-locations">
        <input
          type="text"
          placeholder="Filter Markers"
          onChange={(event) => this.props.updateQuery(event.target.value)}
        />
        <ul>
          {this.props.locations.map((location, index) => (
            <li key={index}>
              <a
                href="/"
                onClick={(evt) => {
                  evt.preventDefault();
                  document.querySelector(`div.gmnoprint[title="${location.name}"]`).click();
                }}
              >
                {location.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListLocations;