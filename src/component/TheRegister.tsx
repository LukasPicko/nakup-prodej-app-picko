import React, {useState} from 'react';
import TheSetting from './TheSetting';
import TheFilter from './TheFilter';



const TheRegister: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);

  const purchases = [
    {
    "id": "001",
    "type": "pujcka",
    "name": "prvnijmeno",
    "price": 10
    },
    {
    "id": "002",
    "type": "prodej",
    "name": "druhejmeno",
    "price": 100
    },
    {
    "id": "003",
    "type": "pujcka",
    "name": "tretijmeno",
    "price": 1000
    }
]

    return (
      <div>
        <TheSetting showFilter={showFilter} setShowFilter={setShowFilter}/>
        
      {showFilter && <TheFilter/>}
        <ul>
          {purchases.map(purchases => (
             <li key={purchases.id}>
                {purchases.type}{' '}{purchases.name}{' '}{purchases.price}
             </li> 
          ))}
        </ul>
      </div>
    );
  }
  
  export default TheRegister;