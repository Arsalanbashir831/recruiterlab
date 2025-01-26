"use client";

export function PostCard({ id, image, title, description, onClick }) {
  return (
    <div
      className="max-w-xs w-full bg-white rounded-lg shadow-md overflow-hidden border cursor-pointer"
      onClick={onClick} // Trigger the dialog
    >
      {/* Post Image */}
      <div className="relative h-48 w-full">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>

      {/* Post Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
