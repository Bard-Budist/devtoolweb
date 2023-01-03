import { combineReducers } from 'redux';
import { createSelectorHook } from 'react-redux';
import ableReducer, { initialState as AbleState } from './ableReducer';
import demoReducer, { initialState as DemoState } from './demoReducer';

const reducer = combineReducers({
    able: ableReducer,
    demo: demoReducer
});

export const useSelector = createSelectorHook<{
    able: typeof AbleState;
    demo: typeof DemoState;
}>();

export default reducer;
