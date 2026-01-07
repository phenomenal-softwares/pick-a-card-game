import { View, Text, TouchableOpacity } from "react-native";
import styles from "./MainMenuScreen.styles";

export default function MainMenuScreen({ userData, navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Pick A Card</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Game")}
        >
          <Text style={styles.buttonText}>Play Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.disabledButton}>
          <Text style={styles.buttonText}>Achievements</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.disabledButton}>
          <Text style={styles.buttonText}>Stats</Text>
        </TouchableOpacity>
      </View>

      {/* High Score */}
      <View>
        <Text style={styles.highScore}>High Score: {userData.highScore}</Text>
      </View>
    </View>
  );
}
