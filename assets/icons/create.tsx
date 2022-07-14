import Svg, { Path } from "react-native-svg";

export function Create({ fillColor }: any) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" stroke={fillColor} strokeWidth={2}>
      <Path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </Svg>
  );
}
