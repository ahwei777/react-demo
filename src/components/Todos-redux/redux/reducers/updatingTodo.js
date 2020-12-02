import { SET_UPDATING_TODO } from '../actionTypes';

const initialState = {
  id: '',
  value: '',
};

export default function updatingTodoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_UPDATING_TODO: {
      return {
        id: action.payload.id,
        value: action.payload.value,
      };
    }
    default: {
      return state;
    }
  }
}
