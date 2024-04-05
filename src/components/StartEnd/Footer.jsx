import React from 'react';
import {BsTelegram} from 'react-icons/bs'
import {BsPersonCircle} from 'react-icons/bs'
import {BsWhatsapp} from 'react-icons/bs'
import {BsInstagram} from 'react-icons/bs'
import {BsMapFill} from 'react-icons/bs'
import imageMap from '../../assets/Recurso-49.png'
import {
    MDBFooter,
} from 'mdb-react-ui-kit';

export const Footer = () => {
    return (
        <MDBFooter bgColor='dark' className='text-center text-white text-lg-left mt-16 '>
            <div className='flex flex-wrap justify-around  w-full p-8'>

                <div className='flex flex-col bg-blue-200 rounded-2xl p-4 m-4'>
                    <p className='p-2 mb-3 ml-3 flex flex-row text-3xl text-gray-700 font-bold'>
                        TerraTrade
                    </p>
                    <div className="flex flex-wrap items-center">
                        <img src={imageMap} alt="MapLogo" style={{ width: '140px', margin: '15px' }} />
                        <p className="p-4 w-64 text-gray-700 border-gray-700 border-2 rounded-2xl flex items-center">
                            Мы заботимся об имуществе наших клиентов, защите прав и росте бизнеса
                        </p>
                    </div>
                </div>

                <div className='flex flex-col w-72 bg-green-200 rounded-2xl p-4 m-4'>
                    <p className='p-2 mb-8 flex flex-row bg-green-600 justify-center rounded-2xl'>
                        Наше местоположение:
                    </p>
                    <div className='flex flex-col'>
                        <p className='p-4 text-gray-700'>
                            г.Алматы, Байтурсынова 147/2
                        </p>
                        <p className='p-4 text-gray-700'>
                            г.Астана, Назарбаева 85
                        </p>
                    </div>
                </div>

                <div className='flex flex-col w-72 items-center bg-red-200 rounded-2xl p-4 m-4'>
                    <p className='p-3 flex flex-row bg-red-600 justify-center rounded-2xl mb-8'>
                        Наши контакты:
                    </p>
                    <div className='flex flex-row text-gray-700'>
                        <BsTelegram className='h-8 w-8 m-2' />
                        <BsPersonCircle className='h-8 w-8 m-2' />
                        <BsWhatsapp className='h-8 w-8 m-2' />
                        <BsInstagram className='h-8 w-8 m-2' />
                    </div>
                </div>
            </div>
            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a className='text-white' href='https://mdbootstrap.com/'>
                    SpaLab.com
                </a>
            </div>
        </MDBFooter>
    );
}
