const intialState = 'Notification area'

const notificationReducer = (state = intialState, action) => {
  console.log('STATE', state)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default: 
      return state
  }
}

export const notificationChange = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export default notificationReducer