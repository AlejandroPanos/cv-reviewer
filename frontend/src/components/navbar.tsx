import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="h-16 border-b bg-background">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Button asChild className="hidden sm:inline-flex" variant="outline">
                <a href="/login">Sign In</a>
              </Button>
              <Button asChild>
                <a href="/register">Get Started</a>
              </Button>
            </>
          ) : (
            <Button asChild className="hidden sm:inline-flex" variant="outline">
              <a href="/login">Logout</a>
            </Button>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
