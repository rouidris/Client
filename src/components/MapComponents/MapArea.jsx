import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as turf from '@turf/turf';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import AreaCalculatorMap from "./AreaCalculatorMap";
import MarkerMap from "./MarkerMap"
mapboxgl.accessToken = 'pk.eyJ1IjoiYWlyb24tcm9uZG8iLCJhIjoiY2xodDA1MHlxMGNtMjNlczR1NzNvOG5mOSJ9.t2QGc2zdxSoM4dRG0RU_CA';

const DrawPolygonMap = () => {
    const mapContainerRef = useRef(null);
    const drawRef = useRef(null);
    const [allCoordinates, setallCoordinates] = useState({})

    const [activeComponent, setActiveComponent] = useState('AreaCalculatorMap');

    const toggleComponent = () => {
        setActiveComponent(activeComponent === 'AreaCalculatorMap' ? 'MarkerMap' : 'AreaCalculatorMap');
    };



    return (
        <div>
            <button onClick={toggleComponent} className="p-3 bg-emerald-500 text-white m-4">
                {activeComponent === 'AreaCalculatorMap' ? 'Хотите узнать ваше местоположение?' : 'Хотите вычислить площадь своего поля?'}
            </button>

            {activeComponent === 'AreaCalculatorMap' ? (
                <AreaCalculatorMap />
            ) : (
                <MarkerMap />
            )}




        </div>
    );

};

export default DrawPolygonMap;
