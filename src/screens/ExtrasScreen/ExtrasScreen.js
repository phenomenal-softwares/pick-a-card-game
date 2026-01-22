import { View, Text, Pressable, Linking, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AppHeader from "../../components/AppHeader/AppHeader";
import Colors from "../../constants/colors";
import styles from "./ExtrasScreen.styles";

const BASE_URL = "https://phenomenalproductions.com.ng";

const EXTRAS_ITEMS = [
  {
    label: "About the Game",
    icon: "information-circle-outline",
    url: `${BASE_URL}`,
  },
  {
    label: "About the Developer",
    icon: "person-circle-outline",
    url: `${BASE_URL}/about`,
  },
  {
    label: "Contact & Support",
    icon: "mail-outline",
    url: `${BASE_URL}/contact`,
  },
  {
    label: "Terms of Use",
    icon: "document-text-outline",
    url: `${BASE_URL}/terms-of-service`,
  },
  {
    label: "Privacy Policy",
    icon: "shield-checkmark-outline",
    url: `${BASE_URL}/privacy-policy`,
  },
];

export default function ExtrasScreen() {
  const navigation = useNavigation();

  const openLink = async (url) => {
    await Linking.openURL(url);
  };

  return (
    <>
      <AppHeader title="Extras" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.container}>
        {EXTRAS_ITEMS.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => openLink(item.url)}
            style={({ pressed }) => [
              styles.row,
              pressed && styles.rowPressed,
            ]}
          >
            <View style={styles.left}>
              <Ionicons
                name={item.icon}
                size={22}
                color={Colors.textOnColor}
              />
              <Text style={styles.label}>{item.label}</Text>
            </View>

            <Ionicons
              name="open-outline"
              size={18}
              color={Colors.textOnColor}
            />
          </Pressable>
        ))}

        <Text style={styles.footer}>
          © {new Date().getFullYear()} Phenomenal Productions
        </Text>
      </ScrollView>
    </>
  );
}
