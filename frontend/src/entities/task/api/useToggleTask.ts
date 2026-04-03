import { useMutation } from '@apollo/client/react';
import { TOGGLE_TASK } from './mutations';
import { GET_TASKS } from './queries';
import type { ToggleTaskResponse, ToggleTaskVariables } from '../model/types';

export const useToggleTask = () => {
  return useMutation<ToggleTaskResponse, ToggleTaskVariables>(TOGGLE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });
};