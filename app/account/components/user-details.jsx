"use client";
import { useCallback, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Avatar from "./avatar";

export default function AccountForm({ session }) {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      // Set the loading state to true
      setLoading(true);

      // Fetch the user's profile data
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      // If there was an error with the request
      if (error && status !== 406) {
        // Throw the error
        throw error;
      }

      // If the data exists
      if (data) {
        // Save their full name, username, website, and avatar URL
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      // If there was an error, alert the user
      alert("Error loading user data!");
    } finally {
      // Set the loading state to false
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  // Update user's profile
  async function updateProfile({ username, website, avatar_url }) {
    try {
      // Set loading state
      setLoading(true);

      // Make API request
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center mt-4 animate-in">
      <Avatar
        uid={user.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullname, username, website, avatar_url: url });
        }}
      />
      <div className="mb-4 space-y-2">
        <label htmlFor="email" className="text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={session?.user.email}
          disabled
          className="p-2 w-full text-black bg-gray-200 rounded"
        />
      </div>
      <div className="mb-4 space-y-2">
        <label htmlFor="fullName" className="text-gray-700">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
          className="p-2 w-full text-black bg-gray-200 rounded"
        />
      </div>
      <div className="mb-4 space-y-2">
        <label htmlFor="username" className="text-gray-700">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 w-full text-black bg-gray-200 rounded"
        />
      </div>
      <div className="mb-4 space-y-2">
        <label htmlFor="website" className="text-gray-700">
          Website
        </label>
        <input
          id="website"
          type="url"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
          className="p-2 w-full text-black bg-gray-200 rounded"
        />
      </div>
      <div className="flex flex-row mb-4">
        <button
          className="py-2 px-4 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
          onClick={() =>
            updateProfile({ fullname, username, website, avatar_url })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>
    </div>
  );
}
