import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useUser } from "../../context/userContext";
import { STATS_MODEL } from "../../data/stats";

import AppHeader from "../../components/AppHeader/AppHeader";
import styles from "./StatsScreen.styles";

export default function StatsScreen() {
  const { user } = useUser();
  const navigation = useNavigation();

  if (!user) return null;

  return (
    <>
      <AppHeader title="Stats" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.container}>
        {STATS_MODEL.map((section) => (
          <View key={section.section} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {section.section}
            </Text>

            {section.items.map((item) => (
              <View key={item.id} style={styles.row}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.value}>
                  {item.value(user)}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </>
  );
}
