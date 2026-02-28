import { AlertTriangle } from "lucide-react";
import type { IdeaFormData } from "@/types";
import { IdeaForm } from "../core/idea-form";
import MaxWidthWrapper from "../ui/max-width-wrapper";

interface FormContainerProps {
  isError: boolean;
  isAnalyzing: boolean;
  onSubmit: (formData: IdeaFormData) => void;
}

const FormContainer = ({
  isError,
  isAnalyzing,
  onSubmit,
}: FormContainerProps) => {
  return (
    <MaxWidthWrapper parentBorder="border-b">
      <div className="w-full flex flex-col items-start justify-start p-5 gap-5">
        {isError && (
          <div className="w-full p-3 rounded-md bg-destructive/10 border border-destructive flex flex-col items-center justify-center gap-1">
            <div className="w-full flex items-center justify-center gap-2.5">
              <AlertTriangle className="text-destructive shrink-0 size-4" />
              <span className="flex-1 text-left font-medium text-destructive">
                Analysis Failed
              </span>
            </div>
            <span className="text-sm w-full text-left text-destructive">
              Make sure your GEMINI_API_KEY is set in your .env.local file.
            </span>
          </div>
        )}
        <IdeaForm onSubmit={onSubmit} isLoading={isAnalyzing} />
        <div className="w-full flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span>✓ No account required</span>
          <span>✓ Results in ~20 seconds</span>
          <span>✓ Export to PDF or Markdown</span>
          <span>✓ 6 validation dimensions</span>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default FormContainer;
