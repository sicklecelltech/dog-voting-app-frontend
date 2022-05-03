import { useState } from "react";
import axios from "axios"
import { config } from "dotenv";
import DogInterface from "./DogInterface";


export default function Main(): JSX.Element {
    const [dog, setDog] = useState<DogInterface>()

  return (
    <>
    </>
  );
}
