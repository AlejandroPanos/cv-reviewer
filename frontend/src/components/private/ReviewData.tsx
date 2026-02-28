import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Review } from "@/types/review";

interface ReviewDataProps {
  review: Review;
}

const ReviewData = ({ review }: ReviewDataProps) => {
  return (
    <>
      <div className="w-full flex flex-col items-center gap-8 border border-blue-200 bg-blue-50/50 rounded-xl">
        <div className="w-full flex flex-col items-start gap-4 p-6">
          <div className="w-full flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Overall Assessment</h2>
            <p
              className={`text-2xl font-semibold ${
                review?.overallAssessment?.score >= 80
                  ? "text-green-500"
                  : review?.overallAssessment?.score >= 50
                    ? "text-yellow-500"
                    : "text-red-500"
              }`}
            >
              {review?.overallAssessment?.score}/100
            </p>
          </div>
          <p className="text-neutral-600 text-sm">{review?.overallAssessment?.text}</p>
        </div>
      </div>

      <div className="w-full flex flex-col items-start gap-4">
        <h2 className="text-2xl font-semibold">Detailed Analysis</h2>
        <Accordion type="single" collapsible defaultValue="ats" className="w-full">
          <AccordionItem value="ats">
            <AccordionTrigger className="text-base">Keyword & ATS Optimization</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-4">
                <p>
                  You score was {review?.atsOptimization?.score}/100. Here are some suggestions:
                </p>
                <ul className="list-disc list-inside">
                  {review?.atsOptimization?.actionablePoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="impact">
            <AccordionTrigger className="text-base">Impact Verbs & Quanitfiables</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-4">
                <p>
                  You score was {review?.impactQuantification?.score}/100. Here are some
                  suggestions:
                </p>
                <ul className="list-disc list-inside">
                  {review?.impactQuantification?.actionablePoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="structure">
            <AccordionTrigger className="text-base">Structure & Readability</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-4">
                <p>
                  You score was {review?.structureReadability?.score}/100. Here are some
                  suggestions:
                </p>
                <ul className="list-disc list-inside">
                  {review?.structureReadability?.actionablePoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="redflags">
            <AccordionTrigger className="text-base">Red Flags</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-4">
                <p>You score was {review.redFlags?.score}/100. Here are some suggestions:</p>
                <ul className="list-disc list-inside">
                  {review.redFlags?.actionablePoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default ReviewData;
