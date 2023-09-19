import { FC } from "react";
import { IPhoto } from "../interfaces";

interface IProps extends IPhoto {}

export const Tile: FC<IProps> = ({ thumbnailUrl, title }) => {
  return (
    <div className="Tile">
      <p className="Tile__title">{title}</p>
      <img className="Tile__image" src={thumbnailUrl} alt={title} />
    </div>
  );
};
