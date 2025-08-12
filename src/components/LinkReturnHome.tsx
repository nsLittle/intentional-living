import Link from "next/link";

export default function LinkReturnHome() {
  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center text-green-800 font-semibold hover:underline">
        ← Return home
      </Link>
    </div>
  );
}
