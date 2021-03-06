import { useState, useEffect } from "react";
import axios from "axios";
import DogInterface from "./DogInterface";
import DataBaseDogs from "./DatabaseDogInterface";
import getBreed from "../utils/getBreed";
import audio from "../sounds/bite.mp3";

export default function Main(): JSX.Element {
  const [dog1, setDog1] = useState<DogInterface>({ message: "", status: "" });
  const [dog2, setDog2] = useState<DogInterface>({ message: "", status: "" });
  const [dataBaseDogs, setDataBaseDogs] = useState<DataBaseDogs[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [userVote, setUserVote] = useState<number>(0);

  const myAudio = new Audio(audio);

  useEffect(() => {
    const fetchDog1 = async () => {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const jsonBody: DogInterface = await response.json();
      setDog1(jsonBody);
    };
    const fetchDog2 = async () => {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const jsonBody: DogInterface = await response.json();
      setDog2(jsonBody);
    };
    const getDataBaseDogs = async () => {
      const response = await axios.get(
        "https://tichnozar-dog-voting-app.herokuapp.com/breeds"
      );
      setDataBaseDogs(response.data);
      console.log(dataBaseDogs);
    };
    fetchDog1();
    fetchDog2();
    getDataBaseDogs();
    // eslint-disable-next-line
  }, [toggle]);

  function checkDogInDataBaseDogs(breed: string) {
    for (const dogObject of dataBaseDogs) {
      if (dogObject.dogbreed === breed) {
        return true;
      }
    }
  }

  const handleVoteDog = async (link: string) => {
    myAudio.play();
    setToggle(!toggle);
    setUserVote(userVote + 1);
    const breed = getBreed(link);
    if (checkDogInDataBaseDogs(breed)) {
      const currentDog = dataBaseDogs.filter(
        (dog) => dog.dogbreed === breed
      )[0];
      await axios.put(
        `https://tichnozar-dog-voting-app.herokuapp.com/breeds/${currentDog.id}`,
        { currentVote: currentDog.vote }
      );
    } else {
      await axios.post(
        "https://tichnozar-dog-voting-app.herokuapp.com/breeds",
        { dogbreed: breed }
      );
    }
  };

  return (
    <>
      <h1 className="main-title">????Your Favourite Dog App????</h1>
      <h3 className="vote-prompt">Click on your favourite dog to vote!</h3>
      <div className="dogs-container">
        <img
          className="dog"
          src={dog1.message}
          onClick={() => handleVoteDog(dog1.message)}
          alt="doggie number 1"
        />
        <img
          className="dog"
          src={dog2.message}
          onClick={() => handleVoteDog(dog2.message)}
          alt="doggie number 2"
        />
      </div>
      <h3 className="leaderboard-title">Leaderboard</h3>
      <div className="leaderboard-container">
        <div>
          <p className="vote-counter">
            Number of votes you have cast:{" "}
            <p className="user-vote">{userVote}</p>
          </p>
        </div>
        <table>
          {" "}
          <tr>
            <th>Dog Breed</th>
            <th>Votes</th>
          </tr>
          {dataBaseDogs
            .map((dog) => (
              <tr key={dog.id}>
                <td>{dog.dogbreed}</td>
                <td>{dog.vote}</td>
              </tr>
            ))
            .slice(0, 9)}
        </table>
      </div>
    </>
  );
}
