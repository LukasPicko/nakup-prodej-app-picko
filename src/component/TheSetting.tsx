import React, {useState} from 'react';
import {Form, Input, Button, Select, Icon} from 'antd';
import 'antd/dist/antd.css';


interface Props {
    showFilter: boolean;
    setShowFilter: (value: boolean | ((prevVar: boolean) => boolean)) => any;
}


const TheSetting: React.FC<Props> = (Props) => {
    const [changeIkon, setChangeIkon] = useState(true);

    const handleOnOffFilter = () => {
        setChangeIkon(!changeIkon);
        Props.setShowFilter(!Props.showFilter);
    }
    return (
      <div>
       
          
          <nav>
          {changeIkon && 
                    <Icon type="filter" 
                    onClick={handleOnOffFilter}
                    style={{fontSize: '2em',}}
                    />
                }
                {!changeIkon &&     
                    <Icon type="filter" theme="filled" 
                    onClick={handleOnOffFilter} 
                    style={{fontSize: '2em',
                    border: '1px' 
                    }}
                    />
                }
            <Button>Přidat</Button>{''}
            <Button>Cz</Button>
            <Button>En</Button>
          </nav>
       
      </div>
    );
  }
  
  export default TheSetting;