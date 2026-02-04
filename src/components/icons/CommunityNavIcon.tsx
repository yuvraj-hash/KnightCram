
import { cn } from "@/lib/utils";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    strokeWidth?: number | string;
}

const CommunityNavIcon = ({ className, size = 24, strokeWidth = 2, ...props }: IconProps) => {
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
            {/* Top Left Person */}
            <circle cx="7" cy="5" r="2.5" />
            <path d="M2 12 A 5 5 0 0 1 12 12 H 2 Z" />

            {/* Top Right Person */}
            <circle cx="17" cy="5" r="2.5" />
            <path d="M12 12 A 5 5 0 0 1 22 12 H 12 Z" />

            {/* Bottom Center Person */}
            <circle cx="12" cy="15" r="2.5" />
            <path d="M7 22 A 5 5 0 0 1 17 22 H 7 Z" />
        </svg>
    );
};

export default CommunityNavIcon;
