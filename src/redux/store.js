import {createStore} from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';

const reducer = {};
const initialState = {};
const enhancer = devToolsEnhancer();

export const store = createStore(reducer, initialState, enhancer);