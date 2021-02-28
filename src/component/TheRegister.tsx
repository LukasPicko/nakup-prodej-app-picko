import React, {useState} from 'react';
import TheSetting from './TheSetting';
import TheFilter from './TheFilter';
import RegisterList from './RegisterList';



const purchases = [
  {
  "id": "001",
  "type": "Pronájem",
  "name": "prvnijmeno",
  "price": 10,
  },
  {
  "id": "002",
  "type": "Nákup",
  "name": "druhejmeno",
  "price": 100,
  },
  {
  "id": "003",
  "type": "Pronájem",
  "name": "tretijmeno",
  "price": 1000,
  },
]

interface Props {
  showFilter: boolean;
}

const TheRegister: React.FC<Props> = (Props) => {
  const [data, setData] = useState(purchases);

 

    return (
      <div>
      {Props.showFilter && <TheFilter/>}
          <RegisterList data={data} setData={setData}/>
      </div>
    );
  }
  
  export default TheRegister;