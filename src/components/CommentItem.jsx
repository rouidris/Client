import React from 'react'
import Moment from "react-moment";
import {useSelector} from "react-redux";

export const CommentItem = ({ cmt }) => {
    const avatar = cmt && cmt.comment?.trim().toUpperCase().split('').slice(0, 2)
    const { user } = useSelector((state) => state.auth)
    return (
        <div className='bg-red-500 h-0 m-0 p-0'>
            {/*{cmt.author === 'hruka' ? (*/}
            {/*    <div className='flex items-center justify-center mr-2 shrink-0 rounded-full w-10 h-10 bg-green-500 text-sm text-white'>*/}
            {/*        {avatar}*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    <div className='flex items-center justify-center mr-2 shrink-0 rounded-full w-10 h-10 bg-red-500 text-sm text-white'>*/}
            {/*        {avatar}*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*<div className='flex text-gray-300 text-[10px] justify-between items-center'>*/}
            {/*    {cmt.comment}*/}
            {/*    <Moment date={cmt.createdAt} format='D MMM YYYY' />*/}
            {/*</div>*/}

        </div>
    )
}
