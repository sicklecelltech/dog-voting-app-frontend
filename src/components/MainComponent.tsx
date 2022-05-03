import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "dotenv";
import DogInterface from "./DogInterface";
import getBreed from "../utils/getBreed";

interface DataBaseDogs {
  id: number,
  dogbreed: string,
  vote: number,
  time: string
}

export default function Main(): JSX.Element {
  const [dog1, setDog1] = useState<DogInterface>({ message: "", status: "" });
  const [dog2, setDog2] = useState<DogInterface>({ message: "", status: "" });
  const [dataBaseDogs, setDataBaseDogs] = useState<DataBaseDogs[]>([])



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
      const data: DataBaseDogs[] = await axios.get('https://git.heroku.com/tichnozar-dog-voting-app.git/breeds')
      setDataBaseDogs(data)
    }
    fetchDog1();
    fetchDog2();
    getDataBaseDogs()
  }, []);

  const handleVoteDog = async (link:string) => {
    const breed = getBreed(link)
    if (checkDogInDataBaseDogs(breed)){
      await axios.put(`https://git.heroku.com/tichnozar-dog-voting-app.git/breeds/${id}`, {currentVote: 90})
    }
  }

  function checkDogInDataBaseDogs(breed: string){
    for (let dogObject of dataBaseDogs){
      if(dogObject.dogbreed === breed){
        return true
      }
    }
  }

  return (
    <>
    <div>
    <h3>Click on your favourite dog to vote!</h3>
      <img src={dog1.message} onClick={() => handleVoteDog(dog1.message)}/>
      <img src ={dog2.message} onClick={() => handleVoteDog(dog2.message)}/>
    </div>
    </>
  );
}
