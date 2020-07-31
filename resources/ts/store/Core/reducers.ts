import { CoreState, CoreActionTypes, CORE_CHANGE_USER, CORE_LOADING, CORE_ADD_SNACK, CORE_REMOVE_SNACK } from "./types";

const initialState: CoreState = {
    snacks: [],
    loading: false
};

export default (state=initialState, action: CoreActionTypes):CoreState=>{
    switch (action.type) {
        case CORE_CHANGE_USER:
            return {
                ...state,
                user: action.user
            };
        case CORE_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case CORE_ADD_SNACK:
            return {
                ...state,
                snacks: [...state.snacks, action.snack]
            };
        case CORE_REMOVE_SNACK:
            return {
                ...state,
                snacks: state.snacks.filter((snack,key)=>key!=action.snackKey)
            }
        default:
            return state;
    }
}
