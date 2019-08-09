import React from 'react';
import { useCurrentUser } from '../Hooks/useCurrentUser';

import styled from '../Theme/styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { openPr } from './__generated__/openPr';
import StatusBar from './StatusBar';

const OPEN_PR = gql`
  query openPr($query: String!) {
    search(query: $query, first: 50, type: ISSUE) {
      nodes {
        __typename
        ... on PullRequest {
          baseRefName
          headRefName
          mergeStateStatus
          url
          id
          title
          author {
            avatarUrl
          }
          repository {
            name
            url
            owner {
              avatarUrl
              login
            }
          }
        }
      }
    }
  }
`;

const OpenPrWrapper = styled.div`
  border-radius: 4px;
  background: ${props => props.theme.colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin-bottom: 50px;
`;

const SectionHeadline = styled.h2`
  color: ${props => props.theme.colors.dark};
`;

const ListWrapper = styled.div`
  flex-grow: 1;
`;

const OpenPrList: React.FC = () => {
  const {
    user: { login }
  } = useCurrentUser();
  const { loading, data } = useQuery<openPr>(OPEN_PR, {
    variables: {
      query: `is:open is:pr author:${login} archived:false`,
      suspend: true
    }
  });

  const {} = useQuery;

  if (loading) {
    return <span>laden...</span>;
  }

  const {
    search: { nodes }
  } = data;

  return (
    <ListWrapper>
      <SectionHeadline>Open pull requests</SectionHeadline>
      {nodes.length === 0 ? (
        <span style={{ color: '#9b9b9b' }}>
          You have no open pull requests.
        </span>
      ) : (
        <OpenPrWrapper>
          {nodes.map(node => {
            return (
              <div>
                {node.__typename === 'PullRequest' && (
                  <StatusBar
                    avatarUrl={node.author.avatarUrl}
                    mergeStatus={node.mergeStateStatus}
                    projectAvatarUrl={node.repository.owner.avatarUrl}
                    sourceBranch={node.baseRefName}
                    targetBranch={node.headRefName}
                    title={node.title}
                    url={node.url}
                    repoUrl={node.repository.url}
                    name={node.repository.name}
                    buttonIcon="search"
                    buttonText="View Pr"
                  />
                )}
              </div>
            );
          })}
        </OpenPrWrapper>
      )}
    </ListWrapper>
  );
};

export default OpenPrList;
