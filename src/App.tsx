import React, { useState } from "react";
import "./styles.css";
import Photos from "./components/Photos/Photos";
import Pagination from "./components/Pagination/Pagination";
import Container from "./components/Container/Container";
import useSWR from "swr";
import { getFetchPhotosUrl } from "./utils";
import { IPhoto } from "./interfaces";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

export default function App() {
  const [page, setPage] = useState<number>(0);
  const totalPages = 5;

  const { data: photos, error } = useSWR<IPhoto[]>(getFetchPhotosUrl(page), async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  const loading = !photos && !error;

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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error fetching photos: {error.message}</div>;
  }

  return (
    <div className="App">
      <Container>
        <Photos photos={photos} />
        <Pagination
          totalPages={totalPages}
          page={page + 1}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      </Container>
    </div>
  );
}
