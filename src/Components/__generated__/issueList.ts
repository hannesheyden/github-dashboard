/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { IssueState } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: issueList
// ====================================================

export interface issueList_search_nodes_PullRequest {
  __typename: "PullRequest" | "Repository" | "User" | "Organization" | "MarketplaceListing";
}

export interface issueList_search_nodes_Issue_author {
  __typename: "Organization" | "User" | "Bot";
  /**
   * A URL pointing to the actor's public avatar.
   */
  avatarUrl: any;
}

export interface issueList_search_nodes_Issue_repository_owner {
  __typename: "Organization" | "User";
  /**
   * A URL pointing to the owner's public avatar.
   */
  avatarUrl: any;
  /**
   * The username used to login.
   */
  login: string;
}

export interface issueList_search_nodes_Issue_repository {
  __typename: "Repository";
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * The HTTP URL for this repository
   */
  url: any;
  /**
   * The User owner of the repository.
   */
  owner: issueList_search_nodes_Issue_repository_owner;
}

export interface issueList_search_nodes_Issue {
  __typename: "Issue";
  /**
   * Identifies the issue title.
   */
  title: string;
  /**
   * The HTTP URL for this issue
   */
  url: any;
  /**
   * Identifies the state of the issue.
   */
  state: IssueState;
  /**
   * Identifies the date and time when the object was created.
   */
  createdAt: any;
  /**
   * The actor who authored the comment.
   */
  author: issueList_search_nodes_Issue_author | null;
  /**
   * The repository associated with this node.
   */
  repository: issueList_search_nodes_Issue_repository;
}

export type issueList_search_nodes = issueList_search_nodes_PullRequest | issueList_search_nodes_Issue;

export interface issueList_search {
  __typename: "SearchResultItemConnection";
  /**
   * A list of nodes.
   */
  nodes: (issueList_search_nodes | null)[] | null;
}

export interface issueList {
  /**
   * Perform a search across resources.
   */
  search: issueList_search;
}

export interface issueListVariables {
  query: string;
}
