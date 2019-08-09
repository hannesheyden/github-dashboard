import React from 'react';
import styled from '../../Theme/styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ViewButton = styled.a`
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  background: ${props => props.theme.colors.contrast};
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: -20px -20px -20px 0;
  width: 120px;

  &:hover {
    color: ${props => props.theme.colors.contrast};
    background: ${props => props.theme.colors.dark};
  }
`;

export type ButtonIcons = 'stop-circle' | 'search';

interface ViewPrProps {
  url: string;
  iconName: ButtonIcons;
  text: string;
}

const ViewPrButton: React.FC<ViewPrProps> = ({ url, iconName, text }) => {
  return (
    <ViewButton href={url}>
      <FontAwesomeIcon
        icon={['fas', iconName]}
        size="2x"
        style={{ marginRight: '5px' }}
      />
      {text}
    </ViewButton>
  );
};

export default ViewPrButton;
