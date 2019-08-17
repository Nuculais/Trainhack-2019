import React from 'react'
import ReactDOM from 'react-dom'
//import vasttrafikData from Vasttrafik eller något
import DeckGL from '@deck.gl/react';
import {LineLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
import {PolygonLayer} from '@deck.gl/layers';
import {TripsLayer} from '@deck.gl/geo-layers';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'sk.eyJ1IjoibnVjdWxhaXMiLCJhIjoiY2p6ZTk4b2lmMDAzNDNjbW1wNGh5ZTJ0MyJ9.4TX9WmhM3V6XQXjv1S2M1g';
//Default public token: pk.eyJ1IjoibnVjdWxhaXMiLCJhIjoiY2p6ZTh1NTZ1MDFxNzNpdXB1bXY4cW1iYSJ9.eoNpd9ot4QNJUndc0eqY4w
//Trainhack2019-token: sk.eyJ1IjoibnVjdWxhaXMiLCJhIjoiY2p6ZTk4b2lmMDAzNDNjbW1wNGh5ZTJ0MyJ9.4TX9WmhM3V6XQXjv1S2M1g

// Initial viewport settings (aka where the map focuses when the app starts)
const INITIAL_VIEW_STATE = {
  longitude: 11.973139, //Göteborg Centralstation x
  latitude: 57.709794, //Göteborg Centralstation y
  zoom: 13,
  pitch: 45,
  bearing: 0
};

//The actual trips
const DATA = {
  TRIPS: //JSON med data med koordinater och timestamps
}

//outer corner boundaries for the map [longitude,latitude]
const landCover = [[[11.756911, 57.570793], [12.308102, 57.570793], [12.308102, 57.854212], [11.756911, 57.854212]]];
//const landCover = [[[-74.0, 40.7], [-74.02, 40.7], [-74.02, 40.72], [-74.0, 40.72]]];

// Data to be used by the LineLayer (example)
//const exadata = [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}];

//Styling {CHANGE THIS TO SUITABLE COLOURS ONCE TESTED}
const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [12.308122, 57.570793, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight});

const material = new PhongMaterial({
  ambient: 0.1,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [60, 64, 70]
});

const DEFAULT_THEME = {
  buildingColor: [74, 80, 87],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  material,
  effects: [lightingEffect]
};


export class Visualize extends React.Component {
  constructor(props) {
    super(props);
      //this.state = status:'INITIAL'
      this.state = {
        time: 0
    };
  }

  componentDidMount() {
     //this.setState({
       //status: 'LOADED'
   //}).catch(() => {
     //this.setState({
       //status: 'ERROR'
     //})
   //})
   this._animate();
 }

 componentWillUnmount() {
   if (this._animationFrame) {
     window.cancelAnimationFrame(this._animationFrame);
   }
 }

 _animate() {
   const {
     loopLength = 1800, // unit corresponds to the timestamp in source data VERIFIERA
     animationSpeed = 30 // unit time per second VERIFIERA
   } = this.props;
   const timestamp = Date.now() / 1000; //Det är lite fördröjning va?
   const loopTime = loopLength / animationSpeed;

   this.setState({
     time: ((timestamp % loopTime) / loopTime) * loopLength
   });
   this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
 }

 _renderLayers() {
   const {
     trips = DATA_URL.TRIPS,
     trailLength = 180,
     theme = DEFAULT_THEME
   } = this.props;

   return [
     // This is only needed when using shadow effects
     new PolygonLayer({
       id: 'ground',
       data: landCover,
       getPolygon: f => f,
       stroked: false,
       getFillColor: [0, 0, 0, 0]
     }),
     new TripsLayer({
       id: 'trips',
       data: trips,
       getPath: d => d.path,
       getTimestamps: d => d.timestamps,
       getColor: d => (d.vendor === 0 ? theme.trailColor0 : theme.trailColor1), //Kolla detta!
       opacity: 0.3,
       widthMinPixels: 2,
       rounded: true,
       trailLength,
       currentTime: this.state.time, //Kolla detta!

       shadowEnabled: false
     }),
   ];
 }

 render() {
   const {
     viewState,
     mapStyle = 'mapbox://styles/mapbox/dark-v9',
     theme = DEFAULT_THEME
   } = this.props;

   return (
     <DeckGL
       layers={this._renderLayers()}
       effects={theme.effects}
       initialViewState={INITIAL_VIEW_STATE}
       viewState={viewState}
       controller={true}
     >
       <StaticMap
         reuseMaps
         mapStyle={mapStyle}
         preventStyleDiffing={true}
         mapboxApiAccessToken={MAPBOX_TOKEN}
       />
     </DeckGL>
   );
 }
}

export function renderToDOM(container) {
 render(<App />, container); //Kolla detta, ska det vara Visualize
}

 //update() {

 //}
