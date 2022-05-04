import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "dotenv";
import DogInterface from "./DogInterface";
import DataBaseDogs from "./DatabaseDogInterface";
import getBreed from "../utils/getBreed";

export default function Main(): JSX.Element {
  const [dog1, setDog1] = useState<DogInterface>({ message: "", status: "" });
  const [dog2, setDog2] = useState<DogInterface>({ message: "", status: "" });
  const [dataBaseDogs, setDataBaseDogs] = useState<DataBaseDogs[]>([]);
  const [id, setId] = useState<number>();
  const [toggle, setToggle] = useState<boolean>(false);
  const [vote, setVote] = useState<number>();

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
  }, [toggle]);

  const handleVoteDog = async (link: string) => {
    setToggle(!toggle);
    console.log(toggle);
    const breed = getBreed(link);
    if (checkDogInDataBaseDogs(breed)) {
      await axios.put(
        `https://git.heroku.com/tichnozar-dog-voting-app.git/breeds/${id}`,
        { currentVote: vote }
      );
      //discuss vote tomorrow morning
      // }else {
      //   await axios.post('https://git.heroku.com/tichnozar-dog-voting-app.git/breeds', {dogbreed: breed})
      // }
    }
  };

  console.log(dataBaseDogs);

  function checkDogInDataBaseDogs(breed: string) {
    for (const dogObject of dataBaseDogs) {
      if (dogObject.dogbreed === breed) {
        setId(dogObject.id);
        setVote(dogObject.vote);
        return true;
      }
    }
  }

  return (
    <>
      <div>
        <h3>Click on your favourite dog to vote!</h3>
        <img src={dog1.message} onClick={() => handleVoteDog(dog1.message)} />
        <img src={dog2.message} onClick={() => handleVoteDog(dog2.message)} />
      </div>
      <div>
        <h3>Leaderboard</h3>
          <table>
            {" "}
            <tr>
              <th>Dog Breed</th>
              <th>Vote</th>
            </tr>
        
            {dataBaseDogs.map((dog) => (
                <tr key={dog.id}>
              <td>{dog.dogbreed}</td>
              <td>{dog.vote}</td>
              </tr>
            ))}

          </table>
      </div>
    </>
  );
}
