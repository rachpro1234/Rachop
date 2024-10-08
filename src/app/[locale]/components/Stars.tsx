/* eslint-disable no-extra-boolean-cast */
import React, { useState } from "react";

interface propsType {
  currentRating: null | number;
}

const Stars: React.FC<propsType> = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [totalStars, setTotalStars] = useState(5);


  // this function could be used when willing to display more than 5 stars by passing to a label in an onChange event
    // const handleChange = (e) => {
    //   setTotalStars(parseInt(Boolean(e.target.value, 10) ? e.target.value : 5));
    // };

  return (
    <div className="app-star">
      {[...Array(totalStars)].map((star, index) => {
        // map through the stars and display each
        const currentRating: any = index + 1; // adding 1 to the current rating index
        // const starColor =
        //   currentRating > (hover || rating) ? "#e4e5e9" : "#F44336";
        return (
          <label key={index}>
            <input
              type="radio"
              key={star}
              name="rating"
              value={currentRating}
              onChange={() => setRating(currentRating)}
            />
            <span
              className="star"
              style={{
                color:
                  currentRating > (hover || rating) ? "#e4e5e9": "rgb(151, 79, 218)"
              }}
                onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
      <p className="rate-count dark:text-white">({rating})</p>
    </div>
  );
};

export default Stars;
