import Link from "next/link";

export default function ReturnHome() {
  return (
    <div>
      <a
        href="/"
        className="inline-flex items-center text-green-800 font-semibold hover:underline">
        ← Return home
      </a>
    </div>
  );
}
