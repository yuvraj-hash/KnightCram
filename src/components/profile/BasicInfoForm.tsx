import React, { useEffect, useState } from "react";
import { localStorageService } from "@/lib/localStorageService";
import { profileValidation } from "@/lib/validationService";
import { toast } from "sonner";
import { Mail, Phone, AtSign, User, CheckCircle, AlertCircle } from "lucide-react";

interface BasicInfoFormProps {
  profile: any;
  onSave?: (p: any) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ profile, onSave }) => {
  const [name, setName] = useState(profile.name || "");
  const [handle, setHandle] = useState(profile.handle || "");
  const [email, setEmail] = useState(profile.email || "");
  const [phone, setPhone] = useState(profile.phone || "");
  const [avail, setAvail] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    setName(profile.name || "");
    setHandle(profile.handle || "");
    setEmail(profile.email || "");
    setPhone(profile.phone || "");
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
        {/* Full Name */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label className="w-full md:w-1/3 text-sm font-medium text-white text-left md:text-right">
            Full Name
          </label>
          <div className="w-full md:w-2/3 max-w-md">
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
              className={`w-full px-3 py-3 md:py-2 text-base md:text-sm rounded-lg bg-white/5 border text-white placeholder-white/50 focus:outline-none transition ${errors.name ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-blue-500"
                }`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
        </div>

        {/* User ID / Handle */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label className="w-full md:w-1/3 text-sm font-medium text-white text-left md:text-right">
            User ID
          </label>
          <div className="w-full md:w-2/3 max-w-md">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 font-medium text-sm">@</div>
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
                className={`w-full pl-8 pr-3 py-3 md:py-2 text-base md:text-sm rounded-lg bg-white/5 border text-white placeholder-white/50 focus:outline-none transition ${errors.handle ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-blue-500"
                  }`}
              />
            </div>
            {errors.handle && <p className="text-red-400 text-xs mt-1">{errors.handle}</p>}
            {avail === "taken" && <p className="text-red-400 text-xs mt-1">Username is taken</p>}
            {avail === "available" && handle !== profile.handle && handle.length > 0 && (
              <p className="text-green-400 text-xs mt-1">Username available</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label className="w-full md:w-1/3 text-sm font-medium text-white text-left md:text-right">
            Email Address
          </label>
          <div className="w-full md:w-2/3 max-w-md">
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
              className={`w-full px-3 py-3 md:py-2 text-base md:text-sm rounded-lg bg-white/5 border text-white placeholder-white/50 focus:outline-none transition ${errors.email ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-blue-500"
                }`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label className="w-full md:w-1/3 text-sm font-medium text-white text-left md:text-right">
            Phone Number
          </label>
          <div className="w-full md:w-2/3 max-w-md">
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
              className={`w-full px-3 py-3 md:py-2 text-base md:text-sm rounded-lg bg-white/5 border text-white placeholder-white/50 focus:outline-none transition ${errors.phone ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-blue-500"
                }`}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Action Buttons - Only show if any field is focused or text entered */}
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
