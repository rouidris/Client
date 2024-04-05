import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
mapboxgl.accessToken = 'pk.eyJ1IjoiYWlyb24tcm9uZG8iLCJhIjoiY2xodDA1MHlxMGNtMjNlczR1NzNvOG5mOSJ9.t2QGc2zdxSoM4dRG0RU_CA';

const GetCoordinatesMap = () => {
    const mapContainerRef = useRef(null);
    const [userLocation, setUserLocation] = useState(null);
    const [userMarker, setUserMarker] = useState(null);
    const [coordinates, setCoordinates] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [44.5501935, 32.468191],
            zoom: 15
        });

        // Создайте слой для маркера
        const markerLayer = new mapboxgl.Marker();

        // Добавьте поиск
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
        });

        map.addControl(geocoder);

        // Обработчик клика на карте
        map.on('click', (e) => {
            setCoordinates(e.lngLat);

            // Удалите предыдущий маркер
            if (marker) {
                marker.remove();
            }

            // Установите новый маркер
            markerLayer.setLngLat(e.lngLat).addTo(map);
            setMarker(markerLayer);
        });

        // Запросите геолокацию пользователя
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });

                // Создайте маркер для текущего местоположения
                const userMarkerLayer = new mapboxgl.Marker({ color: 'red' })
                    .setLngLat([longitude, latitude])
                    .addTo(map);

                setUserMarker(userMarkerLayer);

                // Центрируйте карту по местоположению пользователя
                map.setCenter([longitude, latitude]);
            });
        }

        return () => {
            map.remove();
        };
    }, []);

    return (
        <div>
            <div ref={mapContainerRef} style={{ height: '600px', width: '2/3' }}></div>
            <div className="p-4 text-black">
                {userLocation && (
                    <div className="bg-red-400 rounded-2xl p-2 text-xl font-bold text-white m-2">
                        Ваше текущее местоположение:
                        <br />
                        Широта: {userLocation.lat.toFixed(5)}
                        <br />
                        Долгота: {userLocation.lng.toFixed(5)}
                    </div>
                )}
                {coordinates && (
                    <div className="bg-blue-400 rounded-2xl p-2 text-xl font-bold text-white m-2">
                        Координаты выбранного места:
                        <br />
                        Широта: {coordinates.lat.toFixed(5)}
                        <br />
                        Долгота: {coordinates.lng.toFixed(5)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetCoordinatesMap;
