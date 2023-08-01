import { setRouteTrack, setRouteTrackError } from '../reducers/routeReducer';
import { fetchRouteTrack } from '../services/osrmService';

export const selectRouteThunk = (routeId) => {
  return async (dispatch, getState) => {
    try {
      const selectedRoute = getState().route.routes.find((route) => route.id === routeId);

      if (!selectedRoute) {
        throw new Error('Маршрут не найден');
      }

      if (!selectedRoute.track) {
        throw new Error('Маршрут не содержит трек');
      }

      const track = await fetchRouteTrack(selectedRoute.track);
      dispatch(setRouteTrack({ routeId, track }));
    } catch (error) {
      dispatch(setRouteTrackError(error.message));
    }
  };
};