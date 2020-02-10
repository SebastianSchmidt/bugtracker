import React, { ReactChildren } from "react";
import "./Button.css";

type ButtonProps = {
  onClick?: (e: any) => void;
  variant?: "link" | "contained" | "outlined";
  children: ReactChildren | string;
};

const Button = ({ variant, ...props }: ButtonProps) => {
  if (!variant) {
    return <button {...props} />;
  }
  return <button className={variant} {...props} />;
};

export default Button;
