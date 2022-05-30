import React from 'react';
import PurchaseDetails from './PurchaseDetails';

export default function PurchaseList({ purchases }) {
  return (
    <div>
      {
        purchases ? purchases.map((purchase) => (
          <PurchaseDetails key={purchase.id} purchase={purchase} />
        ))
          : null
      }
    </div>
  );
}
