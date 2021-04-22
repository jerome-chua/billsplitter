import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Form({
  billId, setReqItems, addItem, addPerson, totalBill, setTotalBill,
}) {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [personName, setPersonName] = useState('');

  console.log('TOtal bill', totalBill);

  const handleItemChange = (e) => {
    setItemName(e.target.value);
  };

  const handlePriceChange = (e) => {
    console.log('Price', e.target.value);
    setPrice(e.target.value);
  };

  const itemData = {
    name: itemName,
    billId,
    price: Number(price),
  };

  const handleItemClick = () => {
    // Add to total billing.
    setTotalBill(totalBill + Number(price));

    // Send item in DB.
    axios.post('/item', { itemData })
      .then((res) => {
        addItem(res.data); // Send back to App level all items.
      })
      .catch((err) => {
        console.error('Itemclick errror: ', err);
      });
  };

  const handleNameChange = (e) => {
    setPersonName(e.target.value);
  };

  // Eventually associate this person /w bill ID.
  const personData = {
    name: personName,
    billId,
  };

  const handlePersonClick = () => {
    axios.post('/personname', { personData })
      .then((res) => {
        addPerson(res.data);
      })
      .catch((err) => {
        console.error('Personclick errror: ', err);
      });
  };

  const handleLastClick = () => {
    setReqItems(true);
  };

  return (
    <div>
      <h1 className="m-3">Item & Person Input</h1>
      <label className="mt-3">Insert Item Name</label>
      <input type="text" className="form-control my-2" onChange={handleItemChange} />

      <label>Insert Price</label>
      <input type="text" className="form-control my-2" onChange={handlePriceChange} />
      <button type="submit" className="btn btn-warning my-1" onClick={handleItemClick}>Submit</button>
      <br />
      <hr />

      <label>Name of Person</label>
      <input type="text" className="form-control my-2" onChange={handleNameChange} />
      <button type="submit" className="btn btn-warning my-1" onClick={handlePersonClick}>Submit</button>

      <br />

      <button type="submit" className="btn btn-md btn-primary my-2 float-end" onClick={handleLastClick}>Get Items List</button>

    </div>
  );
}
