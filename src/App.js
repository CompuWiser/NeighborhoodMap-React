import React, { Component } from "react";
import "./App.css";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import escapeRegExp from "escape-string-regexp";

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
      console.log(location);
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
          .catch(console.log);
      })
      .catch(console.log);
    
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
      showingInfoWindow: false
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
      <div className="main">
        <div className="list-locations">

          <input
            type="text"
            role="search"
            aria-label="Filter Markers List"
            placeholder="Type here to filter markers 🔍"
            onChange={(event) => this.updateQuery(event.target.value)}
          />

          <ul>
            {showingLocations.map((location, index) => (
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

        <div>
          <Map
            className="map"
            google={this.props.google}
            initialCenter={{
                lat: 30.0515,
                lng: 31.200
            }}
            zoom={17}
            onClick={this.onMapClicked}
          >
            
            {showingLocations.map((location, index) => (
              <Marker
                key={index}
                title={location.name}
                name={location.name}
                info={location.FS_Info}
                position={{ lat: location.lat, lng: location.lng }}
                onClick={this.onMarkerClick}
                animation={location.name === selectedPlace.name && (1)}
              />
            ))}

            <InfoWindow
              marker={activeMarker}
              visible={showingInfoWindow}
            >
              <div>
                <h2>{selectedPlace.info.name || selectedPlace.name}</h2>
                <p className="category">Category: {selectedPlace.info.category}</p>
                <ul className="address">
                  Address:
                  {
                    selectedPlace.info.address.map((element, index) => (
                      <li key={index}>
                        {element}
                      </li>
                    ))
                  }
                </ul>
              </div>
            </InfoWindow>
          </Map>
        </div>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCHJ2dZAH2E36Yei4ez1AVTB6ZxakRCS9w")
})(App)