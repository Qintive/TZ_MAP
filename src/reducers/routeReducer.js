import { createSlice } from '@reduxjs/toolkit';
import routesData from '../data/routesData';

const initialState = {
  selectedRouteId: null,
  routes: [
    {
      id: 1,
      routeName: 'Маршрут №1',
      track: null,
    },
    {
      id: 2,
      routeName: 'Маршрут №2',
      track: null,
    },
    {
      id: 3,
      routeName: 'Маршрут №3',
      track: null,
    },
  ],
  track: null,
  trackError: null,
};

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    selectRoute: (state, action) => {
      state.selectedRouteId = action.payload;
      state.track = routesData[`route${action.payload}`];
      state.trackError = null;
    },

    setRouteTrack: (state, action) => {
      const { routeId, track } = action.payload;
      const routeToUpdate = state.routes.find((route) => route.id === routeId);
      routeToUpdate.track = track;
      state.track = track;
      state.trackError = null;
    },
    
    setRouteTrackError: (state, action) => {
      state.track = null;
      state.trackError = action.payload;
    },
  },
});

export const { selectRoute, setRouteTrack, setRouteTrackError } = routeSlice.actions;
export default routeSlice.reducer;