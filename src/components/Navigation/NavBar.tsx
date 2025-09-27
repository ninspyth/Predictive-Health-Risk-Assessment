import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/app/components/ui/navigation-menu"
import Link from "next/link"

export default function NavbarMenu() {
      return (
        <header className="w-full text-white">
            <NavigationMenu className="w-full">
            <NavigationMenuList className="flex w-full items-center px-4 py-2">
                {/* Left side: Home + Dashboard */}
                <div className="flex gap-1">
                <NavigationMenuItem>
                    <NavigationMenuLink className="text-sm font-medium" asChild>
                    <Link href="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className="text-sm font-medium" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className="text-sm font-medium" asChild>
                    <Link href="/predict">Predict</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className="text-sm font-medium" asChild>
                    <Link href="/chat">Chat</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                </div>

                {/* Right side: Login */}
                <div className="ml-auto">
                <NavigationMenuItem>
                    <NavigationMenuLink className="text-sm font-medium" asChild>
                    <Link href="/login">Login</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                </div>
            </NavigationMenuList>
            </NavigationMenu>
        </header>
      )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}