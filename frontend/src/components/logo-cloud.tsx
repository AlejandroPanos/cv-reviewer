import { Logo01, Logo02, Logo03, Logo04 } from "@/components/logos";

const LogoCloud = () => {
  return (
    <div className="w-full flex items-center justify-center px-6 mt-16">
      <div>
        <p className="text-center">Our users have landed jobs in companies like:</p>

        <div className="w-full mt-6 flex items-center justify-center gap-4">
          <Logo01 />
          <Logo02 />
          <Logo03 />
          <Logo04 />
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;
