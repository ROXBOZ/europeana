import Card from "./Card";

const ItemsGrid = ({ catalog, searchEntry }) => {
  console.log("catalog :>> ", catalog);
  // console.log("searchEntry :>> ", searchEntry);

  console.log(
    "Array.isArray(catalog), catalog.length",
    Array.isArray(catalog)
    // catalog.length
  );
  if (Array.isArray(catalog) === false) {
    return <div>Loading...</div>;
  } else {
    console.log("catalog on item grids", catalog);
    return (
      <>
        {catalog &&
          catalog.map((c) => {
            const title = c.dcTitleLangAware.de;
            console.log("title", title);
            if (!title) {
              console.log("Item does not have a title property");
              return;
            }
            {
              if (
                searchEntry &&
                !title.toLowerCase().includes(searchEntry.toLowerCase())
              ) {
                console.log("Item does not match search entry");
                return;
              }
            }
            return <Card key={c.id} catalog={c} />;
          })}
      </>
    );
  }

  return (
    <>
      {console.log("catalog, searchEntry", catalog, searchEntry)}
      {catalog && searchEntry ? (
        catalog.map((c) => {
          if (c.dcTitleLangAware.de[0].includes(searchEntry)) {
            return <Card key={c.id} catalog={c} />;
          }
        })
      ) : (
        <p>....loading </p>
      )}
    </>
  );
};

export default ItemsGrid;
