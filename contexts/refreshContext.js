import React, { createContext, useState, useContext } from 'react';

const refreshContext = createContext();

export const RefreshProvider = ({ children }) => {
    const [refresh, setRefresh] = useState('');

    return (
        <refreshContext.Provider value={{ refresh, setRefresh }}>
            {children}
        </refreshContext.Provider>
    );
};

export const useRefresh = () => {
    return useContext(refreshContext);
};