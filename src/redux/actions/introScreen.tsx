import { ActionTypes } from "../constants/action-types";

export const showIntroScreen = (message) => {
    return {
        type: ActionTypes.SET_INTRO_SCREEN,
        payload: message,
    }
};

export const hideIntroScreen = () => {
    return {
        type: ActionTypes.HIDE_INTRO_SCREEN,
        payload: null,
    }
}