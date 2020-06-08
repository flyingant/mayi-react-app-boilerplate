import { MESSAGE } from './ActionTypes';

export function popupMessage(payload) {
  return {
    type: MESSAGE.POPUP_MESSAGE,
    payload,
  };
}

export function dismissMessage() {
  return {
    type: MESSAGE.DISMISS_MESSAGE,
  };
}

export default {
  popupMessage,
  dismissMessage,
};
