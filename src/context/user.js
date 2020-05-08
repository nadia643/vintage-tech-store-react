// user context
import React, { createContext, useState} from "react";

const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({ username: null, token: null })
    return <UserContext.Provider value="user">
        { children }
    </UserContext.Provider>
}

export { UserProvider, UserContext };