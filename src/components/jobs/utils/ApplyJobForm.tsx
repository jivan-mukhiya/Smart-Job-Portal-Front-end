import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

interface ApplyJobFormProps {
  coverLetter: string;
  expectedSalary: string;
  noticePeriodDays: string;
  candidateNotes: string;
  submitting: boolean;

  onCoverLetterChange: (value: string) => void;
  onExpectedSalaryChange: (value: string) => void;
  onNoticePeriodDaysChange: (value: string) => void;
  onCandidateNotesChange: (value: string) => void;

  onCancel: () => void;
  onSubmit: () => void;
}

export function ApplyJobForm({
  coverLetter,
  expectedSalary,
  noticePeriodDays,
  candidateNotes,
  submitting,
  onCoverLetterChange,
  onExpectedSalaryChange,
  onNoticePeriodDaysChange,
  onCandidateNotesChange,
  onCancel,
  onSubmit,
}: ApplyJobFormProps) {
  return (
    <div className="space-y-5">
      {/* COVER LETTER */}

      <FormField
        label="Cover Letter"
        htmlFor="coverLetter"
        hint={`${coverLetter.length}/10000 characters`}
      >
        <Textarea
          id="coverLetter"
          value={coverLetter}
          onChange={(event) =>
            onCoverLetterChange(event.target.value)
          }
          maxLength={10000}
          rows={5}
          placeholder="Write a short cover letter..."
        />
      </FormField>

      {/* EXPECTED SALARY */}

      <FormField
        label="Expected Salary"
        htmlFor="expectedSalary"
        hint="Enter your expected salary amount."
      >
        <Input
          id="expectedSalary"
          type="number"
          min="0"
          value={expectedSalary}
          onChange={(event) =>
            onExpectedSalaryChange(event.target.value)
          }
          placeholder="e.g. 80000"
        />
      </FormField>

      {/* NOTICE PERIOD */}

      <FormField
        label="Notice Period"
        htmlFor="noticePeriodDays"
        hint="How many days would you need before joining?"
      >
        <div className="flex items-center gap-3">
          <Input
            id="noticePeriodDays"
            type="number"
            min="0"
            value={noticePeriodDays}
            onChange={(event) =>
              onNoticePeriodDaysChange(
                event.target.value,
              )
            }
            placeholder="e.g. 30"
          />

          <span className="shrink-0 text-sm text-slate-500">
            days
          </span>
        </div>
      </FormField>

      {/* CANDIDATE NOTES */}

      <FormField
        label="Additional Notes"
        htmlFor="candidateNotes"
        hint={`${candidateNotes.length}/2000 characters`}
      >
        <Textarea
          id="candidateNotes"
          value={candidateNotes}
          onChange={(event) =>
            onCandidateNotesChange(event.target.value)
          }
          maxLength={2000}
          rows={4}
          placeholder="Anything else you want the employer to know..."
        />
      </FormField>

      {/* ACTIONS */}

      <div className="flex gap-3 pt-1">
        <Button
          type="button"
          variant="outline"
          fullWidth
          disabled={submitting}
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="button"
          fullWidth
          disabled={submitting}
          leftIcon={
            submitting ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <Send size={16} />
            )
          }
          onClick={onSubmit}
        >
          {submitting
            ? "Submitting..."
            : "Submit Application"}
        </Button>
      </div>
    </div>
  );
}