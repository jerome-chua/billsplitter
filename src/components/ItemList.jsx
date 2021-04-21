import React, { useState } from 'react';
import axios from 'axios';

export default function ItemList({
  billId, itemList, chooseItemIdx, selectedItem, people,
}) {
  const [selectedItemIdx, setSelectedItemIdx] = useState();
  const [diner, setDiner] = useState();
  const [itemPeople, setItemPeople] = useState({
    // Key: Set items in itemList as keys.
    // Value: [] Create array & store people.
  });

  const setItemSelect = (item, index) => {
    setSelectedItemIdx(index);
    chooseItemIdx(index);
  };

  const handleSelectChange = (evt) => {
    const selectedDiner = evt.target.value;
    setDiner(selectedDiner);
  };

  const handleAddPersonClick = (e) => {
    if (Object.keys(itemPeople).length === 0) {
      itemList.forEach((item) => {
        itemPeople[item.name] = [];
      });
    }

    if (!itemPeople[selectedItem.name]) {
      itemPeople[selectedItem.name] = [];
    } else {
      itemPeople[selectedItem.name].push(diner);
    }

    setItemPeople({ ...itemPeople });
  };

  console.log('LOOOOOK HERE!!', itemPeople);

  const getNames = () => {
    axios.get(`/names/${billId}`)
      .then((res) => {
        console.log('FIND NAMES', res.data);
        const names = res.data;

        return names;
      })
      .catch((err) => {
        console.err('Get names error: ', err);
      });
  };

  return (
    <div>
      <hr />
      <h1 className="text-center">Item List</h1>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-3 mb-5">
            {itemList.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === selectedItemIdx ? 'mx-1 mt-1 btn btn-success' : 'mx-1 mt-1 btn btn-warning'}
                onClick={() => setItemSelect(item, index)}
              >
                {item.name}
              </button>
            ))}

          </div>
          <div className="col-6">
            <h3>Item Name</h3>
            <div>
              { selectedItem ? selectedItem.name : '--' }
            </div>
            <h3 className="mt-4">Diners</h3>
            <select className="form-control" onChange={handleSelectChange}>
              <option selected>Select Name</option>
              {people.map((person) => (
                <option>
                  {person.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <h3>Price</h3>
            <div>
              $
              { selectedItem ? selectedItem.price : 'N/A' }
            </div>
            <h3 className="mt-4" style={{ visibility: 'hidden' }}> NA</h3>
            <button className="btn btn-primary" onClick={handleAddPersonClick}> Add Person</button>
          </div>
        </div>
        <div className="mt-3 row">
          <div className="col">
            <h5 className="lead">
              All who ate
              {': '}
              <em>{ selectedItem ? selectedItem.name : <div /> }</em>
            </h5>
            {Object.entries(itemPeople).map(([key, val]) => (
              <div className="mt-3">
                <h6>{key}</h6>
                <p>{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
}
