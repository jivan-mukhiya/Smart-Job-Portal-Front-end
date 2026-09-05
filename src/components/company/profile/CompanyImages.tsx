"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ImageIcon,
  Upload,
  X,
} from "lucide-react";

interface CompanyImagesProps {
  logoFile: File | null;
  bannerFile: File | null;

  existingLogoUrl?: string | null;
  existingBannerUrl?: string | null;

  logoRemoved?: boolean;
  bannerRemoved?: boolean;

  onLogoChange: (
    file: File | null,
  ) => void;

  onBannerChange: (
    file: File | null,
  ) => void;

  onRemoveLogo?: () => void;

  onRemoveBanner?: () => void;
}

export function CompanyImages({
  logoFile,
  bannerFile,

  existingLogoUrl,
  existingBannerUrl,

  logoRemoved = false,
  bannerRemoved = false,

  onLogoChange,
  onBannerChange,

  onRemoveLogo,
  onRemoveBanner,
}: CompanyImagesProps) {
  const [logoPreview, setLogoPreview] =
    useState<string | null>(
      null,
    );

  const [bannerPreview, setBannerPreview] =
    useState<string | null>(
      null,
    );

  /* =====================================================
     LOGO PREVIEW
  ===================================================== */

  useEffect(() => {
    if (logoFile) {
      const url =
        URL.createObjectURL(
          logoFile,
        );

      setLogoPreview(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }

    if (
      !logoRemoved &&
      existingLogoUrl
    ) {
      setLogoPreview(
        existingLogoUrl,
      );

      return;
    }

    setLogoPreview(null);
  }, [
    logoFile,
    existingLogoUrl,
    logoRemoved,
  ]);

  /* =====================================================
     BANNER PREVIEW
  ===================================================== */

  useEffect(() => {
    if (bannerFile) {
      const url =
        URL.createObjectURL(
          bannerFile,
        );

      setBannerPreview(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }

    if (
      !bannerRemoved &&
      existingBannerUrl
    ) {
      setBannerPreview(
        existingBannerUrl,
      );

      return;
    }

    setBannerPreview(null);
  }, [
    bannerFile,
    existingBannerUrl,
    bannerRemoved,
  ]);

  /* =====================================================
     LOGO INPUT
  ===================================================== */

  const handleLogoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      event.target.files?.[0] ??
      null;

    onLogoChange(file);

    event.target.value = "";
  };

  /* =====================================================
     BANNER INPUT
  ===================================================== */

  const handleBannerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      event.target.files?.[0] ??
      null;

    onBannerChange(file);

    event.target.value = "";
  };

  /* =====================================================
     REMOVE LOGO
  ===================================================== */

  const handleRemoveLogo = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    event.stopPropagation();

    if (logoFile) {
      onLogoChange(null);

      return;
    }

    onRemoveLogo?.();
  };

  /* =====================================================
     REMOVE BANNER
  ===================================================== */

  const handleRemoveBanner = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    event.stopPropagation();

    if (bannerFile) {
      onBannerChange(null);

      return;
    }

    onRemoveBanner?.();
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      {/* HEADER */}

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <ImageIcon size={20} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Company Images
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload your company logo and banner image.
          </p>
        </div>
      </div>

      {/* UPLOADS */}

      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        {/* =================================================
            LOGO
        ================================================= */}

        <div>
          <p className="mb-2 text-sm font-semibold text-slate-800">
            Company Logo
          </p>

          <label
            htmlFor="company-logo"
            className="group relative flex min-h-52 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-slate-400 hover:bg-slate-100"
          >
            {logoPreview ? (
              <>
                <img
                  src={logoPreview}
                  alt="Company logo preview"
                  className="h-40 w-40 rounded-2xl object-cover"
                />

                <button
                  type="button"
                  aria-label="Remove company logo"
                  onClick={
                    handleRemoveLogo
                  }
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-600 shadow transition hover:bg-red-50 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
                  <Upload size={22} />
                </div>

                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Upload company logo
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  PNG, JPG or WEBP
                </p>
              </>
            )}

            <input
              id="company-logo"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={
                handleLogoChange
              }
            />
          </label>

          {logoFile && (
            <p className="mt-2 truncate text-xs text-slate-500">
              Selected:{" "}
              {logoFile.name}
            </p>
          )}
        </div>

        {/* =================================================
            BANNER
        ================================================= */}

        <div>
          <p className="mb-2 text-sm font-semibold text-slate-800">
            Company Banner
          </p>

          <label
            htmlFor="company-banner"
            className="group relative flex min-h-52 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-slate-400 hover:bg-slate-100"
          >
            {bannerPreview ? (
              <>
                <img
                  src={bannerPreview}
                  alt="Company banner preview"
                  className="h-full min-h-52 w-full object-cover"
                />

                <button
                  type="button"
                  aria-label="Remove company banner"
                  onClick={
                    handleRemoveBanner
                  }
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-600 shadow transition hover:bg-red-50 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
                  <Upload size={22} />
                </div>

                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Upload company banner
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  PNG, JPG or WEBP
                </p>
              </>
            )}

            <input
              id="company-banner"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={
                handleBannerChange
              }
            />
          </label>

          {bannerFile && (
            <p className="mt-2 truncate text-xs text-slate-500">
              Selected:{" "}
              {bannerFile.name}
            </p>
          )}
        </div>
      </div>

      {/* INFORMATION */}

      <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3">
        <p className="text-xs leading-5 text-slate-500">
          Recommended: use a square image for your
          logo and a wide image for your banner.
          Supported formats are PNG, JPG and WEBP.
        </p>
      </div>
    </section>
  );
}
