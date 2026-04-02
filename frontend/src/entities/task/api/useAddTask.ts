import { useMutation } from '@apollo/client/react';
import { ADD_TASK } from './mutations';
import { GET_TASKS } from './queries';
import type { AddTaskResponse, AddTaskVariables } from '../model/types';

export const useAddTask = () => {
  return useMutation<AddTaskResponse, AddTaskVariables>(ADD_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });
};