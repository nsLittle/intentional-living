// src/app/printables/[slug]/page.tsx
import HeaderNavBarServer from "components/HeaderNavBarServer";
import Header from "components/Header";
import Footer from "components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPrintables } from "lib/printables";

// Derive slug from filename (e.g., "/downloads/recipes/bold-earth.pdf" -> "bold-earth")
function baseFromHref(href: string) {
  const name = href.split("/").pop() ?? "";
  return name.replace(/\.pdf$/i, "");
}

// /downloads/<category>/<name>.pdf -> /downloads/thumbnails/<category>/<name>.webp
function thumbFromPdf(pdf?: string) {
  if (!pdf) return undefined;
  const withoutPrefix = pdf.replace(/^\/downloads\//, "");
  const [category, rest] = withoutPrefix.split("/", 2);
  if (!category || !rest) return undefined;
  const base = rest.replace(/\.pdf$/i, "");
  return `/downloads/thumbnails/${category}/${base}.webp`;
}

export default async function PrintableDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const all = getAllPrintables();
  const match = all.find((p) => baseFromHref(p.href) === slug);
  if (!match) return notFound();

  const thumb = thumbFromPdf(match.href);

  return (
    <>
      <HeaderNavBarServer />
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-10 text-[#5c5045]">
        <nav className="mb-6 text-sm">
          <Link href="/printables" className="hover:underline">
            ← All Printables
          </Link>
        </nav>

        <header className="mb-6">
          <h1 className="font-serif text-3xl font-bold">{match.title}</h1>
          <p className="mt-2 text-sm text-gray-600 break-all">
            {match.filename}
          </p>
        </header>

        {/* Actions */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <a
            href={match.href}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center rounded-md bg-[#6ea089] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Download PDF
          </a>
          <a
            href={match.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md border border-[#cab9a6] px-4 py-2 text-sm hover:bg-white/70">
            Open in new tab
          </a>
        </div>

        {/* PDF viewer with graceful fallback */}
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <object
            data={match.href}
            type="application/pdf"
            className="w-full h-[75vh]">
            <div className="p-6 flex items-center gap-4">
              {thumb ? (
                <Image
                  src={thumb}
                  alt={match.title}
                  width={160}
                  height={160}
                  className="w-40 h-40 object-cover rounded-md border"
                />
              ) : null}
              <div>
                <p className="mb-2">
                  Your browser can’t display the PDF inline.
                </p>
                <a
                  href={match.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-[#6ea089] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
                  Open PDF
                </a>
              </div>
            </div>
          </object>
        </div>
      </main>

      <Footer />
    </>
  );
}
