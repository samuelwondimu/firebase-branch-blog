import React from "react";
import { MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

type Option = {
  label: string;
  value: any;
};

interface SelectFormProps {
  control: any;
  defaultValue?: any;
  name: string;
  placeholder: string;
  options: Option[];
}

export const SelectForm: React.FC<SelectFormProps> = ({
  options,
  placeholder,
  control,
  defaultValue,
  name,
}) => {
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <Select
          defaultValue={placeholder}
          value={value}
          onChange={onChange}
          fullWidth
        >
          {options.map((option) => {
            return (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
        </Select>
      )}
      control={control}
      name={name}
      defaultValue={defaultValue}
    />
  );
};

