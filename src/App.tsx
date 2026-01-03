import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import ProfileDetails from "./components/ProfileDetails";
import CreateProfile from "./components/CreateProfile";
import PreviewProfile from "./components/PreviewProfile";
import type { ProfileData } from "./components/CreateProfile";

const STORAGE_KEY = "userProfile";

function App() {
  const [view, setView] = useState<"home" | "details">("home");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem(STORAGE_KEY);
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error("Failed to parse profile", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (profile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [profile]);

  const handleSave = useCallback((data: ProfileData) => {
    setProfile(data);
    setIsEditing(false);
  }, []);

  const handleDelete = useCallback(() => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      setProfile(null);
      setIsEditing(false);
      setView("home");
    }
  }, []);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleViewDetails = useCallback(() => {
    setView("details");
  }, []);

  const handleBack = useCallback(() => {
    setView("home");
  }, []);

  const renderContent = () => {
    if (view === "home") {
      return (
        <div className="home-view profile-card__layout">
          {(!profile || isEditing) && (
            <CreateProfile
              initialData={isEditing ? profile : null}
              onSave={handleSave}
            />
          )}

          {profile && !isEditing && (
            <PreviewProfile
              profile={profile}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewDetails={handleViewDetails}
            />
          )}
        </div>
      );
    }

    return (
      <div className="profile-details-view">
        {profile && (
          <ProfileDetails 
            profile={profile} 
            onBack={handleBack}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="container" tabIndex={-1}>
        {renderContent()}
      </main>
    </>
  );
}

export default App;
