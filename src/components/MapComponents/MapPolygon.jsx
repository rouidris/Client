import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import * as turf from '@turf/turf';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import {points} from "@turf/turf";
mapboxgl.accessToken = 'pk.eyJ1IjoiYWlyb24tcm9uZG8iLCJhIjoiY2xodDA1MHlxMGNtMjNlczR1NzNvOG5mOSJ9.t2QGc2zdxSoM4dRG0RU_CA';

const MapPolygon = ({ polygonCoordinates }) => {
    const mapContainerRef = useRef(null);
    const drawRef = useRef(null);
    const [markerPoints, setMarkerPoints] = useState([]);
    const [mapInitializedCount, setMapInitializedCount] = useState(0);

    const initializeMap = async () => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [44.5501935, 32.468191],
            zoom: 15
        });

        if (polygonCoordinates && typeof polygonCoordinates === 'string') {
            const coordinatesArray = polygonCoordinates.split(",").map(parseFloat);
            console.log(polygonCoordinates);
            // После инициализации карты увеличиваем счетчик
            setMapInitializedCount(mapInitializedCount + 1);
            console.log(mapInitializedCount);
            // Теперь у вас есть массив с парами координат
            const polygonCoordinatess = [];
            for (let i = 0; i < coordinatesArray.length; i += 2) {
                const lat = coordinatesArray[i];
                const lng = coordinatesArray[i + 1];
                polygonCoordinatess.push([lat, lng]);
            }

            // Теперь вы можете установить markerPoints
            const points = polygonCoordinatess.map((coordinate) => [coordinate[0], coordinate[1]]);
            setMarkerPoints(points);

            //для добавления самого поля
            map.on('style.load', () => {
                drawRef.current = new MapboxDraw({
                    displayControlsDefault: false,
                    controls: {
                        polygon: false,
                        trash: true,
                    },
                });
                map.addControl(drawRef.current);

                markerPoints.forEach((point) => {
                    new mapboxgl.Marker().setLngLat(point).addTo(map);
                    const firstMarkerCoordinates = markerPoints[0];
                    map.setCenter(firstMarkerCoordinates);
                });

                // Проверить существование слоя перед его удалением
                if (map.getLayer('line')) {
                    map.removeLayer('line');
                    map.removeSource('line');
                }

                if (markerPoints.length >= 2) {
                    const lineString = turf.lineString([...markerPoints, markerPoints[0]]);
                    const lineGeoJSON = turf.featureCollection([lineString]);
                    map.addLayer({
                        id: 'line',
                        type: 'line',
                        source: {
                            type: 'geojson',
                            data: lineGeoJSON,
                        },
                        paint: {
                            'line-color': 'orange',
                            'line-width': 2,
                        },
                    });
                }
            });

            return () => {
                map.remove();

            };
        }
    };

    useEffect(() => {
        // Call the asynchronous function when the component mounts
        initializeMap();
    }, [polygonCoordinates]);

    // Этот эффект будет вызван после каждого обновления mapInitializedCount
    useEffect(() => {
        if (mapInitializedCount < 2) {
            // Вызываем initializeMap второй раз
            initializeMap();
        }
    }, [mapInitializedCount]);

    return (
        <div className="flex justify-center w-full m-2">
            <div ref={mapContainerRef} style={{ height: "500px", width: "100%", borderRadius: "10px" }}></div>
        </div>
    );
};

export default MapPolygon;
