import { Text, TouchableOpacity, View } from "react-native";

type SectionHeaderProps = {
  title: string;
  onSeeAll?: () => void;
};

export default function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-4 mb-3">
      <Text className="text-white text-lg font-bold">{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll}>
          <Text className="text-green-500 text-sm">See all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}