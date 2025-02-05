import React, { createContext, useState, useContext } from 'react';

const PromptContext = createContext();

export const PromptProvider = ({ children }) => {
    const [prompt, setPrompt] = useState('');

    return (
        <PromptContext.Provider value={{ prompt, setPrompt }}>
            {children}
        </PromptContext.Provider>
    );
};

export const usePrompt = () => {
    return useContext(PromptContext);
};