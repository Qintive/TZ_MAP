// rootSaga.js
import { selectRouteThunk } from './routeSaga';

export default function* rootSaga() {
  yield [selectRouteThunk]; // Use selectRouteThunk instead of watchSelectRoute
}
