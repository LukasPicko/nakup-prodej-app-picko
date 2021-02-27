import React, {useState} from 'react';
import { List, Typography, Avatar, Icon } from 'antd';
const { Title } = Typography;

const purchases = [
    {
    "id": "001",
    "type": "Pronájem",
    "name": "prvnijmeno",
    "price": 10
    },
    {
    "id": "002",
    "type": "Nákup",
    "name": "druhejmeno",
    "price": 100
    },
    {
    "id": "003",
    "type": "Pronájem",
    "name": "tretijmeno",
    "price": 1000
    }
]

const RegisterList: React.FC = () => {
    const [data, setData] = useState(purchases);

    
        return (
          <div className="demo-infinite-container">
           
              <List
                bordered
                dataSource={data}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={
                        <Avatar>
                            {(item.type=='Nákup')&&<Icon type="dollar" theme="twoTone"/>}
                            {(item.type=='Pronájem')&&<Icon type="clock-circle" theme="twoTone" />}
                        </Avatar>}
                      title={<Title level={4}>{item.name}</Title>}
                      description={item.type}
                    />
                    <div>{item.price} {(item.type=='Nákup') ? ' Kč':'Kč/měsíc'}</div>
                  </List.Item>
                )}
              > 
              </List>
          </div>
        );
      
}

export default RegisterList;

  