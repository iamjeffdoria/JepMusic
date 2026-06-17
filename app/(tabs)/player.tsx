import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubeIframe, { YoutubeIframeRef } from "react-native-youtube-iframe";
import { usePlayerStore } from "../../store/playerStore";

export default function Player() {
  const { currentTrack, isPlaying, setIsPlaying } = usePlayerStore();
  const playerRef = useRef<YoutubeIframeRef>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        setPosition(0);
        setDuration(0);
        setVideoReady(false);
    }, [currentTrack?.id]);

    const [actuallyPlaying, setActuallyPlaying] = useState(false);

    useEffect(() => {
    if (!actuallyPlaying) return;
    const interval = setInterval(async () => {
        const t = await playerRef.current?.getCurrentTime();
        if (typeof t === "number") setPosition(t);
    }, 500);
    return () => clearInterval(interval);
    }, [actuallyPlaying]);

    const onReady = async () => {
    setVideoReady(true);
    const d = await playerRef.current?.getDuration();
    if (typeof d === "number") setDuration(d);
    };

  const formatTime = (sec: number) => {
    const totalSec = Math.floor(sec);
    const min = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${min}:${s.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? position / duration : 0;

  if (!currentTrack) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <Ionicons name="musical-notes-outline" size={64} color="#6b7280" />
        <Text className="text-gray-500 mt-4 text-lg">No song playing</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-6 justify-between py-6">

        <View style={{ width: 60, height: 60, alignSelf: "flex-end" }}>
           <YoutubeIframe
                ref={playerRef}
                height={60}
                width={60}
                videoId={currentTrack.id}
                play={isPlaying}
                onReady={onReady}
                onChangeState={(state: string) => {
                    if (state === "playing") {
                        setActuallyPlaying(true);
                        playerRef.current?.getDuration().then((d) => {
                            if (typeof d === "number" && d > 0) setDuration(d);
                        });
                    }
                    if (state === "paused" || state === "ended") setActuallyPlaying(false);
                    if (state === "ended") setIsPlaying(false);
                }}
               webViewProps={{
                mediaPlaybackRequiresUserAction: false,
                allowsInlineMediaPlayback: true,
                allowsProtectedMedia: true,
                androidLayerType: "hardware",
            }}
                />
            </View>

        <View className="items-center mt-6">
          <Image source={{ uri: currentTrack.thumbnail }} className="w-72 h-72 rounded-2xl" />
        </View>

        <View className="items-center mt-6">
          <Text className="text-white text-2xl font-bold text-center" numberOfLines={2}>
            {currentTrack.title}
          </Text>
          <Text className="text-gray-400 text-base mt-1">{currentTrack.artist}</Text>
        </View>

        <View className="mt-6">
          <View className="bg-zinc-800 rounded-full h-1.5 w-full">
            <View className="bg-green-500 h-1.5 rounded-full" style={{ width: `${progress * 100}%` }} />
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-gray-400 text-xs">{formatTime(position)}</Text>
            <Text className="text-gray-400 text-xs">{formatTime(duration)}</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between px-4 mt-4">
          <TouchableOpacity>
            <Ionicons name="shuffle" size={24} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-skip-back" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-green-500 w-16 h-16 rounded-full items-center justify-center"
            onPress={() => setIsPlaying(!isPlaying)}
            disabled={!videoReady}
          >
            <Ionicons name={isPlaying ? "pause" : "play"} size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-skip-forward" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="repeat" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}