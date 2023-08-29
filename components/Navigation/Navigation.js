import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationContainer, NavigationItem } from "./styles";

/**
 * Returns view which has navigations for the page
 *
 * @param {Array<Object>} links
 * @returns
 */
const Navigation = (props) => {
  const pathname = usePathname();

  const links = props.links || [
    {
      href: "/salad-maker",
      title: "Planner",
    },
    {
      href: "/salad-list",
      title: "Salads",
    },
    {
      href: "/supplier-list",
      title: "Suppliers",
    },
    {
      href: "/subscriber-list",
      title: "Subscribers",
    },
    {
      href: "/product-list",
      title: "Products",
    },
  ];

  return (
    <NavigationContainer>
      {links.map((link, index) => (
        <NavigationItem
          data-testid={`navigation-item-${index}`}
          key={link.href}
          selected={link.href === pathname}
        >
          <Link role={`link-${link.href}`} href={link.href}>
            {link.title}
          </Link>
        </NavigationItem>
      ))}
    </NavigationContainer>
  );
};

export default Navigation;
