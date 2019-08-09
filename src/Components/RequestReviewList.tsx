import React, { Fragment } from 'react';
import { useCurrentUser } from '../Hooks/useCurrentUser';

import styled from '../Theme/styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { reviewRequest } from '../Components/__generated__/reviewRequest';
import StatusBar from './StatusBar';

const REVIEW_REQUESTED = gql`
  query reviewRequest($query: String!) {
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

const RequestReviewWrapper = styled.div`
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

const RequestReviewList: React.FC = () => {
  const {
    user: { login }
  } = useCurrentUser();
  const { loading, data } = useQuery<reviewRequest>(REVIEW_REQUESTED, {
    variables: { query: `review-requested:${login} is:open`, suspend: true }
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
      <SectionHeadline>Review requested</SectionHeadline>
      {nodes.length === 0 ? (
        <span style={{ color: '#9b9b9b' }}>
          You have no assigned pull requests to review.
        </span>
      ) : (
        <RequestReviewWrapper>
          {nodes.map(node => {
            return (
              <div>
                {node.__typename === 'PullRequest' &&
                  node.mergeStateStatus !== 'UNKNOWN' && (
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
                      buttonIcon="stop-circle"
                      buttonText="Add review"
                    />
                  )}
              </div>
            );
          })}
        </RequestReviewWrapper>
      )}
    </ListWrapper>
  );
};

export default RequestReviewList;
