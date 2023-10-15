import React from 'react';
import PropTypes from 'prop-types';
import bgEmergency from '../../assets/EmergencyBg.webp';
import styled from 'styled-components';
import ChatForm from '../ChatForm';

const Support = ({ className }) => {
  const handleChatMessageSubmit = (message) => {
    // Handle the chat message submission logic here
    console.log(`Message submitted: ${message}`);
  };

  return (
    <div className={className}>
      <div className='flex justify-center h-screen'>
        <div className='w-1/2 bg-slate-50 p-4 rounded-lg shadow-lg'>
          <div className=''>Potter</div>
          <ChatForm onMessageSubmit={handleChatMessageSubmit} /> {/* Render the ChatForm component */}
        </div>
      </div>
    </div>
  );
};

Support.propTypes = {};

export default styled(Support)`
  background-image: url(${bgEmergency});
  background-size: cover;
  background-position: center;
  height: 100vh;
`;
