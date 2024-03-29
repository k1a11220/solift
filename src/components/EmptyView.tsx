import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../libs/theme";

interface EmptyViewProps {
  title: string;
  icon: "satellite" | "antenna" | "scope";
}

const EmptyView = ({ title, icon }: EmptyViewProps) => {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyWrapper}>
        {icon === "scope" ? (
          <Image
            style={{ height: 68, width: 68 }}
            source={require("../../assets/scope.png")}
          />
        ) : icon === "antenna" ? (
          <Image
            style={{ height: 68, width: 68 }}
            source={require("../../assets/antenna.png")}
          />
        ) : icon === "satellite" ? (
          <Image
            style={{ height: 68, width: 68 }}
            source={require("../../assets/satellite.png")}
          />
        ) : (
          <Image
            style={{ height: 68, width: 68 }}
            source={require("../../assets/satellite.png")}
          />
        )}
        <Text style={styles.emptyText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.6,
  },
  emptyWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  emptyText: {
    fontSize: 18,
    color: theme.colors.grey500,
    fontWeight: "600",
    marginTop: 24,
    textAlign: "center",
    lineHeight: 24,
  },
});

export default EmptyView;
