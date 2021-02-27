import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';



const TheNavigation: React.FC = () => {
  const [current, setCurrent] = useState('register');

  const handleClick = (event:any) => {setCurrent(event.key)}

    return (
       
          <Menu onClick={handleClick} mode="horizontal" selectedKeys={[current]}>
              <Menu.Item key='register'>
                 <NavLink to="/"  exact>
				            Přehled
			            </NavLink>
               </Menu.Item>
             <Menu.Item key='summary'>
			          <NavLink to="/summary" >
				            Sumář
			          </NavLink>
              </Menu.Item>
          </Menu>
    );
  }
  
  export default TheNavigation;