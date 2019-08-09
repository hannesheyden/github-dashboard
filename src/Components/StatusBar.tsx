import React from 'react';
import styled from '../Theme/styled-components';
import ProjectInfo from './Ui/ProjectInfo';
import BranchInfo from './Ui/BranchInfo';
import PrStatus from './Ui/PrStatus';
import ViewPrButton, { ButtonIcons } from './Ui/ViewPrButton';
import PrTitle from './Ui/PrTitle';
import { reviewRequest_search_nodes_PullRequest } from './__generated__/reviewRequest';

const RequestReviewWrapper = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${props => props.theme.colors.contrast};
  display: flex;
  justify-content: flex-start;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 64px;
  height: 64px;
  margin-right: 10px;
  border: 1px solid ${props => props.theme.colors.contrast};
`;

interface StatusBarProps {
  title: string;
  url: string;
  repoUrl: string;
  avatarUrl: string;
  projectAvatarUrl: string;
  sourceBranch: string;
  targetBranch: string;
  mergeStatus: string;
  name: string;
  buttonIcon: ButtonIcons;
  buttonText: string;
}

const StatusBar: React.FC<StatusBarProps> = ({
  url,
  repoUrl,
  avatarUrl,
  projectAvatarUrl,
  sourceBranch,
  targetBranch,
  title,
  mergeStatus,
  name,
  buttonIcon,
  buttonText
}) => {
  return (
    <RequestReviewWrapper>
      <div style={{ flexGrow: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
          <Avatar src={avatarUrl} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingRight: '20px'
            }}
          >
            <PrTitle url={url} title={title} />
            <BranchInfo baseRefName={sourceBranch} headRefName={targetBranch} />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingRight: '20px'
          }}
        >
          <ProjectInfo
            avatarUrl={projectAvatarUrl}
            repositoryUrl={repoUrl}
            name={name}
          />
          <PrStatus mergeStateStatus={mergeStatus} />
        </div>
      </div>

      <ViewPrButton url={url} iconName={buttonIcon} text={buttonText} />
    </RequestReviewWrapper>
  );
};

export default StatusBar;
