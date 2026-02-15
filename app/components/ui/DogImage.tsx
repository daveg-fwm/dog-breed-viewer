import DogIllustration from "~/images/dog-illustration.svg?react";

type DogImageprops = {
  url?: string;
};

export function DogImage({ url }: DogImageprops) {
  return (
    <div className="mx-auto w-full rounded-xl border-2 border-dashed border-indigo-400 text-indigo-400">
      {url ? (
        <img className="text-indigo-400" src={url} />
      ) : (
        <div className="p-30">
          <DogIllustration />
        </div>
      )}
    </div>
  );
}
