import { USER_LOG_IN } from '../../ducks/user';

export default function update(state, action) {
  const newState = Object.assign({}, state);
  // if (action.type === ADD) {
  //   const list = Array.isArray(action.item) ? action.item : [action.item];
  //   newState.list = [...newState.list, ...list];
  //   console.log('-----', newState.list);
  // } else if (action.type === DEL) {
  //   newState.list = newState.list.filter(item => {
  //     return item.id !== action.id;
  //   });
  // } else if (action.type === LIST) {
  //   newState.list = action.list;
  // }
  if (action.type === USER_LOG_IN) {
    newState.isLoggedIn = true;
    console.log('state=======' + newState);
  }
  return newState;
}
