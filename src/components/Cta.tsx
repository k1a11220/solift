import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface CTAProps {
  label: string;
  type: "primary" | "secondary";
  disabled?: boolean;
  onPress: () => void;
}

const CTA = ({ label, onPress, disabled }: CTAProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled ? styles.disabled : null]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4191FD",
    padding: 17,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },

  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  disabled: {
    backgroundColor: "#C7DEFF",
  },
});

export default CTA;
