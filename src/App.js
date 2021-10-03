import React, { useEffect, useState } from "react";
import './App.css';
import InfoBox from './InfoBoxes';
import Table from './Table';
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import LineGraph from "./LineGraph";
import { FormControl, MenuItem, Select, Card, CardContent } from "@material-ui/core";
import {sortData, prettyPrintStat } from './util';

function App() {

  const [countries, setCountries] = useState([]); //using hook usestate 
  const [country, setCountry] = useState("worldwide");  //all worldwide setting
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(()=>{  //this is done as we 1st load page no data comes as data comes only after selecting country so this is done to get all data at load of page
    fetch("https://disease.sh/v3/covid-19/all" )
    .then(response =>response.json())
    .then(data=>{
      setCountryInfo(data);
    });
  },[]);

  useEffect(() => {
    //code inside will run only once as we are adding []
    //async -> send request to server and wait for it and then do something with it
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries") //disease.sh website to get APIs -Use Effect hook can be used
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2 //UK,USA
            }));

            const sortedData = sortData(data); //sort util gives sorted list
            setCountries(countries);
            setMapCountries(data);
            setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async(e) => {  //onchange event handling event target value always gives value of clicked item
    const countryCode = e.target.value;
    console.log("Hello", countryCode);
    
    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then( data =>{
      setCountry(countryCode);
      //all data from country response
      setCountryInfo(data);
     
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });
    
  };

  return (
    <div className="app">
      {/*Header*/}
      {/*Title + input dropdown */}
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/*Loop through all contries and do dropdown */}
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        {/*INFO boxes -3*/}
        <div className="app_stats">
          {/* INFO box - coronavirus cases*/}
          <InfoBox onClick={(e) => setCasesType("cases")} 
          isRed
             active={casesType === "cases"} 
             title="Coronavirus Cases"  cases={prettyPrintStat(countryInfo.todayCases)} total={countryInfo.cases}/>
          <InfoBox  onClick={(e) => setCasesType("recovered")} 
           active={casesType === "recovered"}
           title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)}  total={countryInfo.recovered} />
          <InfoBox  onClick={(e) => setCasesType("deaths")} 
          isRed
           active={casesType === "deaths"}
           title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={countryInfo.deaths} />

        </div>
        
          <Map countries={mapCountries} casesType={casesType}
          center ={mapCenter} zoom ={mapZoom}/>
            {console.log(mapCenter)}
             {/*To print inside div*/}

      </div>
      <Card className="app__right">
        <CardContent>
            {/*TABLE */}
          <h2>Live cases by country</h2>
          <Table countries ={tableData}/>
            {/* GRAPH */}
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
            <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
