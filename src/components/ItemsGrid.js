import React from "react";
import Card from "./Card";

const ItemsGrid = ({ data }) => {
  const catalog = data.items;

  return (
    <div className="fetch-container">
      <Card catalog={catalog} />
    </div>
  );
};

export default ItemsGrid;
