import { USER_LOG_IN } from '../../ducks/user';

export default function update(state, action) {
  const newState = Object.assign({}, state);
  if (action.type === USER_LOG_IN) {
    newState.isLoggedIn = true;
  }
  return newState;
}
