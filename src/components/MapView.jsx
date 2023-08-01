import "../utils/styles.scss";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import { useSelector, useDispatch } from "react-redux";
import { selectRoute } from "../reducers/routeReducer";

const MapView = () => {
  const selectedRouteId = useSelector((state) => state.route.selectedRouteId);
  const selectedRoute = useSelector((state) =>
    state.route.routes.find((route) => route.id === selectedRouteId)
  );

  const dispatch = useDispatch();

  const mapRef = useRef();

  useEffect(() => {
    if (selectedRoute && selectedRoute.track) {
      const map = mapRef.current;
      map.flyToBounds(
        selectedRoute.track.map((point) => [point.lat, point.lng])
      );
    }
  }, [selectedRoute]);

  const handleRouteSelection = (routeId) => {
    dispatch(selectRoute(routeId));
  };

  return (
    <div className="leaflet-container">
      <MapContainer
        center={[59.84660399, 30.29496392]}
        zoom={12}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {selectedRoute && selectedRoute.track && (
          <>
            <MarkerClusterGroup>
              {selectedRoute.track.map((point, index) => (
                <Marker
                  key={index}
                  position={[point.lat, point.lng]}
                  onClick={() => handleRouteSelection(selectedRoute.id)}
                >
                  <Popup>{`Точка ${index + 1}`}</Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>

            <Polyline
              positions={selectedRoute.track.map((point) => [
                point.lat,
                point.lng,
              ])}
            />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;