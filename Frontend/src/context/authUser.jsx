import { createContext, useState } from "react";

const cartContext = createContext();

const [data, setData] = useState([]);

<cartContext.Provider value={{ data, setData }}></cartContext.Provider>;
