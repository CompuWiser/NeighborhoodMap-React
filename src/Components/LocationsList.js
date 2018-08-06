import React, { Component } from "react";
import Location from "./Location"

class LocationsList extends Component {
  
  // Trap focus within list and filter field
  trapFocus = () => {

    //listen for and trap the keyboard
    document.addEventListener("keydown", trapTabKey);

    //find all focusable children
    var focusableElementsString = "div.list-locations input, div.list-locations li a";
    var focusableElements = document.querySelectorAll(focusableElementsString);

    //convert NodeList to array
    focusableElements = Array.prototype.slice.call(focusableElements);

    var firstTabStop = focusableElements[0];
    var lastTabStop = focusableElements[focusableElements.length - 1];

    //focus first child
    firstTabStop.focus();

    function trapTabKey(e) {
      //check for TAB key press
      if (e.keyCode === 9) {

        //SHIFT + TAB
        if (e.shiftKey) {
          if (document.activeElement === firstTabStop) {
            e.preventDefault();
            lastTabStop.focus();
          }
          //TAB
        } else {
          if (document.activeElement === lastTabStop) {
            e.preventDefault();
            firstTabStop.focus();
          }
        }
      }
    }
  }
  
  render() {
    let { locations, updateQuery } = this.props;
    let trapFocus = this.trapFocus;

    return (
      <div className="list-locations" aria-label="Locations Menu">

        <input
          type="text"
          role="search"
          aria-label="Filter Markers List"
          placeholder="Type here to filter markers 🔍"
          onChange={(event) => updateQuery(event.target.value)}
          onFocus={trapFocus}
        />

        <ul aria-label="Locations List">
          {locations.map((location, index) => (
            <Location
              location={location}
              key={index}
            />
          ))}
        </ul>

      </div>
    );
  }
}

export default LocationsList