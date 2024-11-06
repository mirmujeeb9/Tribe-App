import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext({} as any);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: any) => {
  const [signUpData, setSignUpData] = useState({
    phone: "",
    password: "",
    username: "",
    email: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    state: "",
    localGovernment: "",
    neighborhood: "",
    secondarySchool: "",
    schoolYear: "",
    university: "",
    universityYear: "",
    department: "",
    religion: "",
    reigionSpecific: "",
    politicalParty: "",
    sportsClub: "",
    ethnicTribe: "",
    occupation: "",
    imagesUri: [],
  });

  const [countryData, setCountryData] = useState<any>(null);

  const [feedId, setFeedId] = useState<number>(0);
  const [feedName, setFeedName] = useState<string>("");

  return (
    <GlobalContext.Provider
      value={{
        signUpData,
        setSignUpData,
        countryData,
        setCountryData,
        setFeedId,
        feedId,
        feedName,
        setFeedName,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
