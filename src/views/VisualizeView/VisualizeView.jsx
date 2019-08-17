import React from 'react';
import DeckGL from '@deck.gl/react';
import {StaticMap} from 'react-map-gl';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
import {PolygonLayer} from '@deck.gl/layers';
import {TripsLayer} from '@deck.gl/geo-layers';
import {PhongMaterial} from 'luma.gl';

// import vasttrafikData from '../../live_data.json'

const DATA_URL = {
  TRIPS:
  '/live_data.json',
};

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibnVjdWxhaXMiLCJhIjoiY2p6ZTh1NTZ1MDFxNzNpdXB1bXY4cW1iYSJ9.eoNpd9ot4QNJUndc0eqY4w';
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
  TRIPS: [], //vasttrafikData,//JSON med data med koordinater och timestamps
};

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
  vendorColor: {
    0: [253, 128, 93],
    1: [23, 184, 190],
    2: [255, 238, 88],
    3: [76, 175, 80],
    4: [103, 58, 183],
    5: [255, 152, 0],
  },
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  material,
  effects: [lightingEffect]
};


export default class Visualize extends React.Component {
  state = {
    time: 0,
  };

  map = null;

  _mapRef = (node) => {
    console.warn({
      mapRef: node,
    });

    this.map = node.getMap();

    this.map.on('load', () => {
      this._addBuildingsLayer();
    });
  };

  componentDidMount() {
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

    this.setState(() => ({
      time: ((timestamp % loopTime) / loopTime) * loopLength
    }));
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
        getColor: d => theme.vendorColor[d.vendor],
        opacity: 0.3,
        widthMinPixels: 2,
        rounded: true,
        trailLength,
        currentTime: this.state.time, //Kolla detta
        shadowEnabled: false,
      }),
    ];
  }

  _addBuildingsLayer = () => {
    const map = this.map;

    const layers = map.getStyle().layers;

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
        labelLayerId = layers[i].id;
        break;
      }
    }

    map.addLayer({
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
        'fill-extrusion-color': '#aaa',

        // use an 'interpolate' expression to add a smooth transition effect to the
        // buildings as the user zooms in
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          [
            'get',
            'height'
          ],
        ],
        'fill-extrusion-base': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          [
            'get',
            'min_height'
          ],
        ],
        'fill-extrusion-opacity': .6
      },
    }, labelLayerId);
  };

  render() {
    const {
      viewState,
      mapStyle = 'mapbox://styles/mapbox/dark-v9',
      theme = DEFAULT_THEME,
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
          ref={this._mapRef}
          mapStyle={mapStyle}
          reuseMaps
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
    );
  }
}
