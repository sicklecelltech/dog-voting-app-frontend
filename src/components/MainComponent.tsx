import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "dotenv";
import DogInterface from "./DogInterface";

export default function Main(): JSX.Element {
  const [dog1, setDog1] = useState<DogInterface>({ message: "", status: "" });
  const [dog2, setDog2] = useState<DogInterface>({ message: "", status: "" });

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

  return (
    <>
      <img src={dog1.message} />
      <img src ={dog2.message} />
    </>
  );
}
