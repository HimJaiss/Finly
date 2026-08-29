"use client";

export default function NavScrollLink({ targetId, children, className }) {
  const handleScroll = (e) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button onClick={handleScroll} className={className}>
      {children}
    </button>
  );
}