import { cn } from "@/lib/utils";

interface SpinguLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SpinguLogo({ className = '', size = 'md' }: SpinguLogoProps) {
  // Set default size dimensions based on size prop
  const dimensions = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 48, height: 48 },
  }[size];

  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      <circle cx="18" cy="18" r="18" fill="url(#spengu_gradient)" />
      <path 
        d="M25.5 12.5C25.5 14.1569 24.1569 15.5 22.5 15.5C20.8431 15.5 19.5 14.1569 19.5 12.5C19.5 10.8431 20.8431 9.5 22.5 9.5C24.1569 9.5 25.5 10.8431 25.5 12.5Z" 
        fill="white" 
      />
      <path 
        d="M15.5 13.5C15.5 14.6046 14.6046 15.5 13.5 15.5C12.3954 15.5 11.5 14.6046 11.5 13.5C11.5 12.3954 12.3954 11.5 13.5 11.5C14.6046 11.5 15.5 12.3954 15.5 13.5Z" 
        fill="white" 
      />
      <path 
        d="M27.6 21C27.6 25.4183 23.4183 29 18 29C12.5817 29 8.4 25.4183 8.4 21C8.4 16.5817 12.5817 16 18 16C23.4183 16 27.6 16.5817 27.6 21Z" 
        fill="white" 
      />
      <defs>
        <linearGradient id="spengu_gradient" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9333EA" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}