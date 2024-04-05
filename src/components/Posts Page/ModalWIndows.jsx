import React, { useState, useEffect } from 'react';
import '../../styles/ModalWindows.css';
import {useDispatch, useSelector} from 'react-redux';
import { phoneUser } from '../../redux/features/auth/authSlice';

const ModalWindows = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        // Записываем текущее время как время последнего отображения
        localStorage.setItem('lastModalShownTime', new Date().getTime().toString());
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = () => {
        try {
            dispatch(phoneUser({ phoneNumber }));
            setPhoneNumber('');
        } catch (error) {
            console.log(error);
        }
        console.log('Номер телефона отправлен в базу');
        closeModal();
        //axios.post('/api/test/', phone)
        // closeModal();
    };

    useEffect(() => {

            openModal();

    }, []);


    return (
        <div>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <h2 className="mb-16">Введите номер телефона</h2>
                        <input
                            className="input-text"
                            type="text"
                            placeholder="Номер телефона"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />
                        <button className="m-4" onClick={handleSubmit}>
                            Отправить
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalWindows;
