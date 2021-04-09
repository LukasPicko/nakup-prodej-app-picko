import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { FormattedMessage } from "react-intl";



const TheNavigation: React.FC = () => {
  const [current, setCurrent] = useState('register');

  const handleClick = (event:any) => {setCurrent(event.key)}

    return (
       
          <Menu onClick={handleClick} mode="horizontal" selectedKeys={[current]}>
              <Menu.Item key='register'>
                 <NavLink to="/"  exact>
                   <FormattedMessage
                   id='navOverview'
                   defaultMessage='Přehled'
				            description='navOverview'
                    />
			            </NavLink>
               </Menu.Item>
             <Menu.Item key='summary'>
			          <NavLink to="/summary" >
                <FormattedMessage
                   id='navSummary'
                   defaultMessage='Sumář'
				            description='navSummary'
                    />
			          </NavLink>
              </Menu.Item>
          </Menu>
    );
  }
  
  export default TheNavigation;