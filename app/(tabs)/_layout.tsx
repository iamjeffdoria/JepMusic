import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MiniPlayer from "../../components/MiniPlayer";

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingBottom: insets.bottom }} className="bg-zinc-900 border-t border-zinc-800">
      <MiniPlayer />
      <View className="flex-row pt-2 px-2 items-center">
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const isCenter = route.name === "player";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIcon = (name: string) => {
          switch (name) {
            case "index": return isFocused ? "home" : "home-outline";
            case "search": return isFocused ? "search" : "search-outline";
            case "library": return isFocused ? "library" : "library-outline";
            case "profile": return isFocused ? "person" : "person-outline";
            default: return "play";
          }
        };

        if (isCenter) {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              className="flex-1 items-center"
            >
              <View className="bg-green-500 rounded-full w-14 h-14 items-center justify-center -mt-6 shadow-lg">
                <Ionicons name="play" size={26} color="black" />
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            className="flex-1 items-center py-1"
          >
            <Ionicons
              name={getIcon(route.name) as any}
              size={24}
              color={isFocused ? "#22c55e" : "#6b7280"}
            />
          </TouchableOpacity>
        );
})}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="player" />
      <Tabs.Screen name="library" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}