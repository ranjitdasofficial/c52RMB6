import { configureStore } from '@reduxjs/toolkit'
import academicReducer from '../reducers/academicReducer'


export const store = configureStore({
  reducer: {
    AcademicSlice:academicReducer

  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch