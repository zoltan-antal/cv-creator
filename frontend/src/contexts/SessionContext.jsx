// /* eslint-disable react-refresh/only-export-components */
// import { createContext, useContext, useReducer } from 'react';

// const SessionContext = createContext(null);
// const SessionDispatchContext = createContext(null);

// export function SessionProvider({ children }) {
//   const [session, dispatch] = useReducer(sessionReducer, null);

//   return (
//     <SessionContext.Provider value={session}>
//       <SessionDispatchContext.Provider value={dispatch}>
//         {children}
//       </SessionDispatchContext.Provider>
//     </SessionContext.Provider>
//   );
// }

// export function useSession() {
//   return useContext(SessionContext);
// }

// export function useSessionDispatch() {
//   return useContext(SessionDispatchContext);
// }

// function sessionReducer(session, action) {
//   switch (action.type) {
//     case 'addToken': {
//       return { ...session, token: action.token };
//     }
//     case 'addUser': {
//       return { ...session, user: action.user };
//     }
//     default: {
//       throw Error('Unknown action: ' + action.type);
//     }
//   }
// }
