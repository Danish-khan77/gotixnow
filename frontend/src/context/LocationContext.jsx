import { createContext, useState } from "react";

export const LocationContext = createContext();

const mpDistricts = [
  "Agar Malwa",
  "Alirajpur",
  "Anuppur",
  "Ashoknagar",
  "Balaghat",
  "Barwani",
  "Betul",
  "Bhind",
  "Bhopal",
  "Burhanpur",
  "Chhatarpur",
  "Chhindwara",
  "Damoh",
  "Datia",
  "Dewas",
  "Dhar",
  "Dindori",
  "Guna",
  "Gwalior",
  "Harda",
  "Indore",
  "Jabalpur",
  "Jhabua",
  "Katni",
  "Khandwa",
  "Khargone",
  "Maihar",
  "Mandla",
  "Mandsaur",
  "Morena",
  "Narmadapuram",
  "Narsinghpur",
  "Neemuch",
  "Niwari",
  "Panna",
  "Raisen",
  "Rajgarh",
  "Ratlam",
  "Rewa",
  "Sagar",
  "Satna",
  "Sehore",
  "Seoni",
  "Shahdol",
  "Shajapur",
  "Sheopur",
  "Shivpuri",
  "Sidhi",
  "Singrauli",
  "Tikamgarh",
  "Ujjain",
  "Umaria",
  "Vidisha",
].sort();

export const LocationProvider = ({ children }) => {
  // ✅ Always start empty
  const [location, setLocation] = useState("");

  return (
    <LocationContext.Provider
      value={{
        districts: mpDistricts,
        location,
        setLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
