import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import type { Task } from '../model/types';

const GET_TASKS = gql`
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

type GetTasksResponse = {
  tasks: Task[];
};

export const useTasks = () => {
  return useQuery<GetTasksResponse>(GET_TASKS);
};
