const Footer = ({ pages, handlePage, onPage }) => {
  const pageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= pages; i++) {
      buttons.push(
        <button key={i} onClick={() => handlePage(i)}>
          {i}
        </button>
      );
    }
    return buttons;
  };
  const goToFirst = () => {
    handlePage(1);
  };
  const goToLast = () => {
    handlePage(pages);
  };
  const backPage = () => {
    handlePage((prevPage) => prevPage - 1);
  };
  const nextPage = () => {
    handlePage((prevPage) => prevPage + 1);
  };
  return (
    <>
      <div className="btn-footer">
        <button onClick={goToFirst} disabled={onPage === 1}>
          {"<<"}
        </button>
        <button onClick={backPage} disabled={onPage === 1}>
          {"<"}
        </button>
        {pageButtons()}
        <button onClick={nextPage} disabled={onPage === pages}>
          {">"}
        </button>
        <button onClick={goToLast} disabled={onPage === pages}>
          {">>"}
        </button>
      </div>
    </>
  );
};

export default Footer;
