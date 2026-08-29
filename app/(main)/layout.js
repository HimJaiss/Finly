import React from "react";

export default function MainLayout({ children }) {
  return (
    <div className="container mx-auto pt-16 pb-12 px-4">
      {children}
    </div>
  );
}