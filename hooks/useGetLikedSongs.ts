"use client"

import { useEffect, useState } from "react";
import { Song } from "@/types";
import { Database } from "@/types/supabase";
import { supabaseBrowserClient } from "@/utils/supabaseBrowserClient";
import useCurrentSession from "./useCurrentSession";

/**
 * Custom hook para consultar las canciones likeadas del usuario autenticado
 */
const useGetLikedSongs = (loadSongs: boolean) => {
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const [loadingLikedSongs, setLoadingLikedSongs] = useState(false);

  const supabase = supabaseBrowserClient;
  const session = useCurrentSession(state => state.session);

  useEffect(() => {
    const getLikedSongs = async () => {
      if (!session) {
        return null;
      };

      if (loadSongs) {
        try {
          setLoadingLikedSongs(true);
  
          const {data, error} = await supabase
          .from("liked_songs")
          .select("*, songs(*)")
          .eq("user_id", session.user.id)
          .order("created_at", {ascending: false});
      
          if (error) {
            throw new Error(error.message);
          };
      
          /** Extraer la canción correspondiente al liked_song */
          const songs = data.reduce((acc: Song[], item) => {
            if (item.songs) {
              acc.push(item.songs)
            };
            return acc;
          }, []);
          
          setLikedSongs(songs);
          
        } catch (error: any) {
          console.log(`Error fetching liked songs: ${error.message}`);
          return [];
  
        } finally {
          setLoadingLikedSongs(false);
        }
      };
    };

    getLikedSongs();

  }, [session, loadSongs]);

  return {likedSongs, loadingLikedSongs};
};

export default useGetLikedSongs;