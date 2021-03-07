import React, {useState, useEffect} from 'react';
import {Form, Input, Button, Select, Icon} from 'antd';
import { FilterValuesProps } from './../types/types';
import 'antd/dist/antd.css';
const { Option } = Select;

const TheFilter: React.FC<FilterValuesProps> = (props) => {

    useEffect(() => {
       console.log('filterType ' + props.filterType);
    
    }, [props.filterType, props.filterName]);

    const handleChangeFilterType = (value:string) => {
        props.setFilterType((value==='nakup')?'Nákup':(value==='pronajem')?'Pronájem':'#');
      }

   

    const handleEraseFilter = (event: any) => {
        event.preventDefault();
        props.setFilterName('');
        props.setFilterType('#');
        props.setShowFilter(!props.showFilter);

    }
    return (
        <div>
            <Form layout="inline" id="filter">
                <Form.Item><p>Filtr:</p></Form.Item>
                        
                  <Form.Item>
                  <Input 
                      id="adName"
                      name="addName"
                      value={props.filterName}
                      onChange={(e: React.FormEvent<HTMLInputElement>) => props.setFilterName(e.currentTarget.value)}
                      style={{
                          width: 150,
                        }}
                        placeholder="Název položky"
                        aria-autocomplete='inline'
                  />
                 </Form.Item>
                 <Button><Icon type="down" /></Button>
                 <Icon type="up" />
                 <Form.Item>
                  <Select id="filterType"  style={{ width: 150 }} onChange={handleChangeFilterType}>
                      <Option value="#">Všechno</Option>
                      <Option value="nakup">Nákup</Option>
                      <Option value="pronajem">Pronájem</Option>
                  </Select>
                  </Form.Item>
                  <Icon type="down" />
                 <Icon type="up" />
                  <Button onClick={handleEraseFilter}>X</Button>
            </Form>
        </div>
    );
  }
  
  export default TheFilter;