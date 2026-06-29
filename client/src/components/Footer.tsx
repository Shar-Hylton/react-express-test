const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full z-20 bg-white/80 backdrop-blur border-t border-gray-200">
      <p className="text-center py-3 text-sm text-gray-500">
        © {year} All rights reserved
      </p>
    </footer>
  );
}
