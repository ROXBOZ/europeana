import React, { useEffect, useRef } from "react";
import BerlinMap from "../utils/BerlinMap.json";
import * as d3 from "d3";
import { geoMercator } from "d3-geo";

const Map = () => {
  const w = 600;
  const h = 600;
  const projection = geoMercator()
    .center([13.4, 52.5])
    .translate([w / 2, h / 2])
    .scale([w / 0.013]);
  const path = d3.geoPath().projection(projection);
  const svgRef = useRef(null);

  //   useEffect(() => {
  //     const svg = d3.select(svgRef.current).attr("width", w).attr("height", h);
  //     console.log("svg", svg);
  //     d3.json(BerlinMap, function (json) {
  //       console.log("json", json);
  //       svg
  //         .selectAll("path")
  //         .data(json.features)
  //         .enter()
  //         .append("path")
  //         .attr("d", path);
  //     });
  //   }, []);

  console.log("BerlinMap", BerlinMap);

  useEffect(() => {
    const svg = d3.select(svgRef.current).attr("width", w).attr("height", h);
    fetch(BerlinMap)
      .then((response) => response.json())
      .then((data) => {
        console.log("BerlinMap", data);
        svg
          .selectAll("path")
          .data(data.features)
          .enter()
          .append("path")
          .attr("d", path);
      });
  }, []);

  return <svg className="map" ref={svgRef} />;
};

export default Map;
