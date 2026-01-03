import React, { useState, useCallback } from "react";
import { User, Eye, Edit, Trash2 } from "lucide-react";
import type { ProfileData } from "./CreateProfile";

interface PreviewProfileProps {
  profile: ProfileData;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewDetails?: () => void;
}

const PreviewProfile: React.FC<PreviewProfileProps> = ({
  profile,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <article className="profile-card__preview" aria-label={`Profile preview for ${profile.name}`}>
     <div className="profile-card__background">
     <div className="profile-card__preview-image">
        {profile.imageUrl && !imageError ? (
          <img
            src={profile.imageUrl}
            alt={`${profile.name}'s profile picture`}
            onError={handleImageError}
          />
        ) : (
          <div className="profile-card__preview-placeholder" aria-label="No profile image">
            <User size={40} aria-hidden="true" />
          </div>
        )}
      </div>
     </div>

      <div className="profile-card__preview-content">
      <div className="profile-card__preview-info">
        <h3 className="profile-card__preview-name">{profile.name}</h3>
        <p className="profile-card__preview-age">
          <span className="sr-only">Age: </span>
          {profile.age} years old
        </p>
      </div>

      <div className="profile-card__preview-actions" role="group" aria-label="Profile actions">
        {onViewDetails && (
          <button
            type="button"
            className="profile-card__action-btn profile-card__action-btn--view"
            onClick={onViewDetails}
            aria-label={`View detailed profile for ${profile.name}`}
          >
            <Eye size={18} aria-hidden="true" />
            <span>View Profile</span>
          </button>
        )}
        {onEdit && (
          <button
            type="button"
            className="profile-card__action-btn profile-card__action-btn--edit"
            onClick={onEdit}
            aria-label={`Edit profile for ${profile.name}`}
          >
            <Edit size={18} aria-hidden="true" />
            <span>Edit</span>
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            className="profile-card__action-btn profile-card__action-btn--delete"
            onClick={onDelete}
            aria-label={`Delete profile for ${profile.name}`}
          >
            <Trash2 size={18} aria-hidden="true" />
            <span>Delete</span>
          </button>
        )}
      </div>
      </div>
    </article>
  );
};

export default PreviewProfile;
