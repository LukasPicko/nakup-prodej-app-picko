import React, {useState} from 'react';
import { Switch, Route } from 'react-router-dom'
import TheNavigation from './component/TheNavigation';
import './App.css';
import TheRegister from './component/TheRegister';
import TheSummary from './component/TheSummary';
import TheSetting from './component/TheSetting';


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
				</Switch>
		  </main>
    </div>
	)
}

export default App