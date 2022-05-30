import React from 'react';

export default function PurchaseList({ purchases }) {
  return (
    <div>
      {
        purchases ? purchases.map(() => (
          <div>
            1
          </div>
        ))
          : null
      }
    </div>
  );
}
