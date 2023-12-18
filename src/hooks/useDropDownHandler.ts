import { useState } from 'react';
import { UseFormSetValue, FieldValues } from 'react-hook-form';

const useDropDownHandler = (setValue: UseFormSetValue<FieldValues>) => {
  const [dropDownToggle, setDropDownToggle] = useState<boolean>(false);
  const [detailDropDownToggle, setDetailDropDownToggle] = useState(false);

  function dropDownToggleHandler(dropDownId: string) {
    if (dropDownId === 'processType') {
      setDropDownToggle(!dropDownToggle);
      setDetailDropDownToggle(false);
    } else {
      setDetailDropDownToggle(!detailDropDownToggle);
    }
  }

  function dropDownItemHandler(dropDownId: string, process: string) {
    if (dropDownId === 'processType') {
      setValue('processType', process);
      setValue('detailedProcessType', '');
      setDropDownToggle(!dropDownToggle);
    } else {
      setValue('detailedProcessType', process);
      setDetailDropDownToggle(!detailDropDownToggle);
    }
  }

  return {
    dropDownToggle,
    setDropDownToggle,
    detailDropDownToggle,
    setDetailDropDownToggle,
    dropDownToggleHandler,
    dropDownItemHandler,
  };
};

export default useDropDownHandler;
