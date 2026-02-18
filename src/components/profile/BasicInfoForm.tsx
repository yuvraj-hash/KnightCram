import React, { useEffect, useState } from "react";
import { localStorageService } from "@/lib/localStorageService";
import { profileValidation } from "@/lib/validationService";
import { toast } from "sonner";
import { Mail, Phone, AtSign, User, CheckCircle, AlertCircle, MapPin, Users } from "lucide-react";

interface BasicInfoFormProps {
  profile: any;
  onSave?: (p: any) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ profile, onSave }) => {
  const [name, setName] = useState(profile.name || "");
  const [handle, setHandle] = useState(profile.handle || "");
  const [email, setEmail] = useState(profile.email || "");
  const [phone, setPhone] = useState(profile.phone || "");
  const [gender, setGender] = useState(profile.gender || "");
  const [location, setLocation] = useState(profile.location || "");

  const [avail, setAvail] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    setName(profile.name || "");
    setHandle(profile.handle || "");
    setEmail(profile.email || "");
    setPhone(profile.phone || "");
    setGender(profile.gender || "");
    setLocation(profile.location || "");
  }, [profile]);

  useEffect(() => {
    // If handle is same as initial profile handle (and it exists), it's valid/available (user's own handle)
    if (profile.handle && handle === profile.handle) {
      setAvail("available");
      return;
    }

    const id = setTimeout(async () => {
      if (!handle) return setAvail(null);

      // Simulation of availability check
      const taken = handle.toLowerCase().includes("admin") || handle.toLowerCase().includes("taken");
      setAvail(taken ? "taken" : "available");
    }, 600);
    return () => clearTimeout(id);
  }, [handle, profile.handle]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameVal = profileValidation.validateName(name);
    if (!nameVal.isValid) newErrors.name = nameVal.message;

    const handleVal = profileValidation.validateHandle(handle);
    if (!handleVal.isValid) newErrors.handle = handleVal.message;
    if (avail === "taken") newErrors.handle = "Username is taken";

    const emailVal = profileValidation.validateEmail(email);
    if (!emailVal.isValid) newErrors.email = emailVal.message;

    const phoneVal = profileValidation.validatePhone(phone);
    if (!phoneVal.isValid) newErrors.phone = phoneVal.message;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      toast.error("Please fix the errors before saving.");
      return;
    }

    const updatedProfile = {
      name,
      handle,
      email,
      phone,
      gender,
      location,
    };

    try {
      localStorageService.updateProfile(updatedProfile);
      localStorageService.updateCompletion();

      if (onSave) {
        onSave(updatedProfile);
      }

      toast.success("Basic information updated successfully");
      setFocusedField(null); // Hide buttons after save
    } catch (error) {
      console.error("Save failed", error);
      toast.error("Failed to save changes. Please try again.");
    }
  };

  const handleReset = () => {
    setName(profile.name || "");
    setHandle(profile.handle || "");
    setEmail(profile.email || "");
    setPhone(profile.phone || "");
    setGender(profile.gender || "");
    setLocation(profile.location || "");
    setErrors({});
    setFocusedField(null); // Hide buttons after reset
    toast.info("Changes discarded");
  };

  // Check validity including availability
  const isValid =
    name.trim() !== "" &&
    handle.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "" &&
    (avail === "available") &&
    Object.keys(errors).length === 0;

  return (
    <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl overflow-hidden">
      <div className="px-6 py-6 border-b border-white/10">
        <h3 className="font-bold text-xl">Basic Information <span className="text-red-400 text-sm ml-1">*</span></h3>
        <p className="text-sm text-white/50 mt-1">Help people know you better</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Full Name & User ID */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <label className="text-sm font-medium text-white block mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
              <input
                placeholder="Rahul Sharma"
                value={name}
                onFocus={() => setFocusedField("name")}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) {
                    setErrors((prev) => {
                      const newErr = { ...prev };
                      delete newErr.name;
                      return newErr;
                    });
                  }
                }}
                className={`w-full pl-10 pr-3 py-2 text-sm rounded-lg bg-white/5 border text-white placeholder-white/50 focus:outline-none transition ${errors.name ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-blue-500"}`}
              />
            </div>
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="w-full">
            <label className="text-sm font-medium text-white block mb-2">User ID</label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
              <input
                placeholder="rahul_07"
                value={handle}
                onFocus={() => setFocusedField("handle")}
                onChange={(e) => {
                  setHandle(e.target.value);
                  if (errors.handle) {
                    setErrors((prev) => {
                      const newErr = { ...prev };
                      delete newErr.handle;
                      return newErr;
                    });
                  }
                }}
                className={`w-full pl-10 pr-3 py-2 text-sm rounded-lg bg-white/5 border text-white placeholder-white/50 focus:outline-none transition ${errors.handle ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-blue-500"}`}
              />
            </div>
            {errors.handle && <p className="text-red-400 text-xs mt-1">{errors.handle}</p>}
            {avail === "taken" && <p className="text-red-400 text-xs mt-1">Username is taken</p>}
            {avail === "available" && handle !== profile.handle && handle.length > 0 && (
              <p className="text-green-400 text-xs mt-1">Username available</p>
            )}
          </div>
        </div>

        {/* Email & Phone */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <label className="text-sm font-medium text-white block mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
              <input
                placeholder="your@email.com"
                type="email"
                value={email}
                onFocus={() => setFocusedField("email")}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => {
                      const newErr = { ...prev };
                      delete newErr.email;
                      return newErr;
                    });
                  }
                }}
                className={`w-full pl-10 pr-3 py-2 text-sm rounded-lg bg-white/5 border text-white placeholder-white/50 focus:outline-none transition ${errors.email ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-blue-500"}`}
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="w-full">
            <label className="text-sm font-medium text-white block mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
              <input
                placeholder="+919876543210"
                value={phone}
                onFocus={() => setFocusedField("phone")}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) {
                    setErrors((prev) => {
                      const newErr = { ...prev };
                      delete newErr.phone;
                      return newErr;
                    });
                  }
                }}
                className={`w-full pl-10 pr-3 py-2 text-sm rounded-lg bg-white/5 border text-white placeholder-white/50 focus:outline-none transition ${errors.phone ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-blue-500"}`}
              />
            </div>
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Gender & Location */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <label className="text-sm font-medium text-white block mb-2">Gender</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
              <select
                value={gender}
                onFocus={() => setFocusedField("gender")}
                onChange={(e) => setGender(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition appearance-none"
              >
                <option value="" className="bg-gray-900 text-gray-400">Select Gender</option>
                <option value="Male" className="bg-gray-900">Male</option>
                <option value="Female" className="bg-gray-900">Female</option>
                <option value="Non-binary" className="bg-gray-900">Non-binary</option>
                <option value="Prefer not to say" className="bg-gray-900">Prefer not to say</option>
                <option value="Custom" className="bg-gray-900">Custom</option>
              </select>
            </div>
          </div>

          <div className="w-full">
            <label className="text-sm font-medium text-white block mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
              <input
                placeholder="City, Country"
                value={location}
                onFocus={() => setFocusedField("location")}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {focusedField && (
          <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
            <button
              onClick={handleReset}
              className="px-4 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium transition duration-200"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={!isValid}
              className="px-4 py-1.5 text-sm rounded-md bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-semibold transition duration-200"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BasicInfoForm;
