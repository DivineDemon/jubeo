"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Lightbulb } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  BUDGET_OPTIONS,
  CATEGORIES,
  EXAMPLE_IDEAS,
  TIMELINE_OPTIONS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { IdeaFormData } from "@/types";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface IdeaFormProps {
  onSubmit: (data: IdeaFormData) => void;
  isLoading: boolean;
}

const ideaFormSchema = z.object({
  budget: z
    .string()
    .max(100, "Budget must be less than 100 characters.")
    .optional(),
  timeline: z
    .string()
    .max(100, "Timeline must be less than 100 characters.")
    .optional(),
  category: z
    .string()
    .max(100, "Category must be less than 100 characters.")
    .optional(),
  targetMarket: z
    .string()
    .max(200, "Target market must be less than 200 characters.")
    .optional(),
  idea: z
    .string()
    .min(20, "Please describe your idea in at least 20 characters.")
    .max(2000, "Idea must be less than 2000 characters."),
});

export function IdeaForm({ onSubmit, isLoading }: IdeaFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const form = useForm<z.infer<typeof ideaFormSchema>>({
    resolver: zodResolver(ideaFormSchema),
    defaultValues: {
      idea: "",
      budget: "",
      category: "",
      timeline: "",
      targetMarket: "",
    },
  });

  function handleSubmit(data: z.infer<typeof ideaFormSchema>) {
    onSubmit(data);
  }

  function applyExample(example: string) {
    form.setValue("idea", example);
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="w-full grid grid-cols-2 items-start justify-start gap-5"
    >
      <Field className="col-span-2">
        <FieldLabel htmlFor="idea">
          Describe Your App Idea <span className="text-destructive">*</span>
        </FieldLabel>
        <Textarea
          id="idea"
          className="h-52"
          {...form.register("idea")}
          placeholder="Describe your app idea in detail. What problem does it solve? Who is it for? What makes it unique? The more detail you provide, the better the analysis..."
        />
        <FieldError
          errors={
            form.formState.errors.idea
              ? [form.formState.errors.idea]
              : undefined
          }
        />
      </Field>
      <button
        type="button"
        className="w-full col-span-2 flex items-center justify-center p-3.5 border rounded-lg"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        <span className="flex-1 text-sm text-left font-medium">
          Show Advanced
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 transition-transform duration-200",
            showAdvanced ? "rotate-180" : "",
          )}
        />
      </button>
      {showAdvanced && (
        <>
          <Field>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError
              errors={
                form.formState.errors.category
                  ? [form.formState.errors.category]
                  : undefined
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="targetMarket">Target Market</FieldLabel>
            <Input
              id="targetMarket"
              {...form.register("targetMarket")}
              placeholder="e.g. SMB owners in the US"
              maxLength={200}
            />
            <FieldError
              errors={
                form.formState.errors.targetMarket
                  ? [form.formState.errors.targetMarket]
                  : undefined
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="budget">Budget</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                {BUDGET_OPTIONS.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError
              errors={
                form.formState.errors.budget
                  ? [form.formState.errors.budget]
                  : undefined
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="timeline">Timeline</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                {TIMELINE_OPTIONS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError
              errors={
                form.formState.errors.timeline
                  ? [form.formState.errors.timeline]
                  : undefined
              }
            />
          </Field>
        </>
      )}
      <div className="w-full col-span-2 flex flex-col items-center justify-center gap-2.5">
        <Label htmlFor="examples" className="w-full text-left">
          Try an example idea
        </Label>
        {EXAMPLE_IDEAS.map((ex) => (
          <button
            type="button"
            key={ex.slice(0, 60)}
            onClick={() => applyExample(ex)}
            className="text-left text-sm text-primary px-3 py-2 rounded-lg border border-primary/50 hover:border-primary hover:bg-primary/10 transition-colors flex items-start justify-start gap-2 cursor-pointer"
          >
            <Lightbulb className="size-4 shrink-0 mt-1" />
            <span className="flex-1 text-left line-clamp-2">{ex}</span>
          </button>
        ))}
      </div>
      <Button
        size="lg"
        type="submit"
        disabled={isLoading}
        className="w-full col-span-2"
      >
        {isLoading ? "Analyzing your idea…" : "Validate My Idea →"}
      </Button>
      <p className="w-full col-span-2 text-center text-xs text-primary">
        Analysis typically takes 15-30 seconds using Gemini
      </p>
    </form>
  );
}
