import React, { useState } from 'react';
import axios from 'axios';

export default function Intro({ setBillSubmit, setBillId }) {
  const [billName, setbillName] = useState('Insert Bill Name Here');

  const handleChange = (evt) => {
    const userInput = evt.target.value;
    setbillName(userInput);
    console.log(userInput);
  };

  const handleClick = () => {
    console.log('Submit btn clicked!.');

    const billData = {
      name: billName,
      total: 0,
    };

    axios.post('/billname', { billData })
      .then((res) => {
        console.log('res sent back from post route', res);
        // Remove input & submit btn.
        if (res.data) {
          setBillId(res.data.id); // New Bill id.
          setBillSubmit(true);
        }
      })
      .catch((err) => {
        console.log('Error submitting bill name: ', err);
      });
  };

  return (
    <div>
      <h1 className="mt-5">Create Bill</h1>
      <input type="text" value={billName} className="form-control my-3" onChange={handleChange} />
      <button type="submit" className="btn btn-warning px-5" onClick={handleClick}>Submit</button>
    </div>
  );
}
