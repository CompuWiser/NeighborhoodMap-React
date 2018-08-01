import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import "./MapContainer.css";

export class MapContainer extends Component {
  render() {
    return (
      <Map className="map" google={this.props.google} zoom={14}>

        <Marker onClick={this.onMarkerClick}
                name={"Current location"} />

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