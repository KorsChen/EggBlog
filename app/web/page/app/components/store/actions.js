import { LOGIN } from './constant';

// export const add = item => {
//   console.log('item', item);
//   return {
//     type: ADD,
//     item
//   };
// };

// export const del = id => {
//   return {
//     type: DEL,
//     id
//   };
// };

export const login = id => {
  return {
    type: LOGIN,
    id
  };
};

