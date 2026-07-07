function AvatarIcon({ initials }: { initials: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
      <span className="text-gray-600 font-bold">{initials}</span>
    </div>
  );
}

export default AvatarIcon;
