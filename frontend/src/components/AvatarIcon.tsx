interface AvatarIconProps {
  initials: string;
  width?: number;
  height?: number;
  fontSize?: number;
}

function AvatarIcon({
  initials,
  width = 40,
  height = 40,
  fontSize = 16,
}: AvatarIconProps) {
  return (
    <div
      className="rounded-full bg-gray-300 flex items-center justify-center"
      style={{ width, height }}
    >
      <span className="text-gray-600 font-bold" style={{ fontSize }}>
        {initials}
      </span>
    </div>
  );
}

export default AvatarIcon;
