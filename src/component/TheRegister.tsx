import React from 'react';
import RegisterList from './RegisterList';
import {CommonProps} from '../types/types';



const TheRegister: React.FC<CommonProps> = (Props) => {
  
  
    return (
      <div>
          <RegisterList data={Props.data} setData={Props.setData} showFilter={Props.showFilter} setShowFilter={Props.setShowFilter}/>
      </div>
    );
  }
  
  export default TheRegister;