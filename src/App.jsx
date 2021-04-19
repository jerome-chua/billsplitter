import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Bill from './components/Bill.jsx';

export default function App() {
  return (
    <div>
      <Bill />
    </div>
  );
}
