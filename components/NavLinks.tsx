import Link from "next/link";

const NavLinks = () => {
  const links = [
    { href: "/chat", label: "Chat" },
    { href: "/profile", label: "Your Profile" },
    { href: "/tours/newTour", label: "New Tour" },
    { href: "/tours", label: "Tours" },
  ];
  return (
    <ul className="menu text-base-content">
      {links.map(({ href, label }) => (
        <li key={`${href}${label}`} className="capitalize">
          <Link href={href}>{label}</Link>
        </li>
      ))}
    </ul>
  );
};
export default NavLinks;
