export type VerificationStatus = "none" | "submitted" | "pending" | "verified" | "rejected";

export interface Profile {
  id?: string;
  name?: string;
  handle?: string;
  email?: string;
  phone?: string;
  bio?: string;          // Bio / Headline
  about?: string;        // About / Long description
  gender?: string;
  location?: string;
  roles?: string[];
  completionPercentage?: number;
  verificationStatus?: VerificationStatus;
  proofs?: Array<{ id: string; type: string; status: VerificationStatus }>;

  // Academic Fields
  class?: string;
  stream?: string;
  course?: string;
  university?: string;
  college?: string;
  state?: string;
  academicYear?: string;
  yearOfPassing?: string;

  // Professional Fields
  company?: string;
  designation?: string;
  industry?: string;
  workHistory?: Array<{ id: string; company: string; position: string; startDate: string; endDate: string; description: string }>;

  // Business Owner Fields
  businessName?: string;
  businessDescription?: string;

  // Profile Picture
  profilePicture?: string;

  // Verification fields
  phoneVerified?: boolean;
  emailVerified?: boolean;
}

const STORAGE_KEY = "kc_profile";

const defaultProfile: Profile = {
  name: "",
  handle: "",
  email: "",
  phone: "",
  bio: "",
  about: "",
  gender: "",
  location: "",
  roles: [],
  completionPercentage: 0,
  verificationStatus: "none",
  proofs: [],

  // Academic Fields
  class: "",
  stream: "",
  course: "",
  university: "",
  college: "",
  state: "",
  academicYear: "",
  yearOfPassing: "",

  // Professional Fields
  company: "",
  designation: "",
  industry: "",
  workHistory: [],

  // Business Owner Fields
  businessName: "",
  businessDescription: "",

  // Profile Picture
  profilePicture: "",

  // Verification fields
  phoneVerified: false,
  emailVerified: false,
};

export const getProfile = async (): Promise<Profile> => {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 300));
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultProfile };
    return JSON.parse(raw) as Profile;
  } catch (e) {
    return { ...defaultProfile };
  }
};

export const saveProfile = async (patch: Partial<Profile>): Promise<Profile> => {
  await new Promise((r) => setTimeout(r, 300));
  const existing = await getProfile();
  const updated: Profile = { ...existing, ...patch };
  // naive completion calc
  let score = 0;
  if (updated.name) score += 10;
  if (updated.handle) score += 10;
  if (updated.email) score += 10;
  if (updated.phone) score += 5;
  if (updated.roles && updated.roles.length > 0) score += 10;
  if (updated.university || updated.college || updated.course) score += 15; // Academic info
  if (updated.company || updated.designation) score += 15; // Professional info
  if (updated.businessName || updated.businessDescription) score += 10; // Business info
  if (updated.profilePicture) score += 5;
  if (updated.verificationStatus === "verified") score += 20;
  updated.completionPercentage = Math.min(100, score);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const uploadProof = async (fileName: string, type: string) => {
  await new Promise((r) => setTimeout(r, 800));
  const id = `proof_${Date.now()}`;
  const profile = await getProfile();
  profile.proofs = profile.proofs || [];
  profile.proofs.push({ id, type, status: "pending" });
  profile.verificationStatus = "submitted";
  await saveProfile(profile);
  return { id };
};

export const submitForVerification = async () => {
  await new Promise((r) => setTimeout(r, 600));
  const profile = await getProfile();
  profile.verificationStatus = "pending";
  await saveProfile(profile);
  return profile;
};
