import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "@/lib/profileService";

const ProfileRouter = () => {
  const nav = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const profile = await getProfile();
      const threshold = 60;
      if (!mounted) return;
      
      // Check if profile is completed based on requirements
      const isProfileCompleted = (profile.completionPercentage || 0) >= threshold && 
                                profile.name && 
                                profile.handle && 
                                profile.email && 
                                profile.phone && 
                                profile.roles && 
                                profile.roles.length > 0;
      
      if (!isProfileCompleted) {
        nav("/profile/onboarding");
      } else {
        nav("/profile/view");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [nav]);

  return <div className="flex items-center justify-center min-h-screen">Redirecting...</div>;
};

export default ProfileRouter;
