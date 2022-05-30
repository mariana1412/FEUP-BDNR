import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function PurchaseList({ name, type }) {
  const [purchases, setPurchases] = useState();

  useEffect(() => {
    console.log('efffffect');
    axios.get('http://localhost:3001/purchases/history', { params: { type, name } }).then(({ data }) => {
      console.log('REEE');
      setPurchases(data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    // axios.get(`${process.env.REACT_APP_BACKEND_SERVER}
    // /purchases/history`, { params: { type, name } }).then(({ data }) => {
    //   console.log(data);
    //   return (
    //     <div>
    //       meme
    //     </div>
    //   );
    // })
    <div>
      Products for {type} {name}:
      {
        purchases
      }
    </div>
  );
}
