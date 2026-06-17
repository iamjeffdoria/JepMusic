import { router } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../lib/firebase";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) return Alert.alert("Error", "Fill in all fields");
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: new Date().toISOString(),
      });
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
        <Text className="text-gray-400 mb-8">Create an account</Text>

        <TextInput
          className="bg-zinc-900 text-white rounded-xl px-4 py-4 mb-4"
          placeholder="Full Name"
          placeholderTextColor="#6b7280"
          value={name}
          onChangeText={setName}
        />
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
          onPress={handleRegister}
          disabled={loading}
        >
          <Text className="text-black font-bold text-base">
            {loading ? "Creating account..." : "Sign Up"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text className="text-center text-gray-400">
            Already have an account?{" "}
            <Text className="text-green-500 font-bold">Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}