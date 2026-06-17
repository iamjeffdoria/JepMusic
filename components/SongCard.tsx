import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

type SongCardProps = {
  title: string;
  artist: string;
  thumbnail: string;
  duration?: string;
};

export default function SongCard({ title, artist, thumbnail, duration }: SongCardProps) {
  return (
    <TouchableOpacity className="flex-row items-center bg-zinc-900 rounded-xl p-3 mb-3">
      <Image
        source={{ uri: thumbnail }}
        className="w-14 h-14 rounded-lg"
      />
      <View className="flex-1 ml-3">
        <Text className="text-white font-semibold" numberOfLines={1}>{title}</Text>
        <Text className="text-gray-400 text-sm" numberOfLines={1}>{artist}</Text>
      </View>
      {duration && <Text className="text-gray-500 text-xs mr-3">{duration}</Text>}
      <TouchableOpacity>
        <Ionicons name="play-circle" size={32} color="#22c55e" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}