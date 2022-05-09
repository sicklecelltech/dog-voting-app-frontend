import { useState, useEffect } from "react";
import axios from "axios";
import DogInterface from "./DogInterface";
import DataBaseDogs from "./DatabaseDogInterface";
import getBreed from "../utils/getBreed";

export default function Main(): JSX.Element {
  const [dog1, setDog1] = useState<DogInterface>({ message: "", status: "" });
  const [dog2, setDog2] = useState<DogInterface>({ message: "", status: "" });
  const [dataBaseDogs, setDataBaseDogs] = useState<DataBaseDogs[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [userVote, setUserVote] = useState<number>(0);

  console.log("This is render:", Math.random())

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

  const leaderDogs = dataBaseDogs.slice(0, 3)
  console.log("These are the leaderdogs", leaderDogs)

  const leaderImageLinks: string[] = []

  async function getLink(dog: DataBaseDogs) {
    //console.log(dog)
    const breed = dog.dogbreed

    if (breed.includes("-")) {
      const urlBreed = breed.replace('-', '/')
      //leaderImageLinks.push(urlBreed)
      leaderImageLinks.push("test")
      const response = await fetch(`https://dog.ceo/api/breed/${urlBreed}/images/random`)
      const jsonBody: DogInterface = await response.json();
      //console.log(jsonBody.message)
      //leaderImageLinks.push(jsonBody.message)
    } else {
      //leaderImageLinks.push(breed)
      leaderImageLinks.push("test")
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      const jsonBody: DogInterface = await response.json();
      //console.log(jsonBody.message)
      //leaderImageLinks.push(jsonBody.message)


    }
  }

  for (const dog of leaderDogs) {
    getLink(dog)
    //console.log(leaderImageLinks)
  }

  // const arrayOfImageLinks = Promise.all([leaderDogs.map(async (dog) => {
  //   await getLink(dog)
  // })]);

  // (async () => { await arrayOfImageLinks() })()

  console.log("Leader", leaderImageLinks[0], leaderImageLinks[1], leaderImageLinks[2])

  return (
    <>
      <h1 className="main-title">🐶Your Favourite Dog App🐶</h1>
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
        <img src={leaderImageLinks[0]} alt="" />
        <p>{leaderImageLinks}</p>
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
