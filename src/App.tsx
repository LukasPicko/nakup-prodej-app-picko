import React, {useState} from 'react';
import { Switch, Route } from 'react-router-dom'
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
    "type": "Pronájem",
    "name": "prvnijmeno",
    "price": 10,
    },
    {
    "id": "90e7c81e-ad7a-4f99-9ee6-f4a73182dc93",
    "type": "Nákup",
    "name": "druhejmeno",
    "price": 100,
    },
    {
    "id": "abee251c-78c8-4c0c-bf1c-a4c962e8b0de",
    "type": "Pronájem",
    "name": "tretijmeno",
    "price": 1000,
    },
  ]
}
const App: React.FC = () => {
  
  const [showFilter, setShowFilter] = useState(false);
  const [data, setData] = useState(purchases);
  return (
    <div>
      <header>
          <TheNavigation/>
          <h1>NÁKUPY A PRONÁJMY</h1>
          <TheSetting showFilter={showFilter} setShowFilter={setShowFilter} data={data} setData={setData}/>
      </header>
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