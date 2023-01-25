import Card from "./Card";

const ItemsGrid = ({ catalog }) => {
  if (Array.isArray(catalog) === false) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {catalog &&
          catalog.map((c) => {
            return <Card key={c.id} c={c} />;
          })}
      </>
    );
  }
};

export default ItemsGrid;
