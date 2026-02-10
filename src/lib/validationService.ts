/**
 * Validation utilities for profile fields
 * Follows production-grade validation rules
 */

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export const profileValidation = {
  /**
   * Validate full name
   * Rules: No numbers/special chars, 3-50 chars, letters and spaces only
   */
  validateName: (name: string): ValidationResult => {
    if (!name || !name.trim()) return { isValid: false, message: "Name is required" };
    const trimmed = name.trim();
    if (trimmed.length < 3) return { isValid: false, message: "Name must be at least 3 characters" };
    if (trimmed.length > 50) return { isValid: false, message: "Name must be less than 50 characters" };
    if (!/^[A-Za-z\s]+$/.test(trimmed)) return { isValid: false, message: "Name can only contain letters and spaces" };
    return { isValid: true, message: "" };
  },

  /**
   * Validate user ID/handle
   * Rules: Lowercase, 4-20 chars, start with letter, alphanumeric + underscore/dot
   */
  validateHandle: (handle: string): ValidationResult => {
    if (!handle || !handle.trim()) return { isValid: false, message: "User ID is required" };
    const trimmed = handle.trim();
    if (trimmed.length < 4) return { isValid: false, message: "User ID must be at least 4 characters" };
    if (trimmed.length > 20) return { isValid: false, message: "User ID must be less than 20 characters" };
    if (!/^[a-z][a-z0-9_.]*$/.test(trimmed)) {
      return { isValid: false, message: "User ID must be lowercase, start with a letter, and contain only a-z, 0-9, _, ." };
    }
    return { isValid: true, message: "" };
  },

  /**
   * Validate email
   * Rules: RFC standard email format, max 254 chars.
   */
  validateEmail: (email: string): ValidationResult => {
    if (!email || !email.trim()) return { isValid: false, message: "Email is required" };
    const trimmed = email.trim();
    if (trimmed.length > 254) return { isValid: false, message: "Email is too long" };
    // Simple RFC-compliant-ish regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return { isValid: false, message: "Please enter a valid email address" };
    return { isValid: true, message: "" };
  },

  /**
   * Validate phone number
   * Rules: Exactly 10 digits for India
   */
  validatePhone: (phone: string): ValidationResult => {
    if (!phone || !phone.trim()) return { isValid: false, message: "Phone number is required" };
    // Remove +91 or other common prefixes to check just the 10 digits
    // However, requirement says "Valid formats: 9876543210, +919876543210"
    // So we check against those two patterns specifically.
    if (!/^\d{10}$/.test(phone) && !/^\+91\d{10}$/.test(phone)) {
      return { isValid: false, message: "Please enter a valid 10-digit phone number (e.g., 9876543210 or +919876543210)" };
    }
    return { isValid: true, message: "" };
  },

  /**
   * Validate any text field with optional constraints
   */
  validateTextField: (value: string, fieldName: string, minLength = 1, maxLength = 255): ValidationResult => {
    if (!value || !value.trim()) {
      return { isValid: false, message: `${fieldName} is required` };
    }
    if (value.length < minLength) {
      return { isValid: false, message: `${fieldName} must be at least ${minLength} characters` };
    }
    if (value.length > maxLength) {
      return { isValid: false, message: `${fieldName} must be less than ${maxLength} characters` };
    }
    return { isValid: true, message: "" };
  },

  /**
   * Validate academic year (e.g., "1st Year", "2024-2025")
   */
  validateAcademicYear: (year: string): ValidationResult => {
    if (!year || !year.trim()) {
      return { isValid: false, message: "Academic year is required" };
    }
    return { isValid: true, message: "" };
  },

  /**
   * Validate year of passing (should be a valid year)
   */
  validateYearOfPassing: (year: string): ValidationResult => {
    if (!year || !year.trim()) {
      return { isValid: false, message: "Year of passing is required" };
    }
    const yearNum = parseInt(year);
    const currentYear = new Date().getFullYear();
    if (isNaN(yearNum) || yearNum < 1950 || yearNum > currentYear + 5) {
      return { isValid: false, message: "Please enter a valid year of passing" };
    }
    return { isValid: true, message: "" };
  },

  /**
   * Validate basic info section
   */
  validateBasicInfo: (name: string, handle: string, email: string, phone: string) => {
    const errors: Record<string, string> = {};

    const nameValidation = profileValidation.validateName(name);
    if (!nameValidation.isValid) errors.name = nameValidation.message;

    const handleValidation = profileValidation.validateHandle(handle);
    if (!handleValidation.isValid) errors.handle = handleValidation.message;

    const emailValidation = profileValidation.validateEmail(email);
    if (!emailValidation.isValid) errors.email = emailValidation.message;

    const phoneValidation = profileValidation.validatePhone(phone);
    if (!phoneValidation.isValid) errors.phone = phoneValidation.message;

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  /**
   * Validate all profile data
   */
  validateProfile: (profile: any) => {
    const errors: Record<string, string> = {};

    // Basic Info
    if (profile.name) {
      const nameVal = profileValidation.validateName(profile.name);
      if (!nameVal.isValid) errors.name = nameVal.message;
    }

    if (profile.handle) {
      const handleVal = profileValidation.validateHandle(profile.handle);
      if (!handleVal.isValid) errors.handle = handleVal.message;
    }

    if (profile.email) {
      const emailVal = profileValidation.validateEmail(profile.email);
      if (!emailVal.isValid) errors.email = emailVal.message;
    }

    if (profile.phone) {
      const phoneVal = profileValidation.validatePhone(profile.phone);
      if (!phoneVal.isValid) errors.phone = phoneVal.message;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
