const intialState = 'Notification area'

const notificationReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'RESET_NOTIFICATION':
      return 'Notification area'
    default: 
      return state
  }
}

export const notificationChange = (notification, time) => {
  return async dispatch => {
    await dispatch({
        type: 'SET_NOTIFICATION',
        notification,
    })
    
    await setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION',
      })
    }, time * 1000)
  }
}


export default notificationReducer