import React, {useState} from 'react';
import TheSetting from './TheSetting';
import TheFilter from './TheFilter';
import RegisterList from './RegisterList';



const TheRegister: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);

 

    return (
      <div>
        <TheSetting showFilter={showFilter} setShowFilter={setShowFilter}/>
        
      {showFilter && <TheFilter/>}
        <ul>
          {/* {purchases.map(purchases => (
             <li key={purchases.id}>
                {purchases.type}{' '}{purchases.name}{' '}{purchases.price}
             </li> 
          ))} */}
          <RegisterList/>
        </ul>
      </div>
    );
  }
  
  export default TheRegister;