"use client";

interface ProfileAvatarProps {
  name?: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function ProfileAvatar({
  name = "User",
  src,
  size = "md",
}: ProfileAvatarProps) {
  const sizes = {
    sm: "h-9 w-9 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-28 w-28 text-3xl",
  };

  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`
        relative flex shrink-0 items-center justify-center
        overflow-hidden rounded-full border-4 border-white
        bg-slate-100 font-bold text-slate-700 shadow-sm
        ${sizes[size]}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={`${name} profile`}
          className="h-full w-full object-cover"
          onLoad={() => {
            console.log("PROFILE IMAGE LOADED:", src);
          }}
          onError={() => {
            console.error("PROFILE IMAGE FAILED:", src);
          }}
        />
      ) : (
        <span>{initials || "U"}</span>
      )}
    </div>
  );
}