import React, { useState } from "react";
import "./styles.css";
import Photos from "./components/Photos/Photos";
import Pagination from "./components/Pagination/Pagination";
import Container from "./components/Container/Container";

export default function App() {
  const [page, setPage] = useState<number>(1);
  const totalPages = 5;

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="App">
      <Container>
        <Photos page={page} />
        <Pagination
          totalPages={totalPages}
          page={page}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      </Container>
    </div>
  );
}
