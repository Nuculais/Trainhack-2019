import {
  SET_INTERCOM_APP_ID,
} from '../actions';

const initialState = {
  intercomAppId: undefined,
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INTERCOM_APP_ID: return {
      ...state,
      intercomAppId: action.payload,
    };
    default: return state;
  }
};

export default configReducer;
