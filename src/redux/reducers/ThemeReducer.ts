const ThemeReducer = (state = {}, action: { type: any; payload: any }) => {
    switch(action.type) {
        case 'SET_MODE':
            return {
                ...state,
                mode: action.payload
            }
        case 'SET_COLOR':
            return {
                ...state,
                color: action.payload
            }
        default:
            return state
    }
}

export default ThemeReducer