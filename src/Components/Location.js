import React, { Component } from "react";

class Location extends Component {
  
  render() {
    let {location, key} = this.props;
    return (
      <li key={key}>
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
    );
  }
}

export default Location