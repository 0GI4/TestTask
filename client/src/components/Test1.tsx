import React from "react";

type Props<T extends number> = {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
};

const Test1 = <T extends number>({ value, setValue }: Props<T>) => {
  const handleClick = () => {
    setValue((prev) => (prev + 1) as T);
  };

  return (
    <div>
      <div>value {value}</div>

      <button type="button" onClick={handleClick}>
        add value
      </button>
    </div>
  );
};

export default Test1;
