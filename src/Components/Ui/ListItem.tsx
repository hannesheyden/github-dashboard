import React from 'react';
import styled from '../../Theme/styled-components';
import ProjectInfo from './ProjectInfo';

const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const TitleLink = styled.a`
  font-size: 1rem;
  margin: 0 20px 0 10px;
  text-decoration: none;
  color: ${props => props.theme.colors.black};
  width: 60%;
`;

const ListItem: React.FC<{
  title: string;
  issueUrl: string;
  avatarUrl: string;
  url: string;
  name: string;
}> = ({ title, issueUrl, avatarUrl, url, name }) => {
  return (
    <ListItemWrapper>
      <TitleLink href={issueUrl}>
        {title.substring(0, 50)}
        {title.length > 50 && '...'}
      </TitleLink>
      <ProjectInfo avatarUrl={avatarUrl} repositoryUrl={url} name={name} />
    </ListItemWrapper>
  );
};

export default ListItem;
