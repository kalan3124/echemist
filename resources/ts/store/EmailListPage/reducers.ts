import { EmailListPageState,EmailListPageActions,EMAIL_LIST_PAGE_PLUS_EMAIL,EMAIL_LIST_PAGE_CHANGE_VALUES,EMAIL_LIST_PAGE_DROP_EMAIL } from "./types";

const initialState: EmailListPageState = {
    name:"",
    email:"",
    roll:{
        label: "Roll",
        value: 0
    },
    emails:{},
    lastId:-1
};

export default (state=initialState, action: EmailListPageActions): EmailListPageState=>{
    switch (action.type) {
        case EMAIL_LIST_PAGE_PLUS_EMAIL:
                return {
                    ...state,
                    emails: {
                        ...state.emails,
                        [state.lastId + 1]: {
                            name: action.name,
                            email: action.email,
                            roll: action.roll,
                            lastId: state.lastId + 1
                        }
                    },
                    lastId: state.lastId + 1
                };
        case EMAIL_LIST_PAGE_CHANGE_VALUES:
                return {
                    ...state,
                    emails: {
                        ...state.emails,
                        [action.lastId]: {
                            name: action.name,
                            email: action.email,
                            roll: action.roll,
                            lastId: action.lastId
                        }
                    },
                };
        case EMAIL_LIST_PAGE_DROP_EMAIL:
            let dropPro = {...state.emails};
            delete dropPro[action.lastId];
                return {
                    ...state,
                    emails:dropPro
                };
        default:
            return state;
    }
}
