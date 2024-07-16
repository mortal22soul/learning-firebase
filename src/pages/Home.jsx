import { db } from "../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import Card from "../components/Card";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the collection reference
    const moviesCol = collection(db, "movies");

    // Set up a real-time listener
    const unsubscribe = onSnapshot(
      moviesCol,
      (snapshot) => {
        // Map through the snapshot docs to get the data and id
        const movieList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Update state with the new movie list
        setMovies(movieList);
      },
      (error) => {
        // Handle any errors
        setError(error.message);
      }
    );

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        <div className="grid grid-cols-4 gap-2">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie}></Card>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Home;
