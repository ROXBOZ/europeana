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

            return <Card key={c.id} catalog={catalog} />;
          })}
      </>
    );
  }
};

export default ItemsGrid;

// return (
//   <>
//     {console.log("catalog, searchEntry", catalog, searchEntry)}
//     {catalog && searchEntry ? (
//       catalog.map((c) => {
//         if (c.dcTitleLangAware.de[0].includes(searchEntry)) {
//           return <Card key={c.id} catalog={c} />;
//         }
//       })
//     ) : (
//       <p>....loading </p>
//     )}
//   </>
// );
