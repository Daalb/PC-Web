//Librerias
import React, { useState, useEffect } from 'react';
import {Switch, List, Button, Modal as ModalAntd, notification} from 'antd';
import { UserOutlined }  from '@ant-design/icons';
import DragSortableList from 'react-drag-sortable';

//Componentes y Funciones
import Modal from '../../../Modal';

//Estilos
import './MenuWebList.scss';

const { confirm } = ModalAntd;

export default function MenuWebList(props){
  const { menu, setReloadMenuWeb } = props;
  const[listItems,setListItem] = useState([]);
  const[isVisibleModal,setIsVisibleModal] = useState(false);
  const[modalTitle,setModalTitle] = useState("");
  const[modalContent,setModalContent] =useState(null);
  
  console.log(listItems);
  useEffect(() =>{
    const listItemArray = [];
    
    menu.forEach(item => {
      listItemArray.push({
        content: (
          <div><p>{item.title}</p></div>
        )
      })
    });
    setListItem(listItemArray);
    
  },[menu])


  const onSort = (sortedList, dropEvent) => {
    console.log(sortedList);
  }

  return(
    <div className="menu-web-list">
      <div className="mnu-web-list__header"> 
        <Button type="primary"> Menu menú </Button>
      </div>
      <div className="menu-web-list__items">
        <DragSortableList></DragSortableList>
      </div>
    </div>
  );
}