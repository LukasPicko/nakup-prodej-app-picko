import React, {useState} from 'react';
import { Switch, Route } from 'react-router-dom'
import TheNavigation from './component/TheNavigation';
import './App.css';
import TheRegister from './component/TheRegister';
import TheSummary from './component/TheSummary';
import TheSetting from './component/TheSetting';




const App: React.FC = () => {
  
  const [showFilter, setShowFilter] = useState(false);
  
  return (
    <div>
      <header>
          <TheNavigation/>
          <h1>NÁKUPY A PRONÁJMY</h1>
          <TheSetting showFilter={showFilter} setShowFilter={setShowFilter}/>
      </header>
		  <main>
        <Switch>
					<Route path="/" component={TheRegister} exact>
                <TheRegister showFilter={showFilter}/>
          </Route>

					<Route path="/summary" component={TheSummary} />
				</Switch>
		  </main>
    </div>
	)
}

export default App