import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    recovered: {
      hex: "#7dd71d",      
        half_op:  "rgba(204, 16, 52, 0.5)",
        multiplier: 200,
       rgb : 'red'
      },
  cases: {
    hex: "#CC1034",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 100,
    rgb: 'green'
  },

  deaths: {
    hex: "brown",
   half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 600,
    rgb: 'yellow'
  },
};

export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType ) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
      pathOptions={{color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex }}
       fillOpacity={0.4}
    > 
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
