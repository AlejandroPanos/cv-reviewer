import type { SubmitEvent } from "react";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import ReviewData from "./ReviewData";
import { useMutation } from "@tanstack/react-query";
import { createReview } from "@/helpers/helpers";
import { toast } from "sonner";
import JSConfetti from "js-confetti";

const ReviewForm = () => {
  const jsConfetti = new JSConfetti();

  const reviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      jsConfetti.addConfetti();
      toast.success("Review generated successfully!", { position: "top-right" });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-right" });
    },
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const resumeText = formData.get("text");
    const jobDescriptionText = formData.get("description");

    if (typeof resumeText !== "string" || typeof jobDescriptionText !== "string") {
      toast.error("Please fill in the inputs correctly.");
      return;
    }

    const review = { resumeText, jobDescriptionText };
    reviewMutation.mutate(review);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
        <div className="w-full flex flex-col items-start gap-2">
          <label className="text-xs font-semibold" htmlFor="text">
            Your CV*
          </label>
          <Textarea
            className="min-h-48"
            name="text"
            id="text"
            rows={10}
            placeholder="Paste here all your CV text, including professional summary, experience and education."
            required
          />
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <label className="text-xs font-semibold" htmlFor="description">
            Job Description*
          </label>
          <Textarea
            className="min-h-48"
            name="description"
            id="description"
            rows={10}
            placeholder="Paste here the description of the job you are applying for."
            required
          />
        </div>
        <Button className="w-full" type="submit">
          {reviewMutation.isPending ? "Analysing..." : "Check my CV"}
        </Button>
      </form>
      {reviewMutation.data ? <ReviewData review={reviewMutation.data} /> : null}
    </>
  );
};

export default ReviewForm;
