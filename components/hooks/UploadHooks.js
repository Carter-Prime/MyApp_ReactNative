import {useState} from 'react';
import {validator} from '../../utils/validator';

const constraints = {
  Title: {
    presence: {
      message: 'cannot be empty',
    },
    length: {
      minimum: 3,
      message: 'min length is 3 characters',
    },
  },
  description: {
    length: {
      minimum: 5,
      message: 'min length is 5 characters',
    },
  },
};

const useUploadForm = (callback) => {
  const [uploadErrors, setUploadErrors] = useState({});
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });

  const handleInputChange = (name, text) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  const handleInputEnd = (name, text) => {
    if (text === '') {
      text = null;
    }
    const error = validator(name, text, constraints);

    setUploadErrors((uploadErrors) => {
      return {
        ...uploadErrors,
        [name]: error,
      };
    });
  };

  const validateOnSend = () => {
    const titleError = validator('title', inputs.title, constraints);
    const descriptionError = validator(
      'description',
      inputs.description,
      constraints
    );

    setUploadErrors((uploadErrors) => {
      return {
        ...uploadErrors,
        title: titleError,
        description: descriptionError,
      };
    });

    if (titleError !== null || descriptionError !== null) {
      return false;
    } else {
      return true;
    }
  };

  return {
    handleInputChange,
    inputs,
    handleInputEnd,
    validateOnSend,
    uploadErrors,
  };
};

export default useUploadForm;
