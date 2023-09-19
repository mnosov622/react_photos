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
  const [page, setPage] = useState<number>(1);
  const totalPages = 5;
  const abortController = new AbortController();

  const { data: photos, error } = useSWR<IPhoto[]>(
    getFetchPhotosUrl(page - 1),
    async (url) => {
      try {
        const response = await fetch(url, {
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      } catch (error) {
        console.log("error occured");
        throw error;
      }
    },
  );

  const loading = !photos && !error;

  const handleNextPage = () => {
    if (page < totalPages) {
      abortController.abort();
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      abortController.abort();
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
          page={page}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      </Container>
    </div>
  );
}
