import React, { Component } from "react";
import { Map, InfoWindow, Marker } from "google-maps-react";

class LocationsList extends Component {
  render() {
    let {
      google,
      locations,
      onMapClicked,
      onMarkerClick,
      activeMarker,
      showingInfoWindow,
      selectedPlace
    } = this.props;

    return (
      <main role="presentation"  aria-label="Locations Map">
        <Map
          className="map"
          google={google}
          initialCenter={{
              lat: 30.0515,
              lng: 31.200
          }}
          zoom={17}
          onClick={onMapClicked}
        >
          
          {locations.map((location, index) => (
            <Marker
              key={index}
              title={location.name}
              name={location.name}
              info={location.FS_Info}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={onMarkerClick}
              animation={location.name === selectedPlace.name && (1)}
            />
          ))}

          <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}
            aria-label="info window"
          >
            <div className="info-window">
              <h2 className="info-header">{selectedPlace.info.name || selectedPlace.name}</h2>
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
      </main>
    )
  }
}

export default LocationsList