import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logout } from "@/helpers/helpers";
import { toast } from "sonner";

const Navbar = () => {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      dispatch({ type: "LOGOUT" });
      navigate("/");
      toast.success(data?.msg, { position: "top-right" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

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
                <a href="/login">Log In</a>
              </Button>
              <Button asChild>
                <a href="/register">Get Started</a>
              </Button>
            </>
          ) : (
            <Button onClick={handleLogout} className="hidden sm:inline-flex" variant="outline">
              Logout
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
