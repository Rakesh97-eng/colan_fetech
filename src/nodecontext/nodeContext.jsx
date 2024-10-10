import { createContext, useState } from "react";


export const NodeContext = createContext();

export const NodeContextProvider = ({children})=>{
    const [inputvalue,setInputValue] = useState('');
    const [changeId,setChangeId] =useState('')

    const UpdateInput = (val,id)=>{
        setInputValue(val);
        setChangeId(id)
    }

    

    return<NodeContext.Provider value={{value:inputvalue,changeId,changeValue:UpdateInput}}>{children}</NodeContext.Provider>
}