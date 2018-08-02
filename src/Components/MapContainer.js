import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import "./MapContainer.css";

export class MapContainer extends Component {
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
      >

        {this.props.locations.map((location, index) => (
          <Marker
            key={index}
            title={location.name}
            name={location.name}
            position={{ lat: location.lat, lng: location.lng }}
          />
        ))}

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              {/*<h1>{this.state.selectedPlace.name}</h1>*/}
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCHJ2dZAH2E36Yei4ez1AVTB6ZxakRCS9w")
})(MapContainer)