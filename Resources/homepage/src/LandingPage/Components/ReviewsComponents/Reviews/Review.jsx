import React from 'react';
import './Review.css';
function Review({review}) {
  console.log(review.image);
  return (
    <div className='review-div' >
      <div className='review-subdiv1'>
       {review.msg}
      </div>
      
      <div className='review-subdiv2'>
          <div className='review-img-background'>
            <img src={review.image.ReviewImage} alt="review img" className='review-img'/>
          </div>
          <div className='review-name'>
            <span className='review-span1'>{review.name}</span>
            <span className='review-span2'>{review.username}</span>
          </div>
      </div>
   </div>
  
  );
  
};

export default Review;
