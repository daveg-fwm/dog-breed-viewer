import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { getDogBreedList } from "~/api/dog-breeds";
import { DogImages } from "~/components/section/DogImages";
import { HomeLoadingSkeleton } from "~/components/section/HomeLoadingSkeleton";
import { Button } from "~/components/ui/Button";
import { DogImage } from "~/components/ui/DogImage";
import type { Item } from "~/components/ui/SearchableDropdown";
import { SearchableDropdown } from "~/components/ui/SearchableDropdown";

import type { Route } from "./+types/home";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Dog Breed Viewer" },
    {
      name: "description",
      content: "Browse a list of dog breeds and view random images for a selected breed.",
    },
  ];
}

export default function Home() {
  const [selectedBreed, setSelectedBreed] = useState({ label: "", value: "" });

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["dogBreedList"],
    queryFn: getDogBreedList,
  });

  const onButtonClick = () => {
    refetch();
  };

  const updateSelectedItem = (item: Item) => {
    setSelectedBreed(item);
  };

  if (isPending) {
    return <HomeLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-gray-500">Apologies, we seem to be having some technical issues 🙈</p>
        <Button className="mx-auto mt-4 mb-6" onClick={onButtonClick}>
          Try again
        </Button>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <DogImage key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section>
      <SearchableDropdown
        label="Choose your favourite breed"
        items={data}
        selectedItem={selectedBreed}
        updateSelectedItem={updateSelectedItem}
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {selectedBreed.value ? (
          <DogImages selectedBreed={selectedBreed} />
        ) : (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <DogImage key={index} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
