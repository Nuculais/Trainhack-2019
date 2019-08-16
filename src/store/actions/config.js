export const SET_INTERCOM_APP_ID = 'CONFIG/SET_INTERCOM_APP_ID';

const setIntercomAppId = (intercomAppId) => ({
  type: SET_INTERCOM_APP_ID,
  payload: intercomAppId,
});

export {
  setIntercomAppId,
};
