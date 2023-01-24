import Card from "./Card";

const ItemsGrid = ({ catalog, searchEntry }) => {
  if (Array.isArray(catalog) === false) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {catalog &&
          catalog.map((c) => {
            const title = c.dcTitleLangAware?.de || "";
            if (!title) {
              console.log("Item does not have a title property");
              return;
            }

            return <Card key={c.id} catalog={catalog} c={c} />;
          })}
      </>
    );
  }
};

export default ItemsGrid;
