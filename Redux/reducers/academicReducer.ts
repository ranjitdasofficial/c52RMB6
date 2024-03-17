
import { createSlice } from "@reduxjs/toolkit";


interface InitialState {
  componentsInfo:{
    data:null|{
      name:string,
    description:string,
    value?:number,
    color?:string,
    enabled:boolean
    },
    open:boolean
  },

  data:{}
}

export const initialState: InitialState = {
 componentsInfo:{
    data:null,
    open:false
  
 },
 data:{}
};

const AcademicSlice = createSlice({
  name: "AcademicSlice",
  initialState: initialState,
  reducers: {
   
    setComponentsInfo: (state, action) => {
      state.componentsInfo = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    }



  },
});

export const {
  setComponentsInfo,
  setData
 
} = AcademicSlice.actions;
export default AcademicSlice.reducer;
