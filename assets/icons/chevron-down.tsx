import Svg, { Path } from "react-native-svg";

export function ChevronDown({ fillColor }: any) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" stroke={fillColor} strokeWidth={2}>
      <Path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </Svg>
  );
}
