import React, { useState } from 'react';
import axios from 'axios';

export default function ItemList({
  billId, itemList, chooseItemIdx, selectedItem, people,
}) {
  const [selectedItemIdx, setSelectedItemIdx] = useState();
  const [diner, setDiner] = useState();
  const [itemPeople, setItemPeople] = useState({});

  const setItemSelect = (item, index) => {
    setSelectedItemIdx(index);
    chooseItemIdx(index);
  };

  const handleSelectChange = (evt) => {
    const selectedDiner = evt.target.value;
    setDiner(selectedDiner);
  };

  const getNames = () => {
    axios.get(`/names/${billId}`)
      .then((res) => {
        const names = res.data;
        return names;
      })
      .catch((err) => {
        console.err('Get names error: ', err);
      });
  };

  const handleAddPersonClick = () => {
    // Create an Object that stores the food items as keys, & people names as values.
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

  const associatedDiners = Object.entries(itemPeople)
    .filter(([key, _]) => selectedItem.name === key)
    .map(([_, dinersArr]) => (
      <div>
        {dinersArr.map((dinerName) => (
          <h6 key={dinerName.toString()}>
            {dinerName}
          </h6>
        ))}
      </div>
    ));

  const tabulateAmt = () => {
    const keys = itemList.map((item) => item.name);
    const len = Object.values(itemPeople).map((people) => people.length);
    const itemPrice = itemList.map((item) => Number(item.price));

    const tabulatedAmt = {};
    keys.forEach((key, arrIndex) => {
      tabulatedAmt[key] = parseFloat((itemPrice[arrIndex] / len[arrIndex]).toFixed(2));
    });

    const personAmtOwed = {};

    console.log('tabulatedAmt', tabulatedAmt);
    console.log('itemPeople', itemPeople);

    // If respective diners under item true, we add the tabulatedAmt (per item) to each diner.
    Object.entries(itemPeople).forEach(([item, people], index) => {
      people.forEach((person) => {
        if (!personAmtOwed[person]) {
          personAmtOwed[person] = 0;
        } else if (item === tabulatedAmt) {
          console.log('Akira');
        }
      });
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
                className={index === selectedItemIdx ? 'mx-1 mt-1 btn btn-success' : 'mx-1 mt-1 btn btn-outline-success'}
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
              <span className="text-success font-weight-bold">{ selectedItem ? selectedItem.name : <div /> }</span>
            </h5>
            {associatedDiners}
          </div>
        </div>
        <button type="submit" onClick={tabulateAmt} className="btn btn-sm btn-danger mt-3">
          Tabulate Amount Owed
        </button>
      </div>
    </div>
  );
}
