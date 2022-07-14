import Svg, { Path } from "react-native-svg";

export function Chevron() {
  return (
    <Svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </Svg>
  );
}
