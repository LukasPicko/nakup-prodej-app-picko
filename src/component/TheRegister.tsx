import React from 'react';
import TheFilter from './TheFilter';
import RegisterList from './RegisterList';
import {CommonProps} from '../types/types';



const TheRegister: React.FC<CommonProps> = (Props) => {
  
  
    return (
      <div>
      {Props.showFilter && <TheFilter/>}
          <RegisterList data={Props.data} setData={Props.setData}/>
      </div>
    );
  }
  
  export default TheRegister;