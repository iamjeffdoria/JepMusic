import { Text, View } from "react-native";

export default function HomeHeader() {
  return (
    <View className="px-4 py-3">
      <Text className="text-gray-400 text-sm">Good evening,</Text>
      <Text className="text-white text-xl font-bold">Jefferson 👋</Text>
    </View>
  );
}