import React, {useState, useEffect} from 'react';
import { List, Typography, Avatar, Button } from 'antd';
import { CommonProps } from './../types/types';
import { useHistory } from "react-router-dom";
import _ from 'lodash';
import TheFilter from './TheFilter';
const { Title } = Typography;

var storedFilterName:string, storedFilterType:string, storedSorting: {item: string; direction: string;}[];
var stType = localStorage.getItem("storedFilterType");
var stName = localStorage.getItem("storedFilterName");
var stSort = localStorage.getItem('storedSorting');
storedFilterType = stType ? stType : '#';
storedFilterName = stName ? stName : '';
storedSorting = stSort ? JSON.parse(stSort) : [{item:'name', direction:'asc'}, {item:'type', direction:'asc'} ];

const filterResult = (data:{id: string; type: string; name: string; price: number;}[], filterName:string, filterType:string) => {
  if(!filterName&&filterType==='#'){return data}
  else if(!filterName){return filterTypeResult(data, filterType)}
  else if(filterType==='#'){return filterNameResult(data, filterName)}
  else {return filterNameResult(filterTypeResult(data, filterType), filterName)}
}

function filterNameResult(data:{id: string; type: string; name: string; price: number;}[], filterName:string):{id: string; type: string; name: string; price: number;}[]{
  return data.filter(item => item.name.includes(filterName))
}
function filterTypeResult(data:{id: string; type: string; name: string; price: number;}[], filterType:string):{id: string; type: string; name: string; price: number;}[]{
  return data.filter(item => item.type === filterType)
}

function sortDataToShow(data:{id: string; type: string; name: string; price: number;}[], sorting:{item: string; direction: string;}[]){
    return sorting[0].direction==='asc' ? _.orderBy(data, [sorting[0].item, sorting[1].item] , ['asc', 'asc']) : _.orderBy(data, [sorting[0].item, sorting[1].item] , ['desc', 'asc']);
}

const RegisterList: React.FC<CommonProps> = (Props) => {
    const[filterName, setFilterName] = useState(storedFilterName);
    const[filterType, setFilterType] = useState(storedFilterType);
    const[sorting, setSorting] = useState(storedSorting)
    const[dataToShow, setDataToShow] = useState(Props.data);
    const history = useHistory();


    useEffect(() => {
      setDataToShow(sortDataToShow  ((filterResult(Props.data, filterName, filterType )), sorting));
      localStorage.setItem('storedFilterType', filterType);
      localStorage.setItem('storedFilterName', filterName);
      localStorage.setItem('storedSorting', JSON.stringify(sorting));
      localStorage.setItem('storedData', JSON.stringify(Props.data));
    }, [filterType, filterName, sorting, Props.data]);

    
   

    function handleClickDeleteRecord(id:any){
          let objTemp:any={id: '', type: '', name: '', price: 0};
        if(Props.data!==undefined){objTemp = Props.data.filter(item => item.id !== id)}
        Props.setData(objTemp);
        }

        function editRecordForm(value:string){
          history.push('/'+ value)
        }

        
        return (
            <div className="demo-infinite-container">
              {Props.showFilter && <TheFilter 
                      filterName={filterName}
                       setFilterName={setFilterName} 
                       filterType={filterType} 
                       setFilterType={setFilterType}  
                       showFilter={Props.showFilter}  
                       setShowFilter={Props.setShowFilter}
                       sorting={sorting}
                       setSorting={setSorting}
              />}
                <List 
                  bordered
                  dataSource={dataToShow}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        avatar={
                          <Avatar icon={(item.type==='Nákup')?'dollar':'clock-circle'} size={55} style={{backgroundColor: '#FF9F33'}}/>
                        }
                        title={
                          <Title level={4} ><span onClick= {() => {editRecordForm(item.id)}}>{item.name}</span></Title>}
                        description={item.type}
                      />
                      <div>{item.price}{(item.type==='Nákup') ? ' Kč':'Kč/měsíc'}</div>
                      <Button onClick={()=>{handleClickDeleteRecord(item.id)}}>X</Button>
                    </List.Item>
                  )}
                > 
                </List>
            </div>
        );
      
}

export default RegisterList;

  