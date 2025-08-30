import { configureStore } from '@reduxjs/toolkit';
import mobilMenueVisibleSlice from '../features/mobilMenu';
import AuthSlice from '../features/authentication';

const store = configureStore({
  reducer: {
    menuVisible: mobilMenueVisibleSlice,
    auth: AuthSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
