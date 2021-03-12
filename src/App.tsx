import React, {useState, useEffect} from 'react';
import { Switch, Route } from 'react-router-dom'
import { PageHeader } from 'antd';
import TheNavigation from './component/TheNavigation';
import './App.css';
import TheRegister from './component/TheRegister';
import TheSummary from './component/TheSummary';
import TheSetting from './component/TheSetting';
import UpdateForm from './component/UpdateForm';


var data = localStorage.getItem("storedData");
if (data) {
  var purchases = JSON.parse(data);
}
else {
  purchases = [
    {
    "id": "c6cc568e-4141-4aea-9273-a7849ab20776",
    "type": "pronajem",
    "name": "prvnijmeno",
    "price": 10,
    "currency" : 'CZK',
    "dateOfAction": '2021-03-08',
    "dateOfRegister": '2021-03-10',

    },
    {
    "id": "90e7c81e-ad7a-4f99-9ee6-f4a73182dc93",
    "type": "nakup",
    "name": "druhejmeno",
    "price": 100,
    "currency" : 'CZK',
    "dateOfAction": '2021-03-07',
    "dateOfRegister": '2021-03-11',
    },
    {
    "id": "abee251c-78c8-4c0c-bf1c-a4c962e8b0de",
    "type": "pronajem",
    "name": "tretijmeno",
    "price": 1000,
    "currency" : 'EUR',
    "dateOfAction": '2021-03-06',
    "dateOfRegister": '2021-03-12',
    },
  ]
}
const App: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [data, setData] = useState(purchases);

  // useEffect(() => {
  //   alert('jsem v App useeffectu')
  //   fetch('https://cors-anywhere.herokuapp.com/https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt',
  //   {
  //     //mode: 'no-cors',
  //     headers:{
  //       'Content-Type': 'text/plain;charset=UTF-8',
  //       'Access-Control-Allow-Origin': '*'
  //     }
  //   }
  //   )
  //   .then((r) => r.text())
  //   .then(text  => {
  //     console.log('fetch pokus')
  //     console.log('|=>'+text+'<=|');
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     alert('text CNB nefetchuju');

    
  // }) 
    
  // },[]);
  
  
  return (
    <div>
      <TheNavigation/>
      <PageHeader
        title="NÁKUPY A PRONÁJMY"
        extra={[
          <TheSetting showFilter={showFilter} setShowFilter={setShowFilter} data={data} setData={setData}/>
      ]}
    ></PageHeader>
		  <main>
        <Switch>
					<Route path="/" component={TheRegister} exact>
                <TheRegister showFilter={showFilter} setShowFilter={setShowFilter} data={data} setData={setData}/>
          </Route>

					<Route path="/summary" component={TheSummary} >
                <TheSummary data={data} setData={setData}/>
          </Route>
          <Route path="/:id" >
                <UpdateForm data={data} setData={setData}/>
          </Route>
				</Switch>
		  </main>
    </div>
	)
}

export default App