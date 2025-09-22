import Link from "next/link";

type Props = {
  href: string;
  label?: string;
  className?: string;
};

export default function LinkReturnPost({
  href,
  label = "← Return to Post",
  className = "",
}: Props) {
  return (
    <div>
      <Link
        href={href}
        className={`inline-flex items-center text-green-800 font-semibold hover:underline ${className}`}>
        {label}
      </Link>
    </div>
  );
}
