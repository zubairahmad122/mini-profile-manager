import React, { useCallback } from "react";
import { Pencil, User } from "lucide-react";

interface ProfileSelectProps {
  imageUrl?: string;
  imageType?: "url" | "file";
  onEdit: () => void;
}

const ProfileSelect: React.FC<ProfileSelectProps> = ({
  imageUrl,
  imageType = "url",
  onEdit,
}) => {
  const showPencilIcon = imageType === "file";

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onEdit();
      }
    },
    [onEdit]
  );

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = "none";
  }, []);

  return (
    <div className="profile-select" role="group" aria-label="Profile image selector">
      <div className="profile-select__image-wrapper">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Your profile picture"
            className="profile-select__image"
            onClick={onEdit}
            style={{ cursor: "pointer" }}
            onError={handleImageError}
          />
        ) : (
          <div
            className="profile-select__placeholder"
            aria-label="Click to add profile image"
            role="button"
            tabIndex={0}
            onClick={onEdit}
            onKeyDown={handleKeyDown}
          >
            <User size={40} aria-hidden="true" className="profile-select__placeholder-icon" />
            <span className="profile-select__placeholder-text">No Image</span>
          </div>
        )}

        {showPencilIcon && (
          <button
            type="button"
            className="profile-select__edit-btn"
            aria-label={imageUrl ? "Change profile image" : "Add profile image"}
            onClick={onEdit}
            onKeyDown={handleKeyDown}
            title={imageUrl ? "Change image" : "Add image"}
          >
            <Pencil size={16} aria-hidden="true" />
            <span className="sr-only">
              {imageUrl ? "Change profile image" : "Add profile image"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileSelect;
