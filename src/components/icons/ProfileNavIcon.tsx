
import { cn } from "@/lib/utils";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    strokeWidth?: number | string;
}

const ProfileNavIcon = ({ className, size = 24, strokeWidth = 2, ...props }: IconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-foreground", className)}
            {...props}
        >
            {/* Head */}
            <circle cx="12" cy="8" r="4" />

            {/* Body */}
            {/* Smooth arch with flat bottom */}
            <path d="M6 21v-2a6 6 0 0 1 6-6 6 6 0 0 1 6 6v2" />
        </svg>
    );
};

export default ProfileNavIcon;
