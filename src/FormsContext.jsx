import React, { createContext, useState } from "react";

const FormsContext = createContext();

const FormsProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        ontology: {},
        organism: {},
        publication: {},
        fasta: {},
        gff: {},
        additional: {
            annotation: {},
            sequence: {},
            publication: {},
            dbxref: {}
        },
        similarity: {}
    })
    
    const handleFormChange = (data) => {
        setFormData(data)
        console.log(formData)
    }

  return (
      <FormsContext.Provider 
        value={{ handleFormChange, formData }}>
          {children}
      </FormsContext.Provider>
  )
}

export { FormsContext, FormsProvider }