import React, { Component } from "react";
import "./App.css";
import { GoogleApiWrapper } from "google-maps-react";
import escapeRegExp from "escape-string-regexp";
import LocationsList from "./Components/LocationsList"
import MapContainer from "./Components/MapContainer"

//Handling Google's API request errors
document.addEventListener("DOMContentLoaded", function () {
  let googleMapsScriptTag = document.querySelectorAll("script")[1];

  googleMapsScriptTag.onerror = function (err) {
    console.log("Google Maps API failed to load!")

    let rootElement = document.querySelector("#root");
    let errorElement = document.createElement("div");
    errorElement.innerHTML = "<div class=\"maps-failed\">Google Maps API failed to load!</div>"
    rootElement.appendChild(errorElement)
  }
})

class App extends Component {
  state = {
    locations: [],
    query: "",
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {
      info: {
        address: ["temp"],
        category: "placeholder"
      }
    }
  };

  // get locations' information from local JSON file
  componentDidMount() {
    let jsonFile = require("./places.json");
    let locations = jsonFile.locations;

    // Attach Information from Foursquare API to every location element
    locations = locations.map((location) => {
      location.FS_Info = this.getInfoFromFoursquare(location);
      return location;
    });

    this.setState({
      locations
    });
  }

  // Get a Location's info using Foursquare API
  getInfoFromFoursquare({lat, lng, name}) {
    const FS_ClientID = "YY4SQ4M2HEAP54EPZL2355YZGSSF52ZVLMI1ERRVJ4R2FZRP";
    const FS_ClientSecret = "MIV4VBUVKOHBA2Y1JNS5TP2L3YXJDCQVEE5S5IQBNW2BEYVS";
    name = name.replace(" ", "+");

    let url = "https://api.foursquare.com/v2/venues/search?" +
      "client_id=" + FS_ClientID +
      "&client_secret=" + FS_ClientSecret +
      "&v=20180101" +
      "&ll=" + lat + "," + lng +
      "&query="  + name +
      "&limit=1";
    
    // Initialize info object with default data
    let info = {
      name: "unknown",
      locationID: "unknown",
      address: [],
      category: "unknown"
    };
    
    fetch(url)
      .then(function (response) {
        if (response.status !== 200) {
          alert("Failed to fetch data from foursquare.com");
          return;
        }

        response.json()
          .then(function (data) {
            var locationData = data.response.venues[0];
            info.name = locationData.name;
            info.locationID = locationData.id;
            info.address = locationData.location.formattedAddress;
            info.category = locationData.categories[0].name;
          })
          .catch((error) => {
            alert("Couldn't get appropriate info about this location from foursquare.com");
            console.log(error);
          });
      })
      .catch((error) => {
        alert("Failed to fetch data from foursquare.com, refer to logs for info");
        console.log(error);
      });
    
    //console.log(info);
    return info;
  }

  // Show info about a mark when clicked
  onMarkerClick = (selectedPlace, activeMarker, e) => {
    this.setState({
      selectedPlace,
      activeMarker,
      showingInfoWindow: true
    });
  }

  // Hide info Window if map is clicked
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  // Using filter input field will hide infoWindows, and filter the list
  updateQuery = (query) => {
    this.setState({
      query: query.trim(),
      showingInfoWindow: false,
      activeMarker: null,
      selectedPlace: {
        info: {
          name: null,
          address: ["temp"],
          category: "placeholder"
        }
      }
    })
  }

  render() {
    let {
      locations,
      query,
      showingInfoWindow,
      activeMarker,
      selectedPlace
    } = this.state;

    // filter locations if query is used
    let showingLocations;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i")
      showingLocations = locations.filter((location) => match.test(location.name))
    } else {
      showingLocations = locations
    }

    return (
      <div className="main" role="application">
        <LocationsList
          locations={showingLocations}
          updateQuery={this.updateQuery}
        />

        <MapContainer
          google={this.props.google}
          locations={showingLocations}
          onMapClicked={this.onMapClicked}
          onMarkerClick={this.onMarkerClick}
          activeMarker={activeMarker}
          showingInfoWindow={showingInfoWindow}
          selectedPlace={selectedPlace}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCHJ2dZAH2E36Yei4ez1AVTB6ZxakRCS9w")
})(App)