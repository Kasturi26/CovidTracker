import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import "./Map.css";
import { showDataOnMap } from "./util";
import ChangeView  from './ChangeView';

function Map({ countries, casesType, center, zoom }) {
  console.log(casesType)
  console.log(center)
  return (
<div className="map">
<MapContainer
  className="markercluster-map"
  center= {center}
  
  zoom={zoom}
  maxZoom={18}
>
<ChangeView center={center} zoom={zoom} /> 
{/* Except for its children, MapContainer props are immutable: 
changing them after they have been set a first time will have no effect on
 the Map instance or its container. The Leaflet Map instance created by the MapContainer
  element can be accessed by child components using one of the provided hooks or the MapConsumer component. */}
  
  <TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution=' KASTURI'
  />
  {/* loop through countries and draw circle*/}

  {showDataOnMap(countries, casesType)}
</MapContainer>
    </div>
  )
}

export default Map;