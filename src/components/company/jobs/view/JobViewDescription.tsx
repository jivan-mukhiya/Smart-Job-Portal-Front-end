interface JobViewDescriptionProps {
  description: string | null;
  responsibilities: string | null;
  requirements: string | null;
}

interface DescriptionSectionProps {
  title: string;
  content: string | null;
}

function DescriptionSection({
  title,
  content,
}: DescriptionSectionProps) {
  if (!content?.trim()) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-3 text-lg font-bold text-gray-900">
        {title}
      </h2>

      <div className="whitespace-pre-line text-sm leading-7 text-gray-600">
        {content}
      </div>
    </section>
  );
}

export function JobViewDescription({
  description,
  responsibilities,
  requirements,
}: JobViewDescriptionProps) {
  const hasContent =
    Boolean(description?.trim()) ||
    Boolean(responsibilities?.trim()) ||
    Boolean(requirements?.trim());

  if (!hasContent) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="space-y-8">
        <DescriptionSection
          title="Job Description"
          content={description}
        />

        <DescriptionSection
          title="Responsibilities"
          content={responsibilities}
        />

        <DescriptionSection
          title="Requirements"
          content={requirements}
        />
      </div>
    </div>
  );
}