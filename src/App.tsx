import React from 'react';
import { Switch, Route } from 'react-router-dom'
import TheNavigation from './component/TheNavigation';
import './App.css';
import TheRegister from './component/TheRegister';
import TheSummary from './component/TheSummary';




const App: React.FC = () => {

  
  return (
    <div>
      <header>
          <TheNavigation/>
          <h1>NÁKUPY A PRONÁJMY</h1>
          
      </header>
		  <main>
        <Switch>
					<Route path="/" component={TheRegister} exact />
					<Route path="/summary" component={TheSummary} />
				</Switch>
		  </main>
    </div>
	)
}

export default App