import MaxWidthWrapper from "@/components/ui/max-width-wrapper";

const Hero = () => {
  return (
    <MaxWidthWrapper parentBorder="border-none">
      <div className="w-full p-5 md:px-0 md:py-15 max-w-full md:max-w-2/3 mx-auto flex flex-col items-center justify-center gap-2.5 md:gap-5 text-center pointer-events-auto">
        <p className="px-5 py-1.5 rounded-full bg-background/10 backdrop-blur-md text-xs md:text-sm font-medium flex items-center justify-center gap-2 border">
          AI-Powered Startup Validation
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Validate Your App Idea
        </h1>
        <p className="w-full text-center font-medium text-xs md:text-base">
          Get a comprehensive reality-check on your startup idea. AI analyzes
          market size, competitors, feasibility, monetization potential and more
          — in under 30 seconds.
        </p>
      </div>
    </MaxWidthWrapper>
  );
};

export default Hero;
