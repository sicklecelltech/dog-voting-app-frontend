import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "dotenv";
import DogInterface from "./DogInterface";
import getBreed from "../utils/getBreed";

export default function Main(): JSX.Element {
  const [dog1, setDog1] = useState<DogInterface>({ message: "", status: "" });
  const [dog2, setDog2] = useState<DogInterface>({ message: "", status: "" });

  let allBreeds = [];

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
    fetchDog1();
    fetchDog2();
  }, []);

  const handleVoteDog = (link:string) => {
    const breed = getBreed(link)
    
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
