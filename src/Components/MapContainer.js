import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import "./MapContainer.css";

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {
      info: {
        address: ["temp"],
        category: "placeholder"
      },

    }
  };

  onMarkerClick = (selectedPlace, activeMarker, e) => {
    this.setState({
      selectedPlace,
      activeMarker,
      showingInfoWindow: true
    });
    console.log(this.state);
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <Map
        className="map"
        google={this.props.google}
        initialCenter={{
            lat: 30.050,
            lng: 31.203
          }}
        zoom={17}
        onClick={this.onMapClicked}
      >

        {this.props.locations.map((location, index) => (
          <Marker
            key={index}
            title={location.name}
            name={location.name}
            info={location.FS_Info}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={this.onMarkerClick}
          />
        ))}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h2>{this.state.selectedPlace.info.name || this.state.selectedPlace.name}</h2>
            <p className="category">Category: {this.state.selectedPlace.info.category}</p>
            <ul className="address">
              Address:
              {
                this.state.selectedPlace.info.address.map((element, index) => (
                  <li key={index}>
                    {element}
                  </li>
                ))
              }
            </ul>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCHJ2dZAH2E36Yei4ez1AVTB6ZxakRCS9w")
})(MapContainer)