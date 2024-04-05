import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';
import 'mapbox-gl/dist/mapbox-gl.css';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


mapboxgl.accessToken = 'pk.eyJ1IjoiYWlyb24tcm9uZG8iLCJhIjoiY2xodDA1MHlxMGNtMjNlczR1NzNvOG5mOSJ9.t2QGc2zdxSoM4dRG0RU_CA';

const AreaCalculatorMap = () => {
    const mapContainerRef = useRef(null);
    const drawRef = useRef(null);
    const [allCoordinates, setallCoordinates] = useState([])

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [44.5501935, 32.468191],
            zoom: 12
        });

        // Добавьте поиск
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
        });

        map.addControl(geocoder);
        drawRef.current = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            },
            defaultMode: 'draw_polygon'
        });
        map.addControl(drawRef.current);

        map.on('draw.create', updateArea);
        map.on('draw.delete', updateArea);
        map.on('draw.update', updateArea);

        return () => {
            map.off('draw.create', updateArea);
            map.off('draw.delete', updateArea);
            map.off('draw.update', updateArea);
            drawRef.current = null;
            map.remove();
        };
    }, []);

    const updateArea = () => {
        const data = drawRef.current.getAll();
        if (data.features.length > 0) {
            const areaInSquareMeters = turf.area(data);
            const roundedAreaInSquareMeters = Math.round(areaInSquareMeters * 100) / 100;

            const squareKilometer = areaInSquareMeters / 1000000;
            const hectare = areaInSquareMeters / 10000;
            const acre = areaInSquareMeters / 4046.86;
            const are = areaInSquareMeters / 100;
            const squareMile = areaInSquareMeters / 2590000.006154;

            // Обновление содержимого элементов с соответствующими идентификаторами
            document.getElementById('square-meters').textContent = `Площадь в квадратных метрах   : ${roundedAreaInSquareMeters} м²`;
            document.getElementById('square-kilometers').textContent = `Площадь в квадратных километрах   : ${squareKilometer} км²`;
            document.getElementById('hectares').textContent = `Площадь в гектарах   : ${hectare} га`;
            document.getElementById('acres').textContent = `Площадь в акрах   : ${acre} акр`;
            document.getElementById('ares').textContent = `Площадь в арах   : ${are} ар`;
            document.getElementById('square-miles').textContent = `Площадь в квадратных милях   : ${squareMile} кв. мили`;
        } else {
            // Если нет выбранных объектов, очищаем содержимое элементов
            const elements = [
                'square-meters',
                'square-kilometers',
                'hectares',
                'acres',
                'ares',
                'square-miles',
            ];

            elements.forEach((elementId) => {
                document.getElementById(elementId).textContent = '';
            });
        }

        const allCoordinates = [];

        data.features.forEach((feature) => {
            const coordinates = feature.geometry.coordinates[0];
            // Начнем с индекса 1, чтобы исключить первую точку
            for (let i = 1; i < coordinates.length; i++) {
                const coordinate = coordinates[i];
                allCoordinates.push(coordinate);
            }
        });
        setallCoordinates(allCoordinates);


        console.log("Все координаты: ", allCoordinates);
        localStorage.setItem('allCoordinates', allCoordinates);

    };

    return(
        <div>
            <div ref={mapContainerRef} style={{ height: "600px", width: "2/3" }}></div>

            <div id="calculated-area" className=' p-4 text-black flex flex-col ' style={{width: "2/3"}}>

                <div id="square-meters" className='bg-blue-400 rounded-2xl p-2   text-xl font-bold text-white m-2 '>

                </div>
                <div id="square-kilometers" className='bg-green-400 rounded-2xl p-2  text-xl font-bold text-white m-2 '>

                </div>
                <div id="hectares" className='bg-red-400 rounded-2xl p-2 text-xl font-bold text-white m-2 '>

                </div>
                <div id="acres" className='bg-fuchsia-400 rounded-2xl p-2  text-xl font-bold text-white m-2 '>

                </div>
                <div id="ares" className='bg-pink-400 rounded-2xl p-2 text-xl font-bold text-white m-2 '>

                </div>
                <div id="square-miles" className='bg-orange-400 rounded-2xl p-2 font-bold text-xl text-white m-2 '>

                </div>
            </div>

        </div>
        );

};

export default AreaCalculatorMap;
