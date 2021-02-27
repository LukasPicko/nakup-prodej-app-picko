import React from 'react';
import {Card} from 'antd';



const TheSummary: React.FC = () => {
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