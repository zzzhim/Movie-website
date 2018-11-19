const mutations = {
    SET_CARD: (state,  CardData ) => {
        state.CardData = CardData
    },
    SET_NavBar: (state, NavBar) => {
        state.NavBar = NavBar
    },
    SET_DATETIME: (state, dateTime) => {
        state.dateTime = dateTime
    }
}

export default mutations