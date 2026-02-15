import { capitalizeString } from "~/utils/capitalize-string";

/**
 * Usually this would come from an env variable, but for ease of use I am simply hardcoding the
 * public url here.
 */
const baseUrl = "https://dog.ceo/api";

type GetDogBreedListResponse = { label: string; value: string }[];
type GetRandomDogBreedImagesResponse = string[];

export async function getDogBreedList(): Promise<GetDogBreedListResponse> {
  const response = await fetch(`${baseUrl}/breeds/list/all`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = (await response.json()) as { message: { [key: string]: string[] } };

  const breeds = Object.entries(data.message).reduce((allBreeds, [breed, subBreeds]) => {
    const label = capitalizeString(breed);
    allBreeds.push({ label, value: breed });

    if (subBreeds.length) {
      for (const subBreed of subBreeds) {
        const label = capitalizeString(`${subBreed} ${breed}`);
        allBreeds.push({ label, value: `${breed}/${subBreed}` });
      }
    }

    return allBreeds;
  }, [] as GetDogBreedListResponse);

  return breeds.sort((a, b) => a.value.localeCompare(b.value));
}

export async function getRandomDogBreedImages(
  breed: string,
): Promise<GetRandomDogBreedImagesResponse> {
  const response = await fetch(`${baseUrl}/breed/${breed}/images/random/3`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = (await response.json()) as { message: string[] };
  const images = data.message;

  return images;
}
