import NavLink from "./NavLink";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" },
];

export default function Navigation() {
  return (
    <nav>
      <ul className="flex items-center space-x-4">
        {navItems.map(({ name, path }) => (
          <li key={name}>
            <NavLink name={name} path={path} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
