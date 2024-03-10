function ReviewList({ reviews }) {
  return (
    <div className="review-list">
      <h3>Meal Reviews</h3>
      <ul>
        {reviews.map((review, index) => (
          <li key={index} className="review-item">
            <h4>{review.title}</h4>
            <p>Stars/Rating: {review.stars}</p>
            <p>{review.description}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewList;