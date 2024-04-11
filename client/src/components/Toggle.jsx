import { useEffect, useState } from "react";

export default function Toggle() {
  const [isDark, setIsDark] = useState(() => {
    const storedValue = localStorage?.getItem("isdark");
    return storedValue !== null ? JSON.parse(storedValue) : "sunset";
  });

  useEffect(() => {
    if (isDark !== null) {
      localStorage.setItem("isdark", JSON.stringify(isDark));
    }
  }, [isDark]);
  return (
    <div>
      <input
        type="checkbox"
        value="sunset"
        checked={isDark === "sunset"}
        className="toggle theme-controller"
        onChange={() =>
          setIsDark((prev) => (prev === "cupcake" ? "sunset" : "cupcake"))
        }
      />
    </div>
  );
}
