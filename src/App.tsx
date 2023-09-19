import "./styles.css";
import { Taska } from "./components/Taska";
import { Tile } from "./components/Tile";
import { Button } from "./components/Button";
import { noop, getFetchPhotosUrl } from "./utils";
import { InputName, IProps } from "./components/InputName";
import { IPhoto } from "./interfaces";
import { useEffect, useState } from "react";

// getFetchPhotosUrl(1) -> "https://some.link/lalala/"
// IPhoto[]

// region Hooks
function getPhotos(pgNum: number): Promise<IPhoto[]> {
  return fetch(getFetchPhotosUrl(pgNum))
    .then((response) => response.json())
    .then((data) => data);
}

// endregion

export default function App() {
  const [tiles, setTiles] = useState<IPhoto[]>();

  useEffect(() => {}, []);

  return (
    <div className="App">
      <Taska />
      <div className="wrap">
        <div>{/* InputName */}</div>
        <div className="Buttons">
          {/* Button Prev */}
          {/* Button Next */}
        </div>
        <div className="Tiles">
          {/* Tile */}
          {/* Tile */}
          {/* Tile */}
        </div>
      </div>
    </div>
  );
}
