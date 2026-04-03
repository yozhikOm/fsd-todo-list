import { useMutation } from '@apollo/client/react';
import { EDIT_TASK } from './mutations';
import { GET_TASKS } from './queries';
import type { EditTaskResponse, EditTaskVariables } from '../model/types';

export const useEditTask = () => {
  return useMutation<EditTaskResponse, EditTaskVariables>(EDIT_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });
};