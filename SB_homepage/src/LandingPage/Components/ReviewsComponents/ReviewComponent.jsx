import React from 'react';
import './ReviewComponent.css';
import Review from './Reviews/Review';
import { reviews } from './Reviews/reviewArray.js';
function ReviewComponent() {
   let chunkedReviews = [];

   for (let i = 0; i < reviews.length; i += 4) {
    chunkedReviews.push(reviews.slice(i, i + 4));
  }
  
  // Rendering each chunk inside a div
  

  return (
    <div className='reviews'>
    
    <div className='review-line1-parent'>
      {chunkedReviews.map((subarray, index) => (
      <div key={index} className='review-line1'>
        {subarray.map((object, innerIndex) => (
          <Review key={innerIndex} review={object} />
        ))}
      </div>
      ))}
     </div>


     <div className='review-line2-parent'>
      {chunkedReviews.map((subarray, index) => (
      <div key={index} className='review-line2'>
        {subarray.map((object, innerIndex) => (
          <Review key={innerIndex} review={object} />
        ))}
      </div>
      ))}
     </div>
     
    </div>   

  );
};

export default ReviewComponent;
