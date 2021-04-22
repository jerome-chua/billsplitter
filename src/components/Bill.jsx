import React, { useState } from 'react';
import ItemList from './ItemList.jsx';
import PersonList from './PersonList.jsx';

export default function Bill({
  billId, setReqItems, itemList, chooseItemIdx, selectedItem, people, totalBill,
}) {
  const [amountsOwed, setAmountsOwed] = useState({});

  return (
    <div>
      <ItemList billId={billId} setReqItems={setReqItems} itemList={itemList} chooseItemIdx={chooseItemIdx} selectedItem={selectedItem} people={people} />
      <PersonList />
      <div>
        <h3 className="mt-5">
          Total Bill:
          $
          {totalBill}
        </h3>
      </div>
      <button className="mt-3 btn btn-success btn-lg w-100" type="submit">
        Save Bill
      </button>
    </div>
  );
}
