import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ComponentContainer({ children, className }) {
  return <main className={className}>{children}</main>;
}

ComponentContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired
};

export default styled(ComponentContainer)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 0;
`;