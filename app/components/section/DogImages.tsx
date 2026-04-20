import { useEffect, useRef } from "react";

import { useQuery } from "@tanstack/react-query";

import { getRandomDogBreedImages } from "~/api/dog-breeds";
import { Button } from "~/components/ui/Button";
import { DogImage } from "~/components/ui/DogImage";
import Spinner from "~/images/spinner.svg?react";

type DogImagesProps = {
  selectedBreed: { label: string; value: string };
};

export function DogImages({ selectedBreed }: DogImagesProps) {
  const previousBreedRef = useRef("");

  useEffect(() => {
    previousBreedRef.current = selectedBreed.value;
  }, [selectedBreed]);

  const {
    data: images,
    isPending,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["randomDogBreedImages", selectedBreed.value],
    queryFn: () => getRandomDogBreedImages(selectedBreed.value),
    enabled: previousBreedRef.current !== selectedBreed.value,
  });

  const onButtonClick = () => {
    refetch();
  };

  if (isPending || isFetching) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <DogImage key={index} isLoading={isPending || isFetching} />
        ))}

        <div className="col-span-full mx-auto mt-8 h-10 w-10 animate-spin text-indigo-400">
          <Spinner />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="col-span-full mx-auto text-center">
          <p className="text-gray-500">Apologies, we seem to be having some technical issues 🙈</p>
          <Button className="mx-auto mt-4 mb-6" onClick={onButtonClick}>
            Try again
          </Button>
        </div>

        {Array.from({ length: 3 }).map((_, index) => (
          <DogImage key={index} />
        ))}
      </>
    );
  }

  return (
    <>
      <DogImage url={images[0]} />
      <DogImage url={images[1]} />
      <DogImage url={images[2]} />

      <Button className="col-span-full mx-auto mt-8" onClick={onButtonClick}>
        {`Find more photos of ${selectedBreed.label}s`}
      </Button>
    </>
  );
}
