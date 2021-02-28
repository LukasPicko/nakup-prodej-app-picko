import React, {useState} from 'react';
import {Form, Input, Button, Select, Icon} from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;

const TheFilter: React.FC = () => {
    const [filterName, setFilterName] = useState('');
    const [filterType, setFilterType] = useState('');

    const handleChangeFilterType = (value:string) => {
        setFilterType(value);
      }
    // const handleChangeFilterName = (value: string) => {
    //     setFilterName(value);
    // }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        alert('name ' + filterName + ' type ' + filterType);

    }
    return (
        <div>
            <Form layout="inline" id="filter" 
              onSubmit={handleSubmit}
            >
                <Form.Item><p>Filtr:</p></Form.Item>
                        
                  <Form.Item>
                 <Input 
                      id="filterName"
                      name="filterName"
                      value={filterName}
                      onChange={(e: React.FormEvent<HTMLInputElement>) => setFilterName(e.currentTarget.value)}
                      style={{
                          width: 150,
                        }}
                        placeholder="Název položky"
                  />
                 </Form.Item>
                 <Form.Item>
                  <Select id="filterType" defaultValue="#" style={{ width: 150 }} onChange={handleChangeFilterType}>
                  <Option value="#"   disabled>Typ položky</Option>
                      <Option value="nakup">Nákup</Option>
                      <Option value="pronajem">Pronájem</Option>
                  </Select>
                  </Form.Item>
                  <Button htmlType="submit">X</Button>
            </Form>
        </div>
    );
  }
  
  export default TheFilter;