import Svg, { Path } from "react-native-svg";

export function DeviceMobileOutline({ fillColor }: any) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" stroke={fillColor} strokeWidth={2}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </Svg>
  );
}
