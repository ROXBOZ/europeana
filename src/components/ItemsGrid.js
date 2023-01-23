import Card from "./Card";

// REVIEW this component is not in use any more
const ItemsGrid = ({ catalog, searchEntry }) => {
  console.log("catalog :>> ", catalog);

  return (
    <>
      {catalog && searchEntry ? (
        catalog
          .filter((c) => {
            return c.dcTitleLangAware.de[0].includes(searchEntry);
          })
          .map((element) => {
            return <Card key={element.id} catalog={element} />;
          })
      ) : (
        <p>....loading </p>
      )}
    </>
  );
};

export default ItemsGrid;
