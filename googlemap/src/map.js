import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import './map.css';
import CurrentLocation from './location';

var { apiKey } = require('./key.js');


const mapStyles = {
  width: '50%',
  height: '50%'
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }

onMarkerClick = (props, marker, evt) => {
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });
}

onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};

  render() {
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
        >
        <Marker onClick={this.onMarkerClick} name={'current location'}/>
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey
})(MapContainer);
