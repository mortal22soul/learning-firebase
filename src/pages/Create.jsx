import { doc, setDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [watched, setWatched] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a new movie object
    const newMovie = {
      title: title,
      year: parseInt(year),
      watched: watched,
      created: new Date(),
    };

    // Add the movie to the Firestore database
    try {
      await setDoc(doc(collection(db, "movies")), newMovie);
      console.log("Document successfully written!");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error writing document: ", error);
    }

    // Clear the form fields
    setTitle("");
    setYear("");
    setWatched(false);
  };

  return (
    <div className="flex items-center justify-center page create">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[50%] p-4 justify-center items-center space-y-8 bg-gray-200 border border-black rounded-xl">
        <div className="flex flex-col w-full ">
          <label htmlFor="title">Title:</label>
          <input
            className="w-full p-2 rounded-lg"
            type="text"
            id="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="year">Year:</label>
          <input
            className="w-full p-2 rounded-lg"
            type="number"
            id="year"
            value={year}
            required
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div className="flex w-full justify-evenly">
          Watched:
          <label htmlFor="watched-yes" className="flex items-center">
            <input
              type="radio"
              name="watched"
              id="watched-yes"
              value={true}
              checked={watched === true}
              onChange={() => setWatched(true)}
              className="w-full p-2 rounded-lg"
            />
            Yes
          </label>
          <label htmlFor="watched-no" className="flex items-center">
            <input
              type="radio"
              name="watched"
              id="watched-no"
              value={false}
              checked={watched === false}
              onChange={() => setWatched(false)}
              className="w-full p-2 rounded-lg"
            />
            No
          </label>
        </div>

        <button className="px-4 py-2 bg-green-400 rounded-xl" type="submit">
          Create Movie Card
        </button>

        {/* {formError && <p className="text-red-500 error">{formError}</p>} */}
      </form>
    </div>
  );
};

export default Create;
