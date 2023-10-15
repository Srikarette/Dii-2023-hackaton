import React from 'react';
import styled from 'styled-components';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

export const Notifications = ({ className }) => {
  return (
    <div className={className}>
      <div className='flex justify-between w-full md:w-2/2'>
        <div className='flex flex-col md:flex-row md:space-x-4 mb-2'>
          <h1 className='font-bold text-2xl'>Notifications</h1>
          <h2 className='font-bold border border-black pl-3 pr-3 rounded-lg text-xl'>4</h2>
        </div>
        <BsFillTrashFill size={30} className='cursor-pointer' />
      </div>

      {/* Content-box */}
      <div className='box_center rounded-md'>
        {/* Here Are Notifications */}
        {[1, 2, 3].map((notification, index) => (
          <div className='noti__border rounded-lg relative p-3 cursor-pointer' key={index}>
            <h1 className='font-bold'>Head News</h1>
            <h2 className='absolute right-4 top-2 flex text-gray-400'>
              <AiOutlineFieldTime size={25} />
              25 November 2023 At 10:30
            </h2>
            <p className='whitespace-normal truncate'>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            </p>
            <p>
              <span className='text-red-600'>หน่วยงานอุทกภัย</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default styled(Notifications)`
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 4%;
  .box_center {
    border: 2px solid black;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
  }
  .noti__border {
    border: 1px solid black;
    height: min-content;
  }
`;
