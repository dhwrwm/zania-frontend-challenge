import classNames from "classnames";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const LazyImage = (props: React.HTMLProps<HTMLImageElement>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className="relative">
      <img
        alt={props.alt ?? ""}
        {...props}
        className={twMerge(
          classNames({
            "opacity-50 ": isLoading,
          }),
          props.className
        )}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && (
        <div
          className={twMerge(
            "absolute inset-0 flex items-center justify-center",
            props.className
          )}
        >
          <span className="loading loading-infinity loading-lg m-auto"></span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
