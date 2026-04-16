import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query {
    tasks {
      id
      title
      description
      completed
      priority
      date
    }
  }
`;

export const GET_TASKS_BY_COMPLITED = gql`
  query {
    tasksByCompleted(completed: true) {
      id
      title
      description
      completed
      priority
      date
    }
  }
`;

export const GET_TODAY_TASKS = gql`
  query {
    tasksToday {
      id
      title
      description
      completed
      priority
      date
    }
  }
`;
