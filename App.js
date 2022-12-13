import { Image, Pressable, StyleSheet, SafeAreaView, Text, View, FlatList } from "react-native";
import { useSpotifyAuth } from "./utils";
import { Themes } from "./assets/Themes";
import SpotifyIcon from "./assets/spotify-logo.png"
import millisToMinutesAndSeconds from "./utils/millisToMinutesAndSeconds.js"
import { render } from "react-dom";


const SongItem = ({ num, pic, song, artist, album, time }) => {
  return (
    <View style={styles.card2}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#B3B3B3", fontSize: 20, marginHorizontal: 10 }} >{num}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Image source={pic} style={{ width: 64, height: 64, marginRight: 10 }} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#FFFFFF", fontSize: 20, marginRight: 10 }} numberOfLines={1}>{song}</Text>
        <Text style={{ color: "#B3B3B3", fontSize: 20, marginRight: 10 }} numberOfLines={1}>{artist}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#B3B3B3", fontSize: 20, marginRight: 10 }} numberOfLines={1}>{album}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#B3B3B3", fontSize: 20 }} numberOfLines={1}>{time}</Text>
      </View>
    </View>
  )
}


export default function App() {
  // Pass in true to useSpotifyAuth to use the album ID (in env.js) instead of top tracks
  const { token, tracks, getSpotifyAuth } = useSpotifyAuth();




  const SpotifyAuthButton = () => {
    return (
      <Pressable
        onPress={getSpotifyAuth}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : '#1DB954'
          },
          styles.wrapperCustom
        ]}
      >
        <View style={styles.card}>
          <View>
            <Image source={SpotifyIcon} style={{ width: 40, height: 40, marginRight: 10 }} />
          </View>
          <View>
            <Text style={{ color: "white", fontWeight: "bold" }}>Connect with Spotify</Text>
          </View>
        </View>
      </Pressable>
    )
  }

  const renderSongs = ({ item, index }) => (
    <SongItem
      num={index + 1}
      pic={item.album.images[2]}
      song={item.name}
      artist={item.artists[0].name}
      album={item.album.name}
      time={millisToMinutesAndSeconds(item.duration_ms)}
    />

  )
  
 
  const DisplayTracks = ({ songs }) => {
    return (
      <>
        <View style={styles.list}>
          <View style={styles.card}>
            <View>
              <Image source={SpotifyIcon} style={{ width: 40, height: 40, marginRight: 10 }} />
            </View>
            <View>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>My Top Tracks</Text>
            </View>
          </View>
          <FlatList
            data={songs}
            renderItem={(item) => renderSongs(item)}
            keyExtractor={(item) => item.id}
          />
        </View>
      </>
    )
  }

  return (
    token ?
      <SafeAreaView style={styles.container2}>
        <DisplayTracks songs={tracks} />
      </SafeAreaView>
      :
      <SafeAreaView style={styles.container}>
        <SpotifyAuthButton />
      </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  list: {
    height: "100%",
    width: "100%",
  },


  container2: {
    backgroundColor: Themes.colors.background,
    alignItems: "center",
    flex: 1,
  },
  wrapperCustom: {
    borderRadius: 99999,
    padding: 15
  },
  card: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  card2: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  }
});
