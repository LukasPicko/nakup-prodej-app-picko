import React, {useEffect} from 'react';
import {Form, Input, Button, Select, Typography} from 'antd';
import _ from 'lodash';
import { FilterValuesProps } from './../types/types';
import { FormattedMessage, useIntl, injectIntl } from "react-intl";
import 'antd/dist/antd.css';
const { Option } = Select;
const {Text} = Typography;

const TheFilter: React.FC<FilterValuesProps> = (props) => {
        const intl = useIntl();
    useEffect(() => {
    
    }, [props.filterType, props.filterName]);

    const handleChangeFilterType = (value:string) => {
        props.setFilterType(value);
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
                      
                      value={props.filterName}
                      onChange={(e: React.FormEvent<HTMLInputElement>) => props.setFilterName(e.currentTarget.value)}
                      style={{
                          width: 150,
                          marginRight:0,
                        }}
                        placeholder={intl.formatMessage({
                                id: "filtrmName",
                                defaultMessage: "Název položky",
                                description: "filtr name",
                              })}
                        aria-autocomplete='inline'
                  />
                 </Form.Item>
                 <Button 
                        size='small' 
                        icon="sort-ascending"
                        onClick={() => handleChangeSorting('name', 'asc')}
                />
                <Button 
                        size='small' 
                        icon="sort-descending"
                        onClick={() => handleChangeSorting('name', 'desc')}
                />
                 
                 <Form.Item>
                  <Select id="filterType" defaultValue='#' style={{ width: 150 }} onChange={handleChangeFilterType}>
                      <Option value="#">
                              <FormattedMessage
                              id='filterSelectAll'
                              defaultMessage='Všechno'
                              description='filterSelectAll'
                              />
                              </Option>
                      <Option value="nakup">
                              <FormattedMessage
                              id='filterSelectPurchase'
                              defaultMessage='Nákup'
                              description='filterSelectPurchase'
                              
                              />
                              </Option>
                      <Option value="pronajem">
                              <FormattedMessage
                              id='filterSelectLease'
                              defaultMessage='Pronájem'
                              description='filterSelectLease'
                              />
                              </Option>
                      <Option value="zapujcka">
                              <FormattedMessage
                              id='filterSelectLoan'
                              defaultMessage='Zápůjčka'
                              description='filterSelectLoan'
                              />
                              </Option>
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
                <Text>
                        <FormattedMessage
                        id='filterTitlePrice'
                        defaultMessage='Cena'
                        description='filterTitlePrice'
                        
                        />
                        </Text>
                <Button 
                        size='small' 
                        icon="sort-ascending"
                        onClick={() => handleChangeSorting('price', 'asc')}
                        style={{marginLeft:0}}
                />
                <Button 
                        size='small' 
                        icon="sort-descending"
                        onClick={() => handleChangeSorting('price', 'desc')}
                        style={{marginLeft:0,
                        marginRight:30}}
                />
                <Text>
                        <FormattedMessage
                        id='filterTitleDateOfCOntract'
                        defaultMessage='Datum platnosti'
                        description='filterTitleDateOfCOntract'
                        
                        />
                        </Text>
                <Button 
                        size='small' 
                        icon="sort-ascending"
                        onClick={() => handleChangeSorting('dateOfAction', 'asc')}
                        style={{marginLeft:0}}
                />
                <Button 
                        size='small' 
                        icon="sort-descending"
                        onClick={() => handleChangeSorting('dateOfAction', 'desc')}
                        style={{marginLeft:0,
                        marginRight:30}}
                />
                <Text>
                        <FormattedMessage
                        id='filterTitleOfRegister'
                        defaultMessage='Datum registrace'
                        description='filterTitleOfRegister'
                        />
                        </Text>
                <Button 
                        size='small' 
                        icon="sort-ascending"
                        onClick={() => handleChangeSorting('dateOfRegister', 'asc')}
                        style={{marginLeft:0}}
                />
                <Button 
                        size='small' 
                        icon="sort-descending"
                        onClick={() => handleChangeSorting('dateOfRegister', 'desc')}
                        style={{marginLeft:0,
                        marginRight:30}}
                />


                  <Button style={{borderWidth:0}} onClick={handleEraseFilter}>X</Button>
            </Form>
        </div>
    );
  }
  
  export default TheFilter;