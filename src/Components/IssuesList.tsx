import React, { Fragment, useState } from 'react';
import { useCurrentUser } from '../Hooks/useCurrentUser';
import styled from '../Theme/styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { issueList } from '../Components/__generated__/issueList';
import ListItem from '../Components/Ui/ListItem';
import { IssueState } from '../../__generated__/globalTypes';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { text } from '@fortawesome/fontawesome-svg-core';

const ISSUES_LIST = gql`
  query issueList($query: String!) {
    search(query: $query, first: 50, type: ISSUE) {
      nodes {
        __typename
        ... on Issue {
          title
          url
          state
          createdAt
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

const IssueListWrapper = styled.div`
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

const IssueListItem = styled.div<{ state: IssueState }>`
  svg {
    color: ${props =>
      props.state === 'CLOSED'
        ? props.theme.colors.error
        : props.theme.colors.success};
  }
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.contrast};
  padding: 10px;
`;

const ViewIssueLink = styled.a`
  width: 100px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${props => props.theme.colors.black};

  &:hover {
    text-decoration: underline;
  }
`;

const SelectFilter = styled.select`
  background: none;
  border: none;
  font-size: 1rem;
  color: ${props => props.theme.colors.dark};
`;

const SearchInput = styled.input`
  height: 24px;
  font-size: 14px;
  border-radius: 4px;
  padding-left: 5px;
`;

const IssueList: React.FC = () => {
  const [isFilter, setIsFilter] = useState<string>('OPEN');
  const [textFilter, setTextFilter] = useState('');

  const {
    user: { login }
  } = useCurrentUser();
  const { loading, data } = useQuery<issueList>(ISSUES_LIST, {
    variables: {
      query: `is:issue author:${login} archived:false ${
        isFilter.length > 0
          ? isFilter === 'OPEN'
            ? 'is:open'
            : isFilter === 'CLOSED'
            ? 'is:closed'
            : ''
          : ''
      }`
    }
  });

  return (
    <ListWrapper>
      <SectionHeadline>Your issues</SectionHeadline>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 20px 0 0',
          marginBottom: '10px'
        }}
      >
        <SearchInput
          type="Text"
          placeholder="Filter title"
          onInput={e => setTextFilter(e.currentTarget.value)}
        />
        <SelectFilter
          value={isFilter}
          onChange={event => setIsFilter(event.target.value)}
        >
          <option value="">all</option>
          <option value="OPEN">open</option>
          <option value="CLOSED">close</option>
        </SelectFilter>
      </div>

      {loading ? (
        <span>Laden ...</span>
      ) : data.search.nodes.length === 0 ? (
        <span style={{ color: '#9b9b9b' }}>
          You have no {isFilter === 'OPEN' ? 'open' : 'closed'} issues.
        </span>
      ) : (
        <IssueListWrapper>
          {data.search.nodes
            .filter(node => {
              return (
                textFilter === '' ||
                (node.__typename === 'Issue' &&
                  node.title.toLowerCase().search(textFilter.toLowerCase()) !==
                    -1)
              );
            })
            .map(node => {
              return (
                <div>
                  {node.__typename === 'Issue' && (
                    <IssueListItem state={node.state}>
                      <FontAwesomeIcon
                        icon={['fas', 'exclamation-circle']}
                        size="2x"
                      />
                      <ListItem
                        title={node.title}
                        issueUrl={node.url}
                        avatarUrl={node.repository.owner.avatarUrl}
                        url={node.repository.url}
                        name={node.repository.name}
                      />
                      <ViewIssueLink href={node.url}>
                        <FontAwesomeIcon
                          icon={['fas', 'arrow-circle-right']}
                          size="1x"
                          style={{ color: '#9b9b9b', marginRight: '5px' }}
                        />
                        <span>View issue</span>
                      </ViewIssueLink>
                    </IssueListItem>
                  )}
                </div>
              );
            })}
        </IssueListWrapper>
      )}
    </ListWrapper>
  );
};

export default IssueList;
