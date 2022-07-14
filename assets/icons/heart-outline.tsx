import Svg, { Path } from "react-native-svg";

export function HeartOutline() {
  return (
    <Svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </Svg>
  );
}
