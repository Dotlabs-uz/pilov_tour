"use client";

import { ChangeEventHandler } from "react";
import { Input } from "../ui/input";

interface AuthInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  className: string;
  placeholder: string;
  type: string;
}

const AuthInput = ({
  value,
  onChange,
  name,
  className,
  placeholder,
  type,
}: AuthInputProps) => {
  return (
    <>
      <div>
        <Input
          value={value}
          name={name}
          onChange={onChange}
          className={className}
          placeholder={placeholder}
          type={type}
        />
      </div>
    </>
  );
};

export default AuthInput;
