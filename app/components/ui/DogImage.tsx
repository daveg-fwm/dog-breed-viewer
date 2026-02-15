import DogIllustration from "~/images/dog-illustration.svg?react";
import Spinner from "~/images/spinner.svg?react";

type DogImageprops = {
  url?: string;
  isLoading?: boolean;
};

export function DogImage({ url, isLoading }: DogImageprops) {
  return (
    <div className="mx-auto h-[400px] w-full overflow-hidden rounded-xl border-2 border-dashed border-indigo-400 text-indigo-400">
      {!url && isLoading ? (
        <div className="animate-spin p-40">
          <Spinner />
        </div>
      ) : null}

      {url ? (
        <img className="h-full w-full object-cover" src={url} />
      ) : (
        <div className="p-30">
          <DogIllustration />
        </div>
      )}
    </div>
  );
}
