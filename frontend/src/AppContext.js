import React, { createContext, useState, useContext } from "react";

const AppContext = createContext('http://127.0.0.1:8000');

export const useAppContext = () => {
    return useContext(AppContext);
}