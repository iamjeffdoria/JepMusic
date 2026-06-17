import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../lib/firebase";
import { googleSignIn } from "../../lib/googleAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert("Error", "Fill in all fields");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 justify-center px-6">
        <Text className="text-white text-4xl font-bold mb-2">JepMusic</Text>
        <Text className="text-gray-400 mb-8">Sign in to continue</Text>

        <TextInput
          className="bg-zinc-900 text-white rounded-xl px-4 py-4 mb-4"
          placeholder="Email"
          placeholderTextColor="#6b7280"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className="bg-zinc-900 text-white rounded-xl px-4 py-4 mb-6"
          placeholder="Password"
          placeholderTextColor="#6b7280"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-green-500 rounded-xl py-4 items-center mb-4"
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-black font-bold text-base">
            {loading ? "Signing in..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white rounded-xl py-4 items-center mb-4"
          onPress={async () => {
            try {
              await googleSignIn();
              router.replace("/(tabs)");
            } catch (error: any) {
              Alert.alert("Error", error.message);
            }
          }}
        >
          <Text className="text-black font-bold text-base">
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text className="text-center text-gray-400">
            Don't have an account?{" "}
            <Text className="text-green-500 font-bold">Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}