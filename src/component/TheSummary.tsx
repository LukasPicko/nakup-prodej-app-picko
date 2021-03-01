import React from 'react';
import {Card} from 'antd';


interface Props {
  data: {
    id: string;
    type: string;
    name: string;
    price: number;
}[],
setData: React.Dispatch<React.SetStateAction<{
    id: string;
    type: string;
    name: string;
    price: number;
}[]>>
}
const TheSummary: React.FC<Props> = () => {
    return (
      <Card title="Sumář">
        <Card type="inner" title="Nákupy">
          Inner Card content
        </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Pronájmy"
        >
          Inner Card content
        </Card>
  </Card>
    );
  }
  
  export default TheSummary;