import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { feedApiManager } from "@/app/(root)/FeedApiManager";
import { community as communityImg } from "../constants/images";
import { useGlobalContext } from "@/context/GlobalProvider";

const Communities = () => {
  const [communityData, setCommunityData] = useState<any[]>([]); // Set initial state to an empty array
  const { feedId, setFeedId } = useGlobalContext();

  useEffect(() => {
    const fetchCommunities = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;
      const data = await feedApiManager.getFeeds(userId);
      setCommunityData(data || []); // Set data or empty array if data is null/undefined
    };

    fetchCommunities();
  }, []);

  const handleCommunityPress = (community: any) => {
    console.log(`Navigating to community: ${community.name}`);
    setFeedId(community.id);
    console.log(feedId);
    router.push("/home");
  };

  return (
    <View style={styles.container}>
      {communityData.map((community, index) => (
        <TouchableOpacity
          key={index}
          style={styles.communityContainer}
          onPress={() => handleCommunityPress(community)}
        >
          <ImageBackground
            source={communityImg}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
            <Text style={styles.communityName}>{community.name}</Text>
            <View>
              <Text style={styles.communityDetails}>
                Members: {community.userCount}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Communities;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  communityContainer: {
    width: 120,
    height: 120,
    marginBottom: 5,
  },
  imageBackground: {
    overflow: "hidden",
    justifyContent: "space-between",
    height: 120,
  },
  imageStyle: {},
  communityName: {
    fontSize: 12,
    fontFamily: "ReemRegular",
    color: "#fff",
    padding: 5,
  },
  communityDetails: {
    fontSize: 12,
    color: "#fff",
    paddingHorizontal: 5,
    paddingBottom: 2,
  },
});
