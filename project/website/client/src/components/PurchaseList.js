import React from 'react';
import PurchaseDetails from './PurchaseDetails';

export default function PurchaseList({ purchases }) {
  return (
    <div>
      {
        purchases ? purchases.map((purchase) => (
          <PurchaseDetails key={purchase.Id} purchase={purchase} />
        ))
          : null
      }
    </div>
  );
}
