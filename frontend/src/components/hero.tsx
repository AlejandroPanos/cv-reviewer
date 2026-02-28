import { ArrowUpRight, LogIn } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LogoCloud from "./logo-cloud";

export default function Hero() {
  return (
    <div className="flex h-[calc(100vh-12rem)] items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <Badge asChild className="rounded-full border-border py-1" variant="secondary">
          <Link to="/register">
            Join over 5.000 job seekers <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Badge>
        <h1 className="mt-6 font-semibold text-4xl tracking-tighter sm:text-5xl md:text-6xl md:leading-[1.2] lg:text-7xl">
          Never Apply For Jobs With A Poor Resume Again
        </h1>
        <p className="mt-6 text-foreground/80 md:text-lg">
          Just give us your resume text and your job description. We will make sure that your resume
          matches 100% of the criteria specified in the job description so you can apply with
          confidence.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button asChild>
            <a href="/register">
              Get Started <ArrowUpRight className="size-5" />
            </a>
          </Button>
          <Button variant="outline">
            <LogIn className="size-5" /> Log In
          </Button>
        </div>
        <LogoCloud />
      </div>
    </div>
  );
}
