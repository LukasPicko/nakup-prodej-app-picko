import React, {useState} from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.css';


interface Props {
    showFilter: boolean;
    setShowFilter: (value: boolean | ((prevVar: boolean) => boolean)) => any;
}


const TheSetting: React.FC<Props> = (Props) => {
    const [changeButton, setChangeButton] = useState(true);

    const handleOnOffFilter = () => {
        setChangeButton(!changeButton);
        Props.setShowFilter(!Props.showFilter)
    }
    return (
      <div>
          {changeButton && 
                    <Button onClick={handleOnOffFilter} type="primary" shape="circle" icon="filter" size='default' />
                }
                {!changeButton &&     
                    <Button onClick={handleOnOffFilter} type="default" shape="circle" icon="filter" size='default' />
                }
            <Button>Přidat</Button>{''}
            <Button>Cz</Button>
            <Button>En</Button>
      </div>
    );
  }
  
  export default TheSetting;