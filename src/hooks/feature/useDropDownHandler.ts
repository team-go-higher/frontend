import { useState } from 'react';
import { UseFormSetValue, FieldValues } from 'react-hook-form';

const useDropDownHandler = (setValue: UseFormSetValue<FieldValues>, fieldName: string) => {
  const [dropDownToggle, setDropDownToggle] = useState<boolean>(false);

  function dropDownToggleHandler() {
    setDropDownToggle(!dropDownToggle);
  }

  function dropDownItemHandler(process: string) {
    setValue(fieldName, process);
    setDropDownToggle(!dropDownToggle);
  }

  return {
    dropDownToggle,
    setDropDownToggle,
    dropDownToggleHandler,
    dropDownItemHandler,
  };
};

export default useDropDownHandler;
