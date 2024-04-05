import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
mapboxgl.accessToken = 'pk.eyJ1IjoiYWlyb24tcm9uZG8iLCJhIjoiY2xodDA1MHlxMGNtMjNlczR1NzNvOG5mOSJ9.t2QGc2zdxSoM4dRG0RU_CA';

const Map = ({ markers }) => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [44.5501935, 32.468191],
            zoom: 15
        });

                // Добавляем маркеры на карту
                markers.forEach(marker => {
                    new mapboxgl.Marker()
                        .setLngLat([marker.lng, marker.lat])
                        .addTo(map);
                    map.setCenter([marker.lng, marker.lat]);
                });
            return () => {
                map.remove();
            };
    }, [markers]); // Обновляем карту при изменении маркеров

    return (
        <div className="flex justify-center w-full m-2">
            <div ref={mapContainerRef} style={{ height: "500px", width: "100%", borderRadius: "10px" }}></div>
        </div>
    );
};

export default Map;
