import React from "react";
import ItemsGrid from "./ItemsGrid";
import { useState } from "react";
import { useEffect } from "react";
import Pagination from "./Pagination";
import Card from "./Card";
// import Search from "./Search";

const Home = () => {
  const [data, setData] = useState([]);
  // const [catalog, setCatalog] = useState([]); //REVIEW by filtering down in JSX, we avoid creating this variable
  const [searchEntry, setSearchEntry] = useState(""); //REVIEW moved the state up here. We usually group all state variables together.
  const [, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.europeana.eu/api/v2/search.json?wskey=abastende &query=Berlin&query =Kreuzberg&query=Museum FHXB&start=${page}`
        );
        const result = await response.json();
        console.log("resuuult", result);
        setData(result);
        // setCatalog(result.items);
      } catch (error) {
        console.log("Catch: ", error);
        setError(error);
      }
    };
    fetchData();
  }, [page]);

  const result = data.totalResults; // REVIEW keep the "regular" variables right after the State variables.  keep some order inside the component, e.g : 1st styling objects (if any),then props,  then hooks (const abc=useNavigate(),  const xyz = useContext(nml)) , then state variables, then functions, then useEffects .
  const itemsCount = data.itemsCount;

  const handleNext = () => {
    setPage(page + itemsCount);
  };
  const handlePrev = () => {
    setPage(page - itemsCount);
  };

  const getInput = (e) => {
    setSearchEntry(e.target.value);
    // filtering();
    // console.log("e.target.value", e.target.value);
  };
  //REVIEW if we filter down below, we dont need this function
  // const filtering = () => {
  //   console.log("searcjEntry", searchEntry);
  //   let filteredItems = catalog.filter((e) => {
  //     console.log("e.dcTitleLangAware.de[0] :>> ", e.dcTitleLangAware.de[0]);
  //     return e.dcTitleLangAware.de[0].includes(searchEntry);
  //   });
  //   console.log("filteredItems :>> ", filteredItems);
  // };

  return (
    <div>
      <h2>This is a title</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas illo
        debitis numquam maxime fuga quam molestias accusamus quae eaque
        consequuntur. Ut illum delectus saepe placeat eum labore veritatis
        maiores illo.
      </p>

      <hr />
      <div className="search-container">
        <input
          value={searchEntry}
          id="search"
          onChange={getInput}
          className="search-bar"
          type="text"
          placeholder="Waldermarstr.."
        />

        <label className="search-bar-label" for="search">
          &nbsp;Suche eine Straße
        </label>
      </div>
      <hr />

      <Pagination
        page={page}
        handleNext={handleNext}
        handlePrev={handlePrev}
        result={result}
      />

      <p className="small">
        <strong>{result}</strong> Ergebnisse von <a href="">FHXB Museum</a> bei{" "}
        <a href="">Europana Search API</a>.{" "}
      </p>

      <hr />
      {/* If you move this logic up here, you don't need the ItemsGrid component, which sole function is to pass down the catalog and the searchEntry */}
      {/* by filtering right before mapping , you also save a few lines of code and a stateVariable */}
      {data && searchEntry ? (
        data.items
          .filter((c) => {
            return c.dcTitleLangAware.de[0].includes(searchEntry);
          })
          .map((element) => {
            return <Card key={element.id} catalog={element} />;
          })
      ) : (
        <p>....loading </p>
      )}

      {/* <ItemsGrid catalog={catalog} searchEntry={searchEntry} /> */}
    </div>
  );
};

export default Home;
