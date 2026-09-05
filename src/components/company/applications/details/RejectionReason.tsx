interface Props {
  reason: string | null;
}

export function RejectionReason({
  reason,
}: Props) {
  if (!reason) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-red-200 bg-red-50 p-6">

      <h2 className="font-bold text-red-900">
        Rejection Reason
      </h2>

      <p className="mt-2 whitespace-pre-line text-sm leading-7 text-red-700">
        {reason}
      </p>

    </section>
  );
}