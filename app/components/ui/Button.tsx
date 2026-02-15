import clsx from "clsx";

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
};

export function Button({ className, children, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        className,
        "rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
