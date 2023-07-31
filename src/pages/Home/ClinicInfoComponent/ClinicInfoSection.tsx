import React, { useEffect, useState } from "react";
import StarRating from "../StarRating";
import "./ClinicInfoSection.css";
import ContactInfo from "./ContacInfo";
import ClinicData from "./ClinicData";
import { ReactComponent as CloseIcon } from "../../../assets/icons/times-solid.svg";

interface ClinicInfoProps {
  name: string;
  rating: number;
  waitTime: number;
  travelTime: number;
  totalTime: number;
  email?: string;
  website?: string;
  phone?: string;
  address: string;
  location: Location;
  currLocation: Location;
  seedState?: number;
  isMobile?: boolean;
  setShowInfo: (arg0: boolean) => void
}
type Location = {
  lat: number;
  lng: number;
};

const ClinicInfoSection: React.FC<ClinicInfoProps> = ({
  name,
  waitTime,
  travelTime,
  totalTime,
  email,
  website,
  phone,
  address,
  rating,
  location,
  currLocation,
  seedState,
  isMobile = false,
  setShowInfo
}) => {
  const [focusData, setFocusData] = useState(true);
  const [hourly, setHourly] = useState(hourlyData())
  function hourlyData(){
    let test: any = []
    for(var i = 0; i < 5; i++){
      test.push(Math.floor(Math.random() * (60 - 15 + 1) + 15))
    }
    return test
  }

  useEffect(() => {
    setHourly(hourlyData)
    setFocusData(true)
  }, [seedState])
  
  return (
    <div className="info-section-container">
      {!isMobile ? null :<CloseIcon className="clinic-close-button" onClick={() => setShowInfo(false)}/>}
      <div className="clinic-info-heading">
        <h3 className="clinic-title">{name}</h3>
        <StarRating rating={rating} />
      </div>
      <div className="options">
        <div
          className={
            focusData ? "section-changer-left" : "section-changer-right"
          }
        >
          <div
            className={`section-changer-tail-end-right ${
              focusData ? "active" : ""
            }`}
          />
          <div
            className={`section-changer-tail-right ${
              focusData ? "active" : ""
            }`}
          />
          <div
            className={`section-curve-tail-right ${focusData ? "active" : ""}`}
          />
          <div
            className={` section-changer-tail-end-left ${
              focusData ? "" : "active"
            }`}
          />
          <div
            className={`section-changer-tail-left ${focusData ? "" : "active"}`}
          />
          <div
            className={`section-curve-tail-left ${focusData ? "" : "active"}`}
          />
        </div>
        <p
          style={
            focusData
              ? { marginLeft: "30px", color: "white" }
              : { marginLeft: "30px", color: "black" }
          }
          onClick={() => setFocusData(true)}
        >
          Real time data
        </p>
        <p
          style={
            focusData
              ? { marginRight: "30px", color: "black" }
              : { marginRight: "30px", color: "white" }
          }
          onClick={() => setFocusData(false)}
        >
          Contact information
        </p>
      </div>
      <div className="option-background">
        {focusData ? (
          <ClinicData
            waitTime={waitTime}
            travelTime={travelTime}
            totalTime={totalTime}
            currLocation={currLocation}
            location={location}
            hourlyData={hourly}
          />
        ) : (
          <ContactInfo
            email={email}
            website={website}
            phone={phone}
            address={address}
            
          />
        )}
      </div>
    </div>
  );
};
export default ClinicInfoSection;
