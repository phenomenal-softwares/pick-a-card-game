import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export function renderPowerupIcon(icon, size = 28, color = "#f9fafb") {
  if (!icon) return null;

  switch (icon.pack) {
    case "Ionicons":
      return <Ionicons name={icon.name} size={size} color={color} />;

    case "MaterialCommunity":
      return (
        <MaterialCommunityIcons
          name={icon.name}
          size={size}
          color={color}
        />
      );

    default:
      return null;
  }
}
