import React, { Component } from "react";
import "./App.css";
import ListLocations from "./Components/ListLocations"
import MapContainer from "./Components/MapContainer"
import escapeRegExp from "escape-string-regexp";

class App extends Component {
  state = {
    locations: [],
    query: ""
  };

  componentDidMount() {
    let jsonFile = require("./places.json");
    let locations = jsonFile.locations;
    locations = locations.map((location) => {
      location.FS_Info = this.getInfoFromFoursquare(location);
      return location;
    });
    this.setState({ locations });
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: "" })
  }

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
    
    let info = {};
    
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
      .catch(function (err) {
        console.log(err);
      });
    return info;
  }


  render() {
    let { locations, query } = this.state;

    let showingLocations;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i")
      showingLocations = locations.filter((location) => match.test(location.name))
    } else {
      showingLocations = locations
    }

    return (
      <div className="main">
        <ListLocations
          locations={showingLocations}
          updateQuery={this.updateQuery}
          clearQuery={this.clearQuery}
        />
        <MapContainer
          locations={showingLocations}
        />
      </div>
    );
  }
}

export default App;