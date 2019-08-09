import React from 'react';
import styled from '../../Theme/styled-components';

const Project = styled.a`
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
`;

const ProjectAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 5px;
  border: 1px solid ${props => props.theme.colors.contrast};
`;

const ProjectInfo: React.FC<{
  avatarUrl: string;
  repositoryUrl: string;
  name: string;
}> = ({ avatarUrl, repositoryUrl, name }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginRight: '20px'
      }}
    >
      <ProjectAvatar src={avatarUrl} />
      <Project href={repositoryUrl}>
        {name.substring(0, 20)}
        {name.length > 20 && '...'}
      </Project>
    </div>
  );
};

export default ProjectInfo;
