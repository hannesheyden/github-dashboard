/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: reviewRequest
// ====================================================

export interface reviewRequest_search_nodes_Issue {
  __typename: "Issue" | "Repository" | "User" | "Organization" | "MarketplaceListing";
}

export interface reviewRequest_search_nodes_PullRequest_author {
  __typename: "Organization" | "User" | "Bot";
  /**
   * A URL pointing to the actor's public avatar.
   */
  avatarUrl: any;
}

export interface reviewRequest_search_nodes_PullRequest_repository_owner {
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

export interface reviewRequest_search_nodes_PullRequest_repository {
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
  owner: reviewRequest_search_nodes_PullRequest_repository_owner;
}

export interface reviewRequest_search_nodes_PullRequest {
  __typename: "PullRequest";
  /**
   * Identifies the name of the base Ref associated with the pull request, even if the ref has been deleted.
   */
  baseRefName: string;
  /**
   * Identifies the name of the head Ref associated with the pull request, even if the ref has been deleted.
   */
  headRefName: string;
  /**
   * The HTTP URL for this pull request.
   */
  url: any;
  id: string;
  /**
   * Identifies the pull request title.
   */
  title: string;
  /**
   * The actor who authored the comment.
   */
  author: reviewRequest_search_nodes_PullRequest_author | null;
  /**
   * The repository associated with this node.
   */
  repository: reviewRequest_search_nodes_PullRequest_repository;
}

export type reviewRequest_search_nodes = reviewRequest_search_nodes_Issue | reviewRequest_search_nodes_PullRequest;

export interface reviewRequest_search {
  __typename: "SearchResultItemConnection";
  /**
   * A list of nodes.
   */
  nodes: (reviewRequest_search_nodes | null)[] | null;
}

export interface reviewRequest {
  /**
   * Perform a search across resources.
   */
  search: reviewRequest_search;
}

export interface reviewRequestVariables {
  query: string;
}
