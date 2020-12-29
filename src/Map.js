import React from 'react';
import "./Map.css";
import {Map as MapLeaflet , TileLayer/* ,Circle,Popup */} from "react-leaflet";
import { showDataOnMap } from "./util";


function Map({contries,center,zoom,casesType}) {
    
    return (
        <div className="map">
            <MapLeaflet center={center} zoom={zoom}   >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {             
           showDataOnMap(contries,casesType)
           }</MapLeaflet>
        </div>
    )
}

export default Map;
