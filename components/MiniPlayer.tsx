import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { usePlayerStore } from "../store/playerStore";

export default function MiniPlayer() {
  const { currentTrack, isPlaying, setIsPlaying } = usePlayerStore();

  if (!currentTrack) return null;

  return (
    <TouchableOpacity
      className="flex-row items-center bg-zinc-800 mx-3 rounded-xl px-3 py-2 mb-2"
      onPress={() => router.push("/(tabs)/player")}
    >
      <Image
        source={{ uri: currentTrack.thumbnail }}
        className="w-10 h-10 rounded-lg"
      />
      <View className="flex-1 ml-3">
        <Text className="text-white font-semibold text-sm" numberOfLines={1}>
          {currentTrack.title}
        </Text>
        <Text className="text-gray-400 text-xs" numberOfLines={1}>
          {currentTrack.artist}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setIsPlaying(!isPlaying)}
        className="p-2"
      >
        <Ionicons
          name={isPlaying ? "pause-circle" : "play-circle"}
          size={36}
          color="#22c55e"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}