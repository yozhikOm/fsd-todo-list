import { useQuery } from '@apollo/client/react';
import type { GetTasksResponse } from '../model/types';
import { GET_TASKS } from './queries';

export const useTasks = () => {
  return useQuery<GetTasksResponse>(GET_TASKS);
};
