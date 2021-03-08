import React, {useEffect} from 'react';
import {Form, Input, Button, Select} from 'antd';
import _ from 'lodash';
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

    const handleChangeSorting = (property:string, howSort:string) =>{
        var objectTemp = _.clone(props.sorting)
        const objIndex = objectTemp.findIndex(obj => obj.item === property);
        objectTemp = objectTemp.splice(objIndex,1)
        objectTemp = [{item:property, direction:howSort}, ...objectTemp]
        props.setSorting(objectTemp);
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
                          marginRight:0,
                        }}
                        placeholder="Název položky"
                        aria-autocomplete='inline'
                  />
                 </Form.Item>
                 <Button 
                        size='small' 
                        icon="sort-ascending"
                        onClick={() => handleChangeSorting('name', 'asc')}
                        style={{marginLeft:0}}
                />
                <Button 
                        size='small' 
                        icon="sort-descending"
                        onClick={() => handleChangeSorting('name', 'desc')}
                        style={{marginLeft:0,
                        marginRight:30}}
                />
                 
                 <Form.Item>
                  <Select id="filterType"  style={{ width: 150 }} onChange={handleChangeFilterType}>
                      <Option value="#">Všechno</Option>
                      <Option value="nakup">Nákup</Option>
                      <Option value="pronajem">Pronájem</Option>
                  </Select>
                  </Form.Item>
                  <Button 
                        size='small' 
                        icon="sort-ascending"
                        onClick={() => handleChangeSorting('type', 'asc')}
                        style={{marginLeft:0}}
                />
                <Button 
                        size='small' 
                        icon="sort-descending"
                        onClick={() => handleChangeSorting('type', 'desc')}
                        style={{marginLeft:0,
                        marginRight:30}}
                />
                  <Button onClick={handleEraseFilter}>X</Button>
            </Form>
        </div>
    );
  }
  
  export default TheFilter;