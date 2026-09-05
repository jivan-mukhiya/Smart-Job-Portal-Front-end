import { CompanyProfilePage } from "@/components/jobseeker/companies/profile/CompanyProfilePage";

interface CompanyDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CompanyDetailsPage({
  params,
}: CompanyDetailsPageProps) {
  const { id } = await params;

  const companyId = Number(id);

  if (!Number.isInteger(companyId) || companyId <= 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-950">
            Invalid company
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The company ID is not valid.
          </p>
        </div>
      </div>
    );
  }

  return (
    <CompanyProfilePage
      companyId={companyId}
    />
  );
}