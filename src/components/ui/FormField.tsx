import { FormLabel } from "./FormLabel";
import { FormError } from "./FormError";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  required = false,
  error,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div>

      <FormLabel
        htmlFor={htmlFor}
        required={required}
      >
        {label}
      </FormLabel>

      {children}

      {error ? (
        <FormError message={error} />
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      ) : null}

    </div>
  );
}