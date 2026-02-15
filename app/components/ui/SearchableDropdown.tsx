"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export type Item = { label: string; value: string };

type SearchableDropdownProps = {
  label: string;
  items: Item[];
  selectedItem: Item;
  updateSelectedItem: (item: Item) => void;
};

export function SearchableDropdown({
  label,
  items,
  selectedItem,
  updateSelectedItem,
}: SearchableDropdownProps) {
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      className="mx-auto max-w-[500px]"
      as="div"
      value={selectedItem}
      onChange={(item) => {
        if (!item) {
          return;
        }

        setQuery("");
        updateSelectedItem(item);
      }}
    >
      <Label className="block text-center text-sm/6 font-medium text-gray-600">{label}</Label>
      <div className="relative mt-2">
        <ComboboxInput
          className="block w-full rounded-md bg-white py-1.5 pr-12 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          displayValue={(selectedItem: Item) => selectedItem?.label}
          placeholder="Start typing or click the arrow for a full list"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery("")}
        />

        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden">
          <ChevronDownIcon className="size-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>

        <ComboboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {query.length > 0 && (
            <ComboboxOption
              value={{ id: null, name: query }}
              className="cursor-default px-3 py-2 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
            >
              {query}
            </ComboboxOption>
          )}

          {filteredItems.map((item) => (
            <ComboboxOption
              key={item.value}
              value={item}
              className="cursor-default px-3 py-2 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
            >
              <span className="block truncate">{item.label}</span>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}
