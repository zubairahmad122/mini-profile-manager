import React, { useState, useCallback } from "react";
import { ArrowLeft, User, Edit, Trash2 } from "lucide-react";
import type { ProfileData } from "./CreateProfile";

interface ProfileDetailsProps {
  profile: ProfileData;
  onBack: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ 
  profile, 
  onBack,
  onEdit,
  onDelete 
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <div className="profile-details">
      <button
        type="button"
        className="profile-details__back-btn"
        onClick={onBack}
        aria-label="Go back to profile list"
      >
        <ArrowLeft size={20} aria-hidden="true" />
        <span>Back</span>
      </button>

      <article className="profile-details__card" aria-labelledby="profile-name">
        {/* Gradient Header Background */}
        <div className="profile-details__background">
          <div className="profile-details__image">
            {profile.imageUrl && !imageError ? (
              <img
                src={profile.imageUrl}
                alt={`${profile.name}'s profile picture`}
                onError={handleImageError}
              />
            ) : (
              <div className="profile-details__placeholder" aria-label="No profile image available">
                <User size={80} aria-hidden="true" />
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="profile-details__content">
          <div className="profile-details__info">
            <h2 id="profile-name" className="profile-details__name">
              {profile.name}
            </h2>
            <p className="profile-details__age">
              <span className="sr-only">Age: </span>
              {profile.age} years old
            </p>
          </div>

          {/* Action Buttons */}
          {(onEdit || onDelete) && (
            <div className="profile-details__actions">
              {onEdit && (
                <button
                  type="button"
                  className="profile-details__btn profile-details__btn--edit"
                  onClick={() => {
                    onEdit();
                    onBack();
                  }}
                  aria-label="Edit profile"
                >
                  <Edit size={18} aria-hidden="true" />
                  <span>Edit Profile</span>
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  className="profile-details__btn profile-details__btn--delete"
                  onClick={onDelete}
                  aria-label="Delete profile"
                >
                  <Trash2 size={18} aria-hidden="true" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default ProfileDetails;
