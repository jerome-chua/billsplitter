import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Intro from './components/Intro.jsx';
import Form from './components/Form.jsx';
import Bill from './components/Bill.jsx';

export default function App() {
  const [billSubmit, setBillSubmit] = useState(false);
  const [reqItems, setReqItems] = useState(false);
  const [billId, setBillId] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [selectItemIdx, setSelectItemIdx] = useState();
  const [people, setPeople] = useState([]);

  const addItem = (newItem) => {
    setItemList([...itemList, newItem]);
  };

  const addPerson = (newPerson) => {
    setPeople([...people, newPerson]);
  };

  const chooseItemIdx = (itemIdx) => {
    setSelectItemIdx(itemIdx);
  };

  const selectedItem = itemList[selectItemIdx];

  console.log('itemList: \n----\n', itemList);
  console.log('peoplelist: \n----\n', people);

  return (
    <div className="container w-75 mb-5">
      <div className="row">
        <div className="col-12">
          {billSubmit ? <Form billId={billId} setReqItems={setReqItems} addItem={addItem} addPerson={addPerson} /> : <Intro setBillSubmit={setBillSubmit} setBillId={setBillId} />}
        </div>
        <div className="col-12">
          {reqItems ? <Bill billId={billId} setReqItems={setReqItems} itemList={itemList} chooseItemIdx={chooseItemIdx} selectedItem={selectedItem} people={people} /> : null}
        </div>
      </div>
    </div>
  );
}
