import React, { useState, useEffect } from 'react';

export default function MenuWebList(props){
    const { menu, setReloadMenuWeb } = props;
    console.log(menu);

    return(
      <div>
        <h1>MenuWebList</h1>
        {menu.map(item => (
            <p key={item._id}>{item.title}</p>
        ))}
      </div>
    );
}