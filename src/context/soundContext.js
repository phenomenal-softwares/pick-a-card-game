import { createContext, useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";
import { loadAllSounds, playMusic, stopMusic } from "../utils/soundManager";

const SoundContext = createContext(null);

export const SoundProvider = ({ children }) => {
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
      });

      await loadAllSounds();
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (soundsEnabled) {
      playMusic();
    } else {
      stopMusic();
    }
  }, [soundsEnabled]);

  return (
    <SoundContext.Provider
      value={{
        soundsEnabled,
        setSoundsEnabled,
        loaded,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used inside SoundProvider");
  return ctx;
};
