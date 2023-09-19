import { FC, useCallback } from "react";
import cn from "classnames";

interface IProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: FC<IProps> = ({ title, onClick, disabled }) => {
  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [onClick, disabled]);

  return (
    <div
      className={cn({
        Button: true,
        "Button--disabled": !!disabled,
      })}
      onClick={handleClick}
    >
      {title}
    </div>
  );
};
