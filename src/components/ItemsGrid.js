import Card from "./Card";

const ItemsGrid = ({ catalog, searchEntry }) => {
  if (Array.isArray(catalog) === false || catalog.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {catalog &&
          catalog.map((c) => {
            const title = c.dcTitleLangAware["de"];
            console.log("title", title);
            if (!title) {
              console.log("Item does not have a title property");
              return;
            }
            if (
              searchEntry &&
              !title.toLowerCase().includes(searchEntry.toLowerCase())
            ) {
              console.log("Item does not match search entry");
              return;
            }
            return <Card key={c.id} catalog={c} />;
          })}
      </>
    );
  }
};

export default ItemsGrid;
