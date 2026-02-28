import { Blocks, Bot, ChartPie, Film, MessageCircle, Settings2 } from "lucide-react";

const features = [
  {
    icon: Settings2,
    title: "Any Job Description",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam quod quisquam saepe.",
  },
  {
    icon: Blocks,
    title: "ATS Optimized",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam quod quisquam saepe.",
  },
  {
    icon: Bot,
    title: "AI-Powered",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam quod quisquam saepe.",
  },
  {
    icon: Film,
    title: "Application Ready",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam quod quisquam saepe.",
  },
  {
    icon: ChartPie,
    title: "Analyze Keywords",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam quod quisquam saepe.",
  },
  {
    icon: MessageCircle,
    title: "Get Interviews",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam quod quisquam saepe.",
  },
];

const Features = () => {
  return (
    <div className="flex min-h-screen items-center justify-center py-12">
      <div>
        <h2 className="text-center font-semibold text-4xl tracking-tight sm:text-5xl">
          Optimize Your Resume
        </h2>
        <div className="mx-auto mt-10 grid max-w-(--breakpoint-lg) gap-6 px-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div className="flex flex-col rounded-xl border px-5 py-6" key={feature.title}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <feature.icon className="size-5" />
              </div>
              <span className="font-semibold text-lg">{feature.title}</span>
              <p className="mt-1 text-[15px] text-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
