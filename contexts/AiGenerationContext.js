import React, { createContext, useState, useContext } from 'react';

// Create the context
const AiGenerationContext = createContext();

// Create a provider component
export const AiGenerationProvider = ({ children }) => {
    const [generatedContent, setGeneratedContent] = useState(null);


    return (
        <AiGenerationContext.Provider value={{ generatedContent, setGeneratedContent }}>
            {children}
        </AiGenerationContext.Provider>
    );
};

export const useAiGeneration = () => {
    return useContext(AiGenerationContext);
};
