import { useCallback, useRef, useState } from "react";
import { Upload, Link2, Sparkles, Edit, Save } from "lucide-react";
import Input from "./ui/Input";
import ProfileSelect from "./ui/ProfileSelect";

// Types
export interface ProfileData {
  name: string;
  age: string;
  imageType: "url" | "file";
  imageUrl: string;
  imageFile: File | null;
}

interface ValidationErrors {
  name?: string;
  age?: string;
  imageUrl?: string;
  imageFile?: string;
}

interface CreateProfileProps {
  initialData?: ProfileData | null;
  onSave: (data: ProfileData) => void;
}

// Constants
const VALID_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;
const MIN_AGE = 1;
const MAX_AGE = 120;

const CreateProfile: React.FC<CreateProfileProps> = ({ initialData = null, onSave }) => {
  const [formData, setFormData] = useState<ProfileData>({
    name: initialData?.name ?? "",
    age: initialData?.age ?? "",
    imageType: initialData?.imageType ?? "url",
    imageUrl: initialData?.imageUrl ?? "",
    imageFile: null,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const errorAnnouncerRef = useRef<HTMLDivElement>(null);

  // Handlers
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleImageTypeChange = useCallback((type: "url" | "file") => {
    setFormData((prev) => ({
      ...prev,
      imageType: type,
      imageUrl: type === "url" ? prev.imageUrl : "",
      imageFile: null,
    }));
    setErrors((prev) => ({ ...prev, imageUrl: undefined, imageFile: undefined }));
  }, []);

  const handleImageUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      imageUrl: value,
      imageFile: null,
    }));
    setErrors((prev) => ({ ...prev, imageUrl: undefined }));
  }, []);

  const handleImageFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!VALID_IMAGE_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        imageFile: "Please select a valid image file (JPEG, PNG, GIF, or WebP)",
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        imageFile: "Image size must be less than 5MB",
      }));
      return;
    }

    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imageUrl: base64String,
      }));
      setErrors((prev) => ({ ...prev, imageFile: undefined }));
    };
    
    reader.onerror = () => {
      setErrors((prev) => ({
        ...prev,
        imageFile: "Failed to read image file",
      }));
    };
    
    reader.readAsDataURL(file);
  }, []);

  const handleEditImage = useCallback(() => {
    if (formData.imageType === "file") {
      fileInputRef.current?.click();
    } else {
      urlInputRef.current?.focus();
    }
  }, [formData.imageType]);

  const handleRemoveImage = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
      imageFile: null,
    }));
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  // Validation
  const validate = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    const trimmedName = formData.name.trim();

    if (!trimmedName) {
      newErrors.name = "Name is required";
    } else if (trimmedName.length < MIN_NAME_LENGTH) {
      newErrors.name = `Name must be at least ${MIN_NAME_LENGTH} characters`;
    } else if (trimmedName.length > MAX_NAME_LENGTH) {
      newErrors.name = `Name must be less than ${MAX_NAME_LENGTH} characters`;
    }

    const ageNum = Number(formData.age);
    if (!formData.age || isNaN(ageNum) || ageNum < MIN_AGE || ageNum > MAX_AGE) {
      newErrors.age = `Age must be between ${MIN_AGE} and ${MAX_AGE}`;
    }

    if (formData.imageType === "url" && formData.imageUrl.trim()) {
      try {
        new URL(formData.imageUrl);
      } catch {
        newErrors.imageUrl = "Please enter a valid URL";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0 && errorAnnouncerRef.current) {
      const errorMessages = Object.values(newErrors).join(". ");
      errorAnnouncerRef.current.textContent = `Form has errors: ${errorMessages}`;
    }

    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Submit
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!validate()) {
        if (errors.name) {
          document.getElementById("name")?.focus();
        } else if (errors.age) {
          document.getElementById("age")?.focus();
        } else if (errors.imageUrl) {
          urlInputRef.current?.focus();
        }
        return;
      }
      
      onSave(formData);
    },
    [validate, errors, formData, onSave]
  );

  return (
    <div className="profile-form-card">
      {/* Modern Header */}
      <div className="profile-form-card__header">
        <div className="profile-form-card__header-icon">
          {initialData ? <Edit size={32} /> : <Sparkles size={32} />}
        </div>
        <h2 className="profile-form-card__title" id="form-title">
          {initialData ? "Edit Profile" : "Create Profile"}
        </h2>
        <p className="profile-form-card__subtitle">
          {initialData ? "Update your information" : "Fill in your details below"}
        </p>
      </div>

      {/* Screen Reader Error Announcer */}
      <div
        ref={errorAnnouncerRef}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      />

      <form
        className="profile-form-card__form"
        onSubmit={handleSubmit}
        aria-labelledby="form-title"
        noValidate
      >
        <div className="profile-form-card__image-section">
          <ProfileSelect
            imageUrl={formData.imageUrl}
            imageType={formData.imageType}
            onEdit={handleEditImage}
          />

          <fieldset className="profile-form-card__image-info">
          <legend className="profile-form-card__image-title">Profile Image</legend>
          <p className="profile-form-card__image-description">
            Choose how you want to add your profile picture
          </p>

          <div className="profile-form-card__radio-group" role="radiogroup" aria-label="Image source type">
            <label className="profile-form-card__radio-label">
              <input
                type="radio"
                name="imageType"
                value="url"
                checked={formData.imageType === "url"}
                onChange={() => handleImageTypeChange("url")}
                aria-describedby="url-description"
              />
              <span>Image URL</span>
            </label>
            <label className="profile-form-card__radio-label">
              <input
                type="radio"
                name="imageType"
                value="file"
                checked={formData.imageType === "file"}
                onChange={() => handleImageTypeChange("file")}
                aria-describedby="file-description"
              />
              <span>Upload File</span>
            </label>
          </div>

          {/* URL Input */}
          {formData.imageType === "url" && (
            <div className="input-group">
              <div className="url-input-wrapper">
                <Link2 size={18} className="url-input-icon" aria-hidden="true" />
                <input
                  ref={urlInputRef}
                  id="profile-image-url"
                  name="imageUrl"
                  type="url"
                  className="input input-with-icon"
                  value={formData.imageUrl}
                  onChange={handleImageUrlChange}
                  placeholder="Paste image URL..."
                  aria-describedby={errors.imageUrl ? "imageUrl-error url-description" : "url-description"}
                  aria-invalid={!!errors.imageUrl}
                />
              </div>
              <span id="url-description" className="sr-only">
                Enter the URL of your profile image
              </span>
              {errors.imageUrl && (
                <div id="imageUrl-error" className="error-msg" role="alert">
                  {errors.imageUrl}
                </div>
              )}
            </div>
          )}

          {/* File Input */}
          {formData.imageType === "file" && (
            <div className="input-group">
              <div className="upload-controls">
                <input
                  ref={fileInputRef}
                  id="profile-image-file"
                  name="imageFile"
                  type="file"
                  className="input-file-hidden"
                  onChange={handleImageFileChange}
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  aria-describedby={errors.imageFile ? "imageFile-error file-description" : "file-description"}
                  aria-invalid={!!errors.imageFile}
                />
                <button
                  type="button"
                  className="upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Upload photo"
                >
                  <Upload size={18} aria-hidden="true" />
                  <span>Upload Photo</span>
                </button>
                {formData.imageUrl && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={handleRemoveImage}
                    aria-label="Remove image"
                  >
                    Remove
                  </button>
                )}
              </div>
              <span id="file-description" className="sr-only">
                Select an image file from your device. Accepted formats: JPEG, PNG, GIF, WebP. Maximum size: 5MB
              </span>
              {errors.imageFile && (
                <div id="imageFile-error" className="error-msg" role="alert">
                  {errors.imageFile}
                </div>
              )}
            </div>
          )}
          </fieldset>
        </div>

        {/* Name */}
        <Input
          id="name"
          label="Name"
          name="name"
          value={formData.name}
          placeholder="e.g. John Doe"
          error={errors.name}
          onChange={handleChange}
          required
        />

        <Input
          id="age"
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          placeholder="1-120"
          error={errors.age}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="profile-form-card__submit-btn"
          aria-label={initialData ? "Update your profile" : "Save your profile"}
        >
          <Save size={20} aria-hidden="true" />
          <span>{initialData ? "Update Profile" : "Save Profile"}</span>
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
