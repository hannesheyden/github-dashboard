import React from 'react';
import styled from '../../Theme/styled-components';

const Title = styled.a`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 0px;
  text-decoration: none;
  color: ${props => props.theme.colors.dark};
`;

const PrTitle: React.FC<{ url: string; title: string }> = ({ url, title }) => {
  return <Title href={url}>{title}</Title>;
};

export default PrTitle;
