export default function Header() {
  return (
    <header className="relative w-full h-64">
      <img
        src="/images/log-garden.jpeg"
        alt="Intentional Living Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 h-full flex items-center justify-center bg-black/30"></div>
    </header>
  );
}
