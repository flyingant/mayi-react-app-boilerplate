const createActionTypes = (args) => {
  const obj = {};
  let i = args.length;
  // eslint-disable-next-line no-plusplus
  while (i--) {
    obj[args[i]] = args[i];
  }
  return obj;
};

export const APP = createActionTypes(['INITIALIZE', 'INITIALIZE_COMPLETED']);

export const UI = createActionTypes(['BUSY', 'BUSY_COMPLETED']);

export const MESSAGE = createActionTypes(['POPUP_MESSAGE', 'DISMISS_MESSAGE']);

export const USER = createActionTypes(['AUTH_CHECK', 'LOGIN', 'LOGOUT', 'LOGIN_COMPLETED', 'LOGIN_FAILED', 'LOGOUT_COMPLETED']);
