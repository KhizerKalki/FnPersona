import { useTheme } from "../theme/theme-provider";

function Update() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center mt-5">
      <button
        className={`px-4 py-2 rounded ${
          theme === "light"
            ? "bg-white text-black border-black border"
            : "bg-black text-white border-white border"
        } `}
        onClick={() => alert("Settings Updated!")}
      >
        Update
      </button>
    </div>
  );
}

export default Update;
