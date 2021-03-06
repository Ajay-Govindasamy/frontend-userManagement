import React from 'react';

//Check Form fields
const FormErrors = ({ formErrors }) => (
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={i}>
            {fieldName} {formErrors[fieldName]}
          </p>
        );
      } else {
        return '';
      }
    })}
  </div>
);

export default FormErrors;
