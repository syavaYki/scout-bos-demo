/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthData } from '../types/AuthData';
import { getAuthDataClient } from '../api/authCheck';
import { getAccessLevel, getMaxCapibility } from '../utils/userManagmentHelper';
import { accessLocalStorage } from '../utils/accessLocalStorage';
import { LocalAccessKeys } from '../types/LocalAccessKeys';
import { HEADSHOOT_DEFAULT } from '../api/API_CONSTANTS';

const initialValue: AuthData = {
  loggedIn: accessLocalStorage.get(LocalAccessKeys.LOGGEDIN),
  accessLevel: undefined,
  user: undefined,
  loading: false,
  error: undefined,
};

export const init = createAsyncThunk('auth/fetch', () => {
  return getAuthDataClient();
});

const AuthSlice = createSlice({
  name: 'auth',
  initialState: initialValue,
  reducers: {
    unAuth: state => {
      accessLocalStorage.clearKey(LocalAccessKeys.LOGGEDIN);

      state.accessLevel = undefined;
      state.loggedIn = accessLocalStorage.get(LocalAccessKeys.LOGGEDIN);
      state.user = undefined;
      state.error = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      accessLocalStorage.set(
        LocalAccessKeys.LOGGEDIN,
        !!action.payload?.data?.viewer,
      );

      state.loading = false;

      const userData = action.payload.data?.viewer;

      state.loggedIn = accessLocalStorage.get(LocalAccessKeys.LOGGEDIN);

      let headshotLink = userData?.profileFields?.headshot?.node?.sourceUrl;

      if (!headshotLink) {
        headshotLink = HEADSHOOT_DEFAULT;
      }

      state.user = {
        ...userData?.profileFields,
        username: userData?.username,
        id: userData?.databaseId,
        email: userData?.email,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        headshot: headshotLink,
        roles:
          userData?.roles?.nodes.map(
            (role: { __typename: string; name: string }) => role.name,
          ) || [],
        maxCapabilities: getMaxCapibility(userData?.capabilities),
      };
      state.accessLevel = getAccessLevel(state.user?.roles);
    });

    builder.addCase(init.rejected, state => {
      state.error = 'Authentication error! ';
    });
  },
});

export default AuthSlice.reducer;
export const { actions } = AuthSlice;
