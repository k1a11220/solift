import Svg, { Path } from "react-native-svg";

export function SearchOutline({ fillColor }: any) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" stroke={fillColor} strokeWidth={2}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </Svg>
  );
}
