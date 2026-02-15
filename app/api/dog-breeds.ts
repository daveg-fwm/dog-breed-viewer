/**
 * Usually this would come from an env variable, but for ease of use I am simply hardcoding the
 * public url here.
 */
const baseUrl = "https://dog.ceo/api/breeds";

export async function getDogBreedList() {
  const response = await fetch(`${baseUrl}/list/all`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const breeds = await response.json().then((data) => Object.keys(data.message));
  return breeds;
}
