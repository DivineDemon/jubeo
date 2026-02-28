import Dither from "@/components/ui/dither";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";

const Hero = () => {
  return (
    <MaxWidthWrapper parentBorder="border-none">
      <div className="w-full relative min-h-[40vh]">
        <div className="absolute inset-0">
          <Dither
            colorNum={4}
            waveSpeed={0.05}
            waveFrequency={3}
            waveAmplitude={0.3}
            disableAnimation={false}
            waveColor={[0.5, 0.5, 0.5]}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-2/3 mx-auto flex flex-col items-center justify-center gap-5 text-center pointer-events-auto">
            <p className="px-5 py-1.5 rounded-full bg-background/10 backdrop-blur-md text-sm font-medium flex items-center justify-center gap-2 border">
              AI-Powered Startup Validation
            </p>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              Validate Your App Idea
            </h1>
            <p className="w-full text-center font-medium">
              Get a comprehensive reality-check on your startup idea. AI
              analyzes market size, competitors, feasibility, monetization
              potential and more — in under 30 seconds.
            </p>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Hero;
