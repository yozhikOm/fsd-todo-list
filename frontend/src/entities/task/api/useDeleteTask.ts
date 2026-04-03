import { useMutation } from '@apollo/client/react';
import { DELETE_TASK } from './mutations';
import { GET_TASKS } from './queries';
import type { DeleteTaskResponse, DeleteTaskVariables } from '../model/types';

export const useDeleteTask = () => {
  return useMutation<DeleteTaskResponse, DeleteTaskVariables>(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });
};