import React, { memo } from "react";

interface InputProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  min?: string | number;
  max?: string | number;
  autoComplete?: string;
}

const Input: React.FC<InputProps> = memo(({
  id,
  label,
  name,
  type = "text",
  value,
  placeholder,
  error,
  onChange,
  required = false,
  maxLength,
  minLength,
  min,
  max,
  autoComplete,
}) => {
  const errorId = `${id}-error`;

  return (
    <div className="input-group">
      <label htmlFor={id} className="label">
        {label}
        {required && (
          <span aria-label="required" className="required-indicator">
            {" *"}
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className={`input ${error ? "input--error" : ""}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        aria-required={required}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        min={min}
        max={max}
        autoComplete={autoComplete}
      />
      {error && (
        <div id={errorId} className="error-msg" role="alert" aria-live="polite">
          {error}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
