import React from 'react';
import Moment from "react-moment";

export const RequestItem = ({ cmt }) => {
    // Добавляем проверку на существование cmt
    const avatar = cmt && cmt.comment ? cmt.comment.trim().toUpperCase().split('').slice(0, 2): '';

    return (
        <div className='flex'>
            <div className='flex text-gray-300 text-[10px] justify-between items-center w-full'>

            </div>
        </div>
    );
};
