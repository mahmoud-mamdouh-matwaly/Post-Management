import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    alert: {
      message: '',
      type: '',
    },
  },
  reducers: {
    showAlert: (state, action) => {
      state.alert = action.payload;
    },
    clearFirstAlertData: state => {
      state.alert = {
        message: '',
        type: '',
      };
    },
  },
});

const { actions, reducer } = uiSlice;

export const { showAlert, clearFirstAlertData } = actions;

export default reducer;
