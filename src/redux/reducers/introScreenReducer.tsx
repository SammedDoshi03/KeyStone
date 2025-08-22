import { ActionTypes } from '../constants/action-types';

const initialState = {
  isShow: true,
};

export const introScreenReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_INTRO_SCREEN:
      return state;

    case ActionTypes.HIDE_INTRO_SCREEN:
      if (state.isShow) {
        state.isShow = false;
        return state;
      }
    default:
      return state;
  }
};
