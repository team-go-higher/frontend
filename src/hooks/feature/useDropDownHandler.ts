import { FormValuesType } from 'components/default/modal/ModalView';
import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

const useDropDownHandler = (
  setValue: UseFormSetValue<FormValuesType>,
  fieldName: keyof FormValuesType,
) => {
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
