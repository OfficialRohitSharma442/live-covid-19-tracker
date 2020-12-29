import { React, useState, useEffect, } from "react";
import "./App.css";
import { MenuItem, FormControl, Select, Card, } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map.js";
import Table from './Table';
import { sortData ,prettyPrintStat } from './util';
import LineGraph from './LineGraph.js';
import "leaflet/dist/leaflet.css";

function App() {
  const [contries, setContries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState(
    { lat: 26.9124, lng: -40.4796 }
  );
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType,setCasesType] = useState('cases')



  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/all`)
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, [])
  useEffect(() => {
    const getcontriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const contries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setContries(contries);
        });
    };
    getcontriesData();
  }, []);
  const onCounteryChange = async (event) => {
    const CounteryCode = event.target.value;
    // console.log(CounteryCode);
    setCountry(CounteryCode);
    const Url = (CounteryCode === "worldwide")
      ? `https://disease.sh/v3/covid-19/all`
      : `https://disease.sh/v3/covid-19/countries/${CounteryCode}`;

    await fetch(Url)
      .then((response) => response.json())
      .then(data => {
        /* set all countery data  */
        setCountryInfo(data);
        setMapCenter(data.countryInfo ? [data.countryInfo.lat, data.countryInfo.long] : { lat: 20.5937, lng: 78.96296666 });
        setMapZoom(4);
      });



  };

  return (
    <div className="app">

      <div className="app__left">

        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCounteryChange}
              value={country}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {contries.map((country) => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <MenuItem value={country.value}><img className="country__flag" src={country.flag} /> {country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="Coronavirus cases"
          isRed
          active={casesType === 'cases'}
          onClick={(e)=> setCasesType('cases') }
          cases={prettyPrintStat(countryInfo.todayCases)}
          total={prettyPrintStat(countryInfo.cases)}
           />
          <InfoBox title="Recovered" 
             active={casesType === 'recovered'}
           onClick={(e)=> setCasesType('recovered') }
          cases={prettyPrintStat(countryInfo.todayRecovered)}
          total={prettyPrintStat(countryInfo.recovered)}
           />
          <InfoBox 
          isRed
          active={casesType === 'deaths'}
          title="Death" 
          onClick={(e)=> setCasesType('deaths') }
          cases={prettyPrintStat(countryInfo.todayDeaths)}
          total={prettyPrintStat(countryInfo.deaths)}
           />
        </div>
        <Map
          casesType={casesType}
          contries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <h3>New cases By country</h3>
        <Table contries={tableData} />
        <h3 className="app__graphtitle">{`Worldwide new${casesType}`}</h3>

        <LineGraph className="app__graph" casesType={casesType} />


      </Card>
    </div>
  );
}

export default App;
