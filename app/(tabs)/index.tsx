import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/HomeHeader";
import SectionHeader from "../../components/SectionHeader";
import SongCard from "../../components/SongCard";

const DUMMY_SONGS = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    thumbnail: "https://picsum.photos/seed/song1/200",
    duration: "3:20",
  },
  {
    id: "2",
    title: "Shape of You",
    artist: "Ed Sheeran",
    thumbnail: "https://picsum.photos/seed/song2/200",
    duration: "3:53",
  },
  {
    id: "3",
    title: "Levitating",
    artist: "Dua Lipa",
    thumbnail: "https://picsum.photos/seed/song3/200",
    duration: "3:23",
  },
];

const DUMMY_FEATURED = [
  {
    id: "1",
    title: "Top Hits 2024",
    thumbnail: "https://picsum.photos/seed/feat1/400",
  },
  {
    id: "2",
    title: "Chill Vibes",
    thumbnail: "https://picsum.photos/seed/feat2/400",
  },
  {
    id: "3",
    title: "OPM Classics",
    thumbnail: "https://picsum.photos/seed/feat3/400",
  },
];

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />

        {/* Featured */}
        <SectionHeader title="Featured" />
        <FlatList
          data={DUMMY_FEATURED}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Image
                source={{ uri: item.thumbnail }}
                className="w-48 h-48 rounded-xl"
              />
              <Text className="text-white text-sm font-semibold mt-2">{item.title}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Trending */}
        <View className="mt-6 px-4">
          <SectionHeader title="Trending Now" />
          {DUMMY_SONGS.map((song) => (
            <SongCard key={song.id} {...song} />
          ))}
        </View>

        {/* Recently Played */}
        <View className="mt-2 px-4 mb-6">
          <SectionHeader title="Recently Played" />
          {DUMMY_SONGS.slice().reverse().map((song) => (
            <SongCard key={song.id} {...song} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}