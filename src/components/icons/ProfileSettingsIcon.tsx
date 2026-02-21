import React from "react";
import { cn } from "@/lib/utils";

interface ProfileSettingsIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    strokeWidth?: number | string;
}

const ProfileSettingsIcon = ({
    className,
    size = 24,
    strokeWidth = 1.8,
    ...props
}: ProfileSettingsIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 66 66"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(className)}
            {...props}
        >
            {/* Outer browser window frame */}
            <rect x="2" y="7" width="62" height="52" rx="7" ry="7" />

            {/* Top bar separator */}
            <line x1="2" y1="19" x2="64" y2="19" />

            {/* Three dots in top bar */}
            <circle cx="11" cy="13" r="1.8" fill="currentColor" stroke="none" />
            <circle cx="18" cy="13" r="1.8" fill="currentColor" stroke="none" />
            <circle cx="25" cy="13" r="1.8" fill="currentColor" stroke="none" />

            {/* Person silhouette - head */}
            <path d="M17 31 a6 6 0 0 1 12 0 c0 3.5-2.5 6-6 7 c-3.5-1-6-3.5-6-7z" />

            {/* Person silhouette - shoulders / body */}
            <path d="M8 53 c0-8 4.5-12 10-13 c2 2.5 4.5 3.5 5 3.5 c0.5 0 3-1 5-3.5 c5.5 1 10 5 10 13" />

            {/* Text lines on the right side */}
            <line x1="38" y1="28" x2="60" y2="28" />
            <line x1="38" y1="35" x2="60" y2="35" />
            <line x1="38" y1="42" x2="60" y2="42" />
            <line x1="38" y1="49" x2="52" y2="49" />
        </svg>
    );
};

export default ProfileSettingsIcon;
