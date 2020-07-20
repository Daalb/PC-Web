import React from 'react';
import { List, Card, Button, PageHeader} from 'antd';
import './Events.scss';

const data = [
    {
    title: 'Reunión 1',
    },
    {
    title: 'Reunión 2',
    },
    {
    title: 'Reunión 3',
    },
    {
    title: 'Reunión 4',
    },
  ];

export default function Events(){
    return(
      <main>
        <PageHeader
          title={
            "Registros de las reuniones realizadas"
          }
          extra={[
            <Button key="2" type="primary">Registrar Reunión</Button>,
            <Button key="1" type="primary">Editar Reunión</Button>,
          ]}
        />
        <div className="Grid">
          <List
              grid={{ gutter: 20, column: 4, justify: "center", align:"middle" }}
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 8,
                responsive: true,
              }}
              dataSource={data}
              renderItem={item => (
                  <List.Item>
                      <Card title={item.title}> 
                          <p>Descripcion de la Reunión</p>
                      </Card>
                  </List.Item>
              )}
            />
        </div>
      </main>  
    )
};