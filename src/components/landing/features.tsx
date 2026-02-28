import { FEATURES } from "@/lib/constants";
import MaxWidthWrapper from "../ui/max-width-wrapper";

const Features = () => {
  return (
    <MaxWidthWrapper>
      <div className="w-full p-5 gap-5 grid grid-cols-1 md:grid-cols-2">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="w-full border shadow rounded-md p-2.5 flex flex-col items-start justify-start gap-2.5"
          >
            <div className="w-full flex items-center justify-center gap-2.5">
              <feature.icon className="size-5 text-primary" />
              <span className="flex-1 text-left">{feature.title}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {feature.description}
            </span>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default Features;
