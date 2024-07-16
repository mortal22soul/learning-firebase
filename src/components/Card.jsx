import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const Card = ({ movie }) => {
  const createdDate = movie.created.toDate(); // Convert Firestore timestamp to JavaScript Date

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "movies", id));
      console.log(`Deleted movie with id: ${id}`);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="flex flex-col p-4 mb-4 bg-gray-200 border-2 border-black rounded-lg">
      <span className="text-lg font-semibold">{movie.title}</span>
      <span>Timestamp: {createdDate.toDateString()}</span>
      <span>Watched: {movie.watched ? "Yes" : "No"}</span>
      <span>Year: {movie.year}</span>
      <div className="flex justify-end mt-2 space-x-2">
        <Link to={"/" + movie.id}>
          <i className="material-icons">edit</i>
        </Link>
        <button onClick={() => handleDelete(movie.id)}>
          <i className="material-icons">delete</i>
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    created: PropTypes.object.isRequired,
    // Update to object to accommodate Firestore timestamp
    watched: PropTypes.bool.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
