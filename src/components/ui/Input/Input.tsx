import { InputHTMLAttributes, ChangeEvent } from "react";

interface Props extends Omit<InputHTMLAttributes<any>, "onChange"> {
  className?: string;
  onChange?: (value: string) => void;
}

export default function Input({ className, onChange, ...rest }: Props) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
    return null;
  };

  return (
    <label>
      <input
        className={className}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        {...rest}
        onChange={handleOnChange}
      ></input>
    </label>
  );
}
