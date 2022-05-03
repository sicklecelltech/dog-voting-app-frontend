import getBreed from "./getBreed"

test("split https link to return the breed name", () => {
  expect(getBreed("https://images.dog.ceo/breeds/coonhound/n02089078_2478.jpg")).toBe("coonhound");
  expect(getBreed("https://images.dog.ceo/breeds/entlebucher/n02108000_171.jpg")).toBe("entlebucher");
  expect(getBreed("https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_1030.jpg")).toBe("terrier-yorkshire");
});
