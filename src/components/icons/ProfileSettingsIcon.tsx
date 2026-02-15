import React from "react";
import { cn } from "@/lib/utils";

interface ProfileSettingsIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    strokeWidth?: number | string;
}

const ProfileSettingsIcon = ({
    className,
    size = 24,
    strokeWidth = 2,
    ...props
}: ProfileSettingsIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("lucide lucide-profile-settings", className)}
            {...props}
        >
            <defs>
                <mask id="smiley-mask">
                    <rect x="0" y="0" width="24" height="24" fill="white" />
                    <circle cx="18" cy="18" r="7" fill="black" />
                </mask>
            </defs>

            {/* Smiley Face - Masked by the Badge area */}
            <g mask="url(#smiley-mask)">
                <circle cx="10" cy="10" r="9" />
                {/* Smile */}
                <path d="M6.5 13a5 5 0 0 0 7 0" strokeLinecap="round" />
                {/* Eyes (Solid) */}
                <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="12.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
            </g>

            {/* Badge Container */}
            <circle cx="18" cy="18" r="6" className="fill-background" strokeWidth={strokeWidth} />

            {/* Gear Icon Inside Badge - Centered at 18,18 */}
            <g transform="translate(18 18)">
                <circle cx="0" cy="0" r="2" />
                <path d="M0 -3.5 v1" />
                <path d="M0 3.5 v-1" />
                <path d="M3.5 0 h-1" />
                <path d="M-3.5 0 h1" />
                <path d="M2.5 -2.5 l-.7 .7" />
                <path d="M-2.5 2.5 l.7 -.7" />
                <path d="M2.5 2.5 l-.7 -.7" />
                <path d="M-2.5 -2.5 l.7 .7" />
            </g>
        </svg>
    );
};

export default ProfileSettingsIcon;
