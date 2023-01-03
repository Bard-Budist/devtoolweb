export const initialState = {
    allNames: [] as string[]
};
export type ACTIONTYPE = { type: 'DEMO'; name: string };

const demoReducer = (state = { ...initialState }, action: ACTIONTYPE) => {
    switch (action.type) {
        case 'DEMO':
            return {
                allNames: state.allNames.concat(action.name)
            };
        default:
            return state;
    }
};

export default demoReducer;
