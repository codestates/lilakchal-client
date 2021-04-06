//ducks 패턴 참고: https://github.com/erikras/react-redux-universal-hot-example/tree/master/src/redux
import { createStore } from 'redux';
import rootReducer from './modules/reducer';

const store = createStore(rootReducer);

export default store;