/**
 * Local Storage Service for Profile Management
 * Acts as temporary storage until backend API is ready
 */

export interface UserProfile {
  // Basic Info
  name?: string;
  handle?: string;
  email?: string;
  phone?: string;
  bio?: string;        // Bio / Headline (new)
  gender?: string;
  location?: string;

  // Role Selection
  roles?: string[];

  // Student Fields
  class?: string;
  stream?: string;
  course?: string;
  university?: string;
  college?: string;
  state?: string;
  academicYear?: string;

  // Alumni Fields
  yearOfPassing?: string;

  // Professional Fields
  company?: string;
  designation?: string;
  industry?: string;

  // Business Owner Fields
  businessName?: string;
  businessDescription?: string;

  // Verification
  verificationStatus?: string;
  verificationFiles?: string[];

  // Metadata
  completionPercentage?: number;
  lastUpdated?: string;
}

const STORAGE_KEY = "kc_profile";

export const localStorageService = {
  /**
   * Get entire profile from localStorage
   */
  getProfile: (): UserProfile => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error("Error reading profile from localStorage:", error);
      return {};
    }
  },

  /**
   * Save entire profile to localStorage
   */
  saveProfile: (profile: UserProfile): UserProfile => {
    try {
      const existingProfile = localStorageService.getProfile();
      const updatedProfile = {
        ...existingProfile,
        ...profile,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
      return updatedProfile;
    } catch (error) {
      console.error("Error saving profile to localStorage:", error);
      return profile;
    }
  },

  /**
   * Update specific fields in profile
   */
  updateProfile: (updates: Partial<UserProfile>): UserProfile => {
    return localStorageService.saveProfile(updates);
  },

  /**
   * Clear profile from localStorage
   */
  clearProfile: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing profile from localStorage:", error);
    }
  },

  /**
   * Get specific field value
   */
  getField: (fieldName: keyof UserProfile): any => {
    const profile = localStorageService.getProfile();
    return profile[fieldName];
  },

  /**
   * Calculate profile completion percentage
   */
  calculateCompletion: (): number => {
    const profile = localStorageService.getProfile();
    const sections = {
      basicInfo: 0,
      roleInfo: 0,
      academicInfo: 0,
      verification: 0,
    };

    // Basic Info Check (name + handle + email + phone = 20pts, bio = 5pt bonus)
    const basicInfoFields = [profile.name, profile.handle, profile.email, profile.phone];
    const basicInfoComplete = basicInfoFields.filter((f) => f && f.trim()).length;
    const bioBonus = profile.bio && profile.bio.trim() ? 5 : 0;
    sections.basicInfo = Math.min(25, (basicInfoComplete / 4) * 20 + bioBonus); // 25%

    // Role Info Check
    sections.roleInfo = profile.roles && profile.roles.length > 0 ? 25 : 0; // 25%

    // Academic/Professional Info Check
    let academicComplete = 0;
    if (profile.roles && profile.roles.length > 0) {
      const role = profile.roles[0];
      if (role === "Pre University Student" || role === "University Student") {
        const fields = [profile.college, profile.university, profile.course, profile.class];
        academicComplete = fields.filter((f) => f && f.trim()).length > 0 ? 25 : 0;
      } else if (role === "Alumni" || role === "Opportunity Seeker") {
        const fields = [profile.college, profile.yearOfPassing];
        academicComplete = fields.filter((f) => f && f.trim()).length > 0 ? 25 : 0;
      } else if (role === "Working Professional") {
        const fields = [profile.company, profile.designation];
        academicComplete = fields.filter((f) => f && f.trim()).length > 0 ? 25 : 0;
      } else if (role === "Business Owner / Indie Professional" || role === "Founder / Start-up Owner") {
        const fields = [profile.businessName];
        academicComplete = fields.filter((f) => f && f.trim()).length > 0 ? 25 : 0;
      } else if (role === "Indie Hacker / Freelancer") {
        const fields = [profile.company, profile.industry];
        academicComplete = fields.filter((f) => f && f.trim()).length > 0 ? 25 : 0;
      }
    }
    sections.academicInfo = academicComplete;

    // Verification Check
    sections.verification = profile.verificationStatus && profile.verificationStatus !== "none" ? 25 : 0;

    const total = sections.basicInfo + sections.roleInfo + sections.academicInfo + sections.verification;
    return Math.round(total);
  },

  /**
   * Update completion percentage
   */
  updateCompletion: (): number => {
    const completion = localStorageService.calculateCompletion();
    localStorageService.updateProfile({ completionPercentage: completion });
    return completion;
  },
};
