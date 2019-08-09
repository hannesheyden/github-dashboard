/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MergeStateStatus } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: openPr
// ====================================================

export interface openPr_search_nodes_Issue {
  __typename: "Issue" | "Repository" | "User" | "Organization" | "MarketplaceListing";
}

export interface openPr_search_nodes_PullRequest_author {
  __typename: "Organization" | "User" | "Bot";
  /**
   * A URL pointing to the actor's public avatar.
   */
  avatarUrl: any;
}

export interface openPr_search_nodes_PullRequest_repository_owner {
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

export interface openPr_search_nodes_PullRequest_repository {
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
  owner: openPr_search_nodes_PullRequest_repository_owner;
}

export interface openPr_search_nodes_PullRequest {
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
   * Detailed information about the current pull request merge state status.
   */
  mergeStateStatus: MergeStateStatus;
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
  author: openPr_search_nodes_PullRequest_author | null;
  /**
   * The repository associated with this node.
   */
  repository: openPr_search_nodes_PullRequest_repository;
}

export type openPr_search_nodes = openPr_search_nodes_Issue | openPr_search_nodes_PullRequest;

export interface openPr_search {
  __typename: "SearchResultItemConnection";
  /**
   * A list of nodes.
   */
  nodes: (openPr_search_nodes | null)[] | null;
}

export interface openPr {
  /**
   * Perform a search across resources.
   */
  search: openPr_search;
}

export interface openPrVariables {
  query: string;
}
