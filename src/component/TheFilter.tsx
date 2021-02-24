import React, {useState, SyntheticEvent} from 'react';
import {Form, Input, Button, Select, Icon} from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;

const TheFilter: React.FC = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('#');

    interface ITestState {
        selectedValue: string;
    }

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        alert(name + '  ' + type);
    }

    
    return (
      <div>
          <Form layout="inline" onSubmitCapture={handleSubmit}>
                
          <Icon type="filter" 
                    style={{fontSize: 30,}}
                    />
               
                <Input 
                    id="type"
                    type="text"
                    value={name}
                    style={{
                        width: 100,
                      }}
                      onChange={(e: React.FormEvent<HTMLInputElement>)=>{setName(e.currentTarget.value)}}
                />
               
               <Input 
                    id="name"
                    type="text"
                    value={name}
                    style={{
                        width: 100,
                      }}
                      onChange={(e: React.FormEvent<HTMLInputElement>)=>{setName(e.currentTarget.value)}}
                />
                <Button htmlType="submit">Filtrovat</Button>
          </Form>
      </div>
    );
  }
  
  export default TheFilter;