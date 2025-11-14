export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 text-center py-6 mt-8">
      <div className="max-w-4xl mx-auto text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} FullStack Blog — Demo
      </div>
    </footer>
  );
}
