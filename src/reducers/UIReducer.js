/* eslint-disable no-case-declarations */
import Immutable from 'immutable';
import { UI, MESSAGE } from '../actions/ActionTypes';

const DEFAULT_UI_STATE = {
  loading: false,
  displayMessage: false,
  messageType: 'info',
  messageContent: 'Hello World!',
};

export default (state, action) => {
  const currentState = state || Immutable.fromJS(DEFAULT_UI_STATE);
  switch (action.type) {
    case UI.BUSY:
      return currentState.merge({ loading: true });
    case UI.BUSY_COMPLETED:
      return currentState.merge({ loading: false });
    case MESSAGE.POPUP_MESSAGE:
      const { content, messageType } = action.payload;
      return currentState.merge({
        displayMessage: true,
        messageType,
        messageContent: content,
      });
    case MESSAGE.DISMISS_MESSAGE:
      return currentState.merge({
        displayMessage: false,
        messageType: '',
        messageContent: '',
      });
    default:
      return currentState;
  }
};
