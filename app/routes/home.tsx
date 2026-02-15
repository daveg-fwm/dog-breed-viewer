import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import type { Route } from "./+types/home";
import type { Item } from "~/components/ui/SearchableDropdown";

import { getDogBreedList } from "~/api/dog-breeds";

import { SearchableDropdown } from "~/components/ui/SearchableDropdown";
import { HomeLoadingSkeleton } from "~/components/section/HomeLoadingSkeleton";
import { DogImage } from "~/components/ui/DogImage";
import { DogImages } from "~/components/section/DogImages";

export function meta({}: Route.MetaArgs) {
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

  const { isPending, error, data } = useQuery({
    queryKey: ["dogBreedList"],
    queryFn: getDogBreedList,
  });

  const updateSelectedItem = (item: Item) => {
    setSelectedBreed(item);
  };

  if (isPending) return <HomeLoadingSkeleton />;

  if (error) return error.message;

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
          <DogImages selectedBreed={selectedBreed.value} />
        ) : (
          <>
            <DogImage />
            <DogImage />
            <DogImage />
          </>
        )}
      </div>
    </section>
  );
}
