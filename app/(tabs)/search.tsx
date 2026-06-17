import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchSongs } from "../../lib/youtube";
import { usePlayerStore } from "../../store/playerStore";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { setTrack } = usePlayerStore();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const items = await searchSongs(query);
      setResults(items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

const handlePlay = (item: any) => {
  setTrack({
    id: item.id,
    title: item.title,
    artist: item.uploaderName,
    thumbnail: item.thumbnail,
    duration: item.duration,
  });
};

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Search Bar */}
      <View className="px-4 pt-2 pb-4">
        <Text className="text-white text-2xl font-bold mb-4">Search</Text>
        <View className="flex-row items-center bg-zinc-900 rounded-xl px-4 py-3 gap-3">
          <Ionicons name="search" size={20} color="#6b7280" />
          <TextInput
            className="flex-1 text-white"
            placeholder="Songs, artists..."
            placeholderTextColor="#6b7280"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => { setQuery(""); setResults([]); }}>
              <Ionicons name="close-circle" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results */}
      {loading ? (
        <ActivityIndicator color="#22c55e" size="large" className="mt-10" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row items-center mb-4"
              onPress={() => handlePlay(item)}
            >
              <Image
                source={{ uri: item.thumbnail }}
                className="w-14 h-14 rounded-lg"
              />
              <View className="flex-1 ml-3">
                <Text className="text-white font-semibold" numberOfLines={1}>
                  {item.title}
                </Text>
                <Text className="text-gray-400 text-sm" numberOfLines={1}>
                  {item.uploaderName}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handlePlay(item)}>
                <Ionicons name="play-circle" size={32} color="#22c55e" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            !loading && query.length === 0 ? (
              <View className="items-center mt-20">
                <Ionicons name="search-outline" size={64} color="#3f3f46" />
                <Text className="text-zinc-600 mt-4 text-base">Search for your favorite songs</Text>
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}