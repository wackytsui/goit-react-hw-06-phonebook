// import { combineReducers } from 'redux';
// import { contactsReducer, filterReducer } from './reducers';
// import { configureStore } from '@reduxjs/toolkit';

// const rootReducer = combineReducers({
//     contacts: contactsReducer,
//     filter: filterReducer,
//   });

//   export const store = configureStore({
//     reducer: rootReducer,
//   });

import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from 'redux-persist';
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
  
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
         ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
       },
    }),
});

export const persistor = persistStore(store);