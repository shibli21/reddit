import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  posts: Array<Post>;
  getPost: GetPostResponse;
  subs: Array<Sub>;
  me?: Maybe<User>;
};


export type QueryGetPostArgs = {
  input: GetPostInputType;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Float'];
  identifier: Scalars['String'];
  body: Scalars['String'];
  username: Scalars['String'];
  user: User;
  post: Post;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  posts: Array<Post>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  title: Scalars['String'];
  identifier: Scalars['String'];
  slug: Scalars['String'];
  body: Scalars['String'];
  subName: Scalars['String'];
  user: User;
  sub: Sub;
  comments: Array<Comment>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Sub = {
  __typename?: 'Sub';
  id: Scalars['Float'];
  name: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  imageUrn: Scalars['String'];
  bannerUrn: Scalars['String'];
  user: User;
  posts?: Maybe<Array<Post>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type GetPostResponse = {
  __typename?: 'GetPostResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GetPostInputType = {
  slug: Scalars['String'];
  identifier: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  commentOnPost: Comment;
  createPost: Post;
  createSub: SubResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCommentOnPostArgs = {
  input: CommentOnPostInputType;
};


export type MutationCreatePostArgs = {
  input: PostInputType;
};


export type MutationCreateSubArgs = {
  input: SubInputType;
};


export type MutationRegisterArgs = {
  input: UserInputType;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type CommentOnPostInputType = {
  slug: Scalars['String'];
  identifier: Scalars['String'];
  body: Scalars['String'];
};

export type PostInputType = {
  title: Scalars['String'];
  body: Scalars['String'];
  subName: Scalars['String'];
};

export type SubResponse = {
  __typename?: 'SubResponse';
  errors?: Maybe<Array<FieldError>>;
  sub?: Maybe<Sub>;
};

export type SubInputType = {
  title: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserInputType = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);


export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;