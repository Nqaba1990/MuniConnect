import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [mfaRequired, setMfaRequired] = useState(false);

  const login = (username, password) => {
    // Temporary authentication.
    // This will be replaced by the Spring Boot API later.
    if (username && password) {
      setMfaRequired(true);
      return true;
    }

    return false;
  };

  const verifyMFA = (code) => {
    // Temporary MFA verification.
    // Real MFA will be handled by the backend.
    if (code === "123456") {
      setUser({
        id: 1,
        name: "Demo Resident",
        email: "resident@municonnect.co.za",
        role: "RESIDENT",
        municipalityId: 1,
      });

      setMfaRequired(false);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setMfaRequired(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        mfaRequired,
        login,
        verifyMFA,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}