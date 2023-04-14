import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

function Map() {
  const [position, setPosition] = useState([37.5665, 126.9780]); // 초기 위치를 서울로 설정합니다.

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  useEffect(() => {
    if((latitude!= null ) && (longitude != null)){
      // 위도: 37.514219
      // 경도: 127.060703
      setPosition([latitude,longitude])
    }
  }, [latitude,longitude]);

  console.log(position)
  return (
    <MapContainer key={position[0]} center={position} zoom={16} style={{ height: '800px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data © <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors"
        maxZoom={18} // 최대 줌 레벨을 18로 제한합니다.
        minZoom={10} // 최소 줌 레벨을 10으로 제한합니다.
      />
      <Marker position={position} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
        <Popup>You are here</Popup>
      </Marker>
    </MapContainer>

  );
}

export default Map;