import React from 'react';
import { NavLink } from 'react-router-dom'



const TheNavigation: React.FC = () => {

    return (
      <div>
       
          
          <nav>
          <NavLink to="/"  exact>
				Přehled
			</NavLink>
			<NavLink to="/summary" >
				Sumář
			</NavLink>
          </nav>
       
      </div>
    );
  }
  
  export default TheNavigation;