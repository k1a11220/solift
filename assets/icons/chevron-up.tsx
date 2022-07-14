import Svg, { Path } from "react-native-svg";

export function ChevronUp() {
  return (
    <Svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <Path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </Svg>
  );
}
