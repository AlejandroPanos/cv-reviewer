import type { SubmitEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/helpers/helpers";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Login = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      dispatch({ type: "LOGIN", payload: data });
      navigate("/dashboard", { replace: true });
      toast.success(`Welcome back ${data?.name}!`, { position: "top-right" });
    },
    onError: (error) => {
      toast.error(`${error.message}`, { position: "top-right" });
    },
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      toast.error("Inputs must be filled correctly", { position: "top-right" });
      return;
    }

    const user = { email, password };
    loginMutation.mutate(user);
  };

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" name="password" type="password" required />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 mt-6">
                <Button type="submit" className="w-full">
                  Login with email
                </Button>
                <p className="text-sm">
                  Don't have an account yet?{" "}
                  <a className="underline text-blue-500" href="/register">
                    Register
                  </a>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
