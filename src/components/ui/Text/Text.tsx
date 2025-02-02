import { useMemo } from "react";

type TVariations = "1" | "2" | "3" | "4" | "5" | "6";
type TUnderlineVariations = "1" | "2" | "4" | "8";

export interface IText {
  text: string | React.ReactNode;
  level: "sm" | "base" | "lg" | "xl" | "2xl";
  fontWeight?: "light" | "normal" | "medium" | "semibold" | "bold";
  underline?: `offset-${TUnderlineVariations}`;
  as?: `h${TVariations}` | "p";
  className?: string;
}

export const Text: React.FC<IText> = ({
  text,
  level,
  as = "p",
  underline,
  fontWeight = "medium",
  className,
}) => {
  const Component = as;
  const classNameBuilt = useMemo(
    () => `text-${level} font-${fontWeight} ${className ?? ""}`,
    [level, fontWeight, underline, className]
  );

  return <Component className={classNameBuilt}>{text}</Component>;
};
