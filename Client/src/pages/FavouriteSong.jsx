import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MusicCard from "../components/MusicCard";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const FavouriteSong = () => {
  const navigate = useNavigate();
  const {user, token}= useSelector((state) => state.auth);
  const { id } = useParams();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    const fetchArtistDetails = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          `https://muzik-drab.vercel.app/api/v1/favorite/mysong`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSongs(response.data.favoriteSongs);
        // console.log(response.data.favoriteSongs);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
      setLoading(false); // End loading
    };

    fetchArtistDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full bg-[#282828] h-full rounded-xl lg:p-4">
      <div className="bg-[#3f3a43]  rounded-xl py-2">
        <h1 className="text-2xl font-bold text-center">Favourite Song</h1>
        {songs && songs.length > 0 ? (
          <div className="grid lg:mx-2 chl:grid-cols-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 
                  lg:grid-cols-3 cl:grid-cols-3 lg:gap-2 px-1 md:gap-4 gap-6 mt-4 overflow-x-auto">
            {songs.length > 0 &&
              songs.map((song) => <MusicCard key={song._id} song={song} isliked={true} />)}
          </div>
        ) : (
          <div>
            <p className=" text-center">No songs found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouriteSong;
