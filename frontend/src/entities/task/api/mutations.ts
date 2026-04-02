import { gql } from '@apollo/client';

export const ADD_TASK = gql`
  mutation AddTask(
    $title: String!
    $description: String
    $priority: Int!
    $date: String
  ) {
    addTask(
      title: $title
      description: $description
      priority: $priority
      date: $date
    ) {
      id
      title
      description
      completed
      priority
      date
    }
  }
`;
