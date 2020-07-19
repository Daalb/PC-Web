//Librerias
import React, { useState, useEffect } from 'react';
import {Switch, List, Button, Modal as ModalAntd, notification} from 'antd';
import { EditOutlined, DeleteOutlined }  from '@ant-design/icons';
import DragSortableList from 'react-drag-sortable';

//Componentes y Funciones
import Modal from '../../../Modal';
import { updateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

//Estilos
import './MenuWebList.scss';

const { confirm } = ModalAntd;

export default function MenuWebList(props){
  const { menu, setReloadMenuWeb } = props;
  const[listItems,setListItem] = useState([]);
  const[isVisibleModal,setIsVisibleModal] = useState(false);
  const[modalTitle,setModalTitle] = useState("");
  const[modalContent,setModalContent] =useState(null);
  
  useEffect(() =>{
    const listItemArray = [];
    menu.forEach(item => {
      listItemArray.push({
        content: (
         <MenuItem item={item} />
        )
      })
    });
    setListItem(listItemArray);
    
  },[menu])


  const onSort = (sortedList, dropEvent) => {
    const accessToken = getAccessTokenApi();

    sortedList.forEach(item => {
      const {_id} = item.content.props.item;
      const order = item.rank;
      updateMenuApi(accessToken,_id,{ order });

    })
  }

  return(
    <div className="menu-web-list">
      <div className="menu-web-list__header"> 
        <Button type="primary"> Menu menú </Button>
      </div>
      <div className="menu-web-list__items">
        <DragSortableList items={listItems} onSort={onSort} type="vertical"/>
      </div>
    </div>
  );
}


function MenuItem(props){
  const { item } = props;
  return(
    <List.Item 
      actions={[
        <Switch defaultChecked={item.active}/>,
        <Button type="primary">
          <EditOutlined />
        </Button>,
        <Button type="danger">
          <DeleteOutlined/>
        </Button>

      ]}>
      <List.Item.Meta title={item.title} description={item.url} />
    </List.Item>
  );
}