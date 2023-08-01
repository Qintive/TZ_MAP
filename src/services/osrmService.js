import axios from 'axios';

const OSRM_API_URL = 'https://router.project-osrm.org/route/v1/{profile}/{coordinates}';

export async function fetchRouteTrack(points) {
  try {
    const coordinates = points.map((point) => [point.lng, point.lat]).join(';');
    const requestUrl = OSRM_API_URL.replace('{profile}', 'car').replace('{coordinates}', coordinates);
    const response = await axios.get(requestUrl);

    if (!points || !Array.isArray(points) || points.length === 0) {
      throw new Error('Некорректные координаты маршрута');
    }

    if (response.status === 200 && response.data.routes && response.data.routes.length > 0) {
      const route = response.data.routes[0];
      const trackCoordinates = route.geometry.coordinates.map(([lng, lat]) => ({ lat, lng }));
      return trackCoordinates;
    } else {
      throw new Error('Ошибка получения трека маршрута');
    }
  } catch (error) {
    throw new Error('Ошибка при обращении к API OSRM: ' + error.message);
  }
}