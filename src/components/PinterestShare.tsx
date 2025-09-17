"use client";
import { usePathname } from "next/navigation";

const SITE_URL = "https://simple-intentions.netlify.app";

type PinterestShareProps = {
  imageUrl: string;
  description?: string;
  className?: string;
};

export default function PinterestShare({
  imageUrl,
  description,
  className = "",
}: PinterestShareProps) {
  const pathname = usePathname();
  const pageUrl = `${SITE_URL}${pathname}`;

  // Pinterest create-pin URL
  const pinHref = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
    pageUrl
  )}&media=${encodeURIComponent(
    imageUrl.startsWith("http") ? imageUrl : `${SITE_URL}${imageUrl}`
  )}&description=${encodeURIComponent(description ?? "")}`;

  return (
    <div className={`mt-3 mb-6 flex items-center ${className}`}>
      <a
        href={pinHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Save to Pinterest"
        className="
          inline-flex items-center justify-center
          transition
          hover:drop-shadow
          hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-[#E60023]/30 focus:ring-offset-2
          active:scale-95
        ">
        {/* Pinterest brand mark: red circle + white P (no extra CSS circle) */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          aria-hidden
          role="img"
          focusable="false">
          <circle cx="12" cy="12" r="12" fill="#E60023" />
          <path
            fill="#FFFFFF"
            d="M13.19 16.21c-1.03 0-1.99-.56-2.31-1.19 0 0-.55 2.16-.66 2.58-.41 1.5-1.61 3.19-1.7 3.31-.06.08-.19.05-.2-.05-.02-.34-.31-2 .03-3.48.17-.75 1.16-4.93 1.16-4.93s-.29-.57-.29-1.41c0-1.33.77-2.33 1.72-2.33.81 0 1.2.61 1.2 1.34 0 .82-.52 2.04-.8 3.17-.22.93.46 1.68 1.38 1.68 1.65 0 2.92-1.74 2.92-4.25 0-2.22-1.6-3.78-3.88-3.78-2.64 0-4.19 1.98-4.19 4.04 0 .8.31 1.66.69 2.12.08.09.09.18.07.28-.08.3-.25.94-.28 1.07-.04.15-.12.18-.28.12-1.03-.41-1.67-1.7-1.67-3.07 0-2.31 1.94-5.08 5.78-5.08 3.09 0 5.12 2.24 5.12 4.64 0 3.17-1.76 5.54-4.36 5.54Z"
          />
        </svg>
      </a>
    </div>
  );
}
