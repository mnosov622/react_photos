import { FC, useState, FormEvent as ReactFormEvent } from "react";

export interface IProps {
  value: string;
  onSubmit: (value: string) => void;
}

export const InputName: FC<IProps> = ({ value, onSubmit }) => {
  const [text, setText] = useState(value);

  const handleSubmit = (event: ReactFormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(text);
  };

  return (
    <div className="InputName">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Next title: </label>
        <input
          type="text"
          id="title"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
