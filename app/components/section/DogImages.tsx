import { useQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";

import { getRandomDogBreedImages } from "~/api/dog-breeds";

import { DogImage } from "~/components/ui/DogImage";

type DogImagesProps = {
  selectedBreed: string;
};

export function DogImages({ selectedBreed }: DogImagesProps) {
  const previousBreedRef = useRef("");

  useEffect(() => {
    previousBreedRef.current = selectedBreed;
  }, [selectedBreed]);

  const {
    data: images,
    isPending,
    error,
  } = useQuery({
    queryKey: ["randomDogBreedImages", selectedBreed],
    queryFn: () => getRandomDogBreedImages(selectedBreed),
    enabled: previousBreedRef.current !== selectedBreed,
  });

  if (isPending)
    return (
      <>
        <DogImage isLoading={isPending} />
        <DogImage isLoading={isPending} />
        <DogImage isLoading={isPending} />
      </>
    );

  if (error) return error.message;

  return images.map((image) => <DogImage key={image} url={image} />);
}
