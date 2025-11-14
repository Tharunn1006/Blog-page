export default function Sidebar({ categories, onSelect, active }) {
  return (
    <aside className="w-64 hidden lg:block">
      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h3 className="font-bold mb-3 text-gray-800 dark:text-white">Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => onSelect(cat)}
              className={`cursor-pointer px-3 py-2 rounded ${active===cat ? 'bg-blue-600 text-white':'bg-gray-100 dark:bg-gray-700 dark:text-gray-200'} hover:bg-blue-500 hover:text-white`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
