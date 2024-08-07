import React from 'react'

const Select = ({resource, placeholder}) => {
  return (
    <>              
    <option value="">{placeholder}</option>
    {resource.map((type, index) => (
      <option key={index} value={type}>
        {type}
      </option>
    ))}
    </>
  )
}

export default Select