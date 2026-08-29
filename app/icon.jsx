import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "linear-gradient(135deg, #2D7DFF, #4F46E5, #7C3AED)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          color: "white",
          fontWeight: 900,
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Capital 'F' */}
          <path
            d="M9 25V7H21M9 15H18"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Eye Indicator on 'F' */}
          <path
            d="M12 5.5C13.5 3.5 18.5 3.5 20 5.5C18.5 7.5 13.5 7.5 12 5.5Z"
            fill="#60A5FA"
          />
          <circle cx="16" cy="5.5" r="1.3" fill="white" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}