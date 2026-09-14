"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  FileText,
  ImagePlus,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { FormLabel } from "@/components/ui/FormLabel";
import { FormError } from "@/components/ui/FormError";

import { useJobSeekerProfile } from "@/hooks/useJobSeekerProfile";

import { jobSeekerService } from "@/services/jobseeker.service";

import { routes } from "@/config/routes";

export default function EditProfileForm() {
  const router = useRouter();

  // =============================================================
  // PROFILE
  // =============================================================

  const {
    profile,
    loading,
    error: profileError,
    profileNotFound,
    refetch,
  } = useJobSeekerProfile();

  // =============================================================
  // FORM STATE
  // =============================================================

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [professionalTitle, setProfessionalTitle] =
    useState("");

  const [about, setAbout] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [yearsOfExperience, setYearsOfExperience] =
    useState<number | "">("");

  const [highestEducation, setHighestEducation] =
    useState("");

  const [resumeUrl, setResumeUrl] =
    useState("");

  // =============================================================
  // JOB PREFERENCE
  // =============================================================

  const [openToWork, setOpenToWork] =
    useState(false);

  // =============================================================
  // SKILLS
  // =============================================================

  const [skills, setSkills] =
    useState<string[]>([]);

  const [newSkill, setNewSkill] =
    useState("");

  // =============================================================
  // SOCIAL PROFILES
  // =============================================================

  const [linkedinUrl, setLinkedinUrl] =
    useState("");

  const [githubUrl, setGithubUrl] =
    useState("");

  // =============================================================
  // FILES
  // =============================================================

  const [profileImage, setProfileImage] =
    useState<File | null>(null);

  const [resumeFile, setResumeFile] =
    useState<File | null>(null);

  // =============================================================
  // UI STATE
  // =============================================================

  const [saving, setSaving] =
    useState(false);

  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  // =============================================================
  // POPULATE FORM
  // =============================================================

  useEffect(() => {
    if (!profile) {
      return;
    }

    setFullName(
      profile.fullName ?? ""
    );

    setEmail(
      profile.email ?? ""
    );

    setPhone(
      profile.phone ?? ""
    );

    setProfessionalTitle(
      profile.professionalTitle ?? ""
    );

    setAbout(
      profile.about ?? ""
    );

    setAddress(
      profile.address ?? ""
    );

    setYearsOfExperience(
      profile.yearsOfExperience ?? ""
    );

    setHighestEducation(
      profile.highestEducation ?? ""
    );

    setResumeUrl(
      profile.resume?.resumeUrl ?? ""
    );

    setOpenToWork(
      profile.openToWork ?? false
    );

    // =========================================================
    // SKILLS
    // =========================================================

    const loadedSkills =
      (profile.skills ?? [])
        .filter(
          (skill) =>
            skill.active !== false
        )
        .sort(
          (a, b) =>
            a.displayOrder -
            b.displayOrder
        )
        .map(
          (skill) =>
            skill.skillName
        );

    /*
     * Remove duplicate skills immediately.
     */
    const uniqueSkills =
      Array.from(
        new Map(
          loadedSkills.map(
            (skill) => [
              skill.toLowerCase().trim(),
              skill.trim(),
            ]
          )
        ).values()
      );

    setSkills(
      uniqueSkills
    );

    // =========================================================
    // SOCIAL PROFILES
    // =========================================================

    const socialProfiles =
      (profile.socialProfiles ?? [])
        .filter(
          (social) =>
            social.active !== false
        );

    const linkedin =
      socialProfiles.find(
        (social) =>
          social.platform
            ?.toLowerCase() ===
          "linkedin"
      );

    const github =
      socialProfiles.find(
        (social) =>
          social.platform
            ?.toLowerCase() ===
          "github"
      );

    setLinkedinUrl(
      linkedin?.url ?? ""
    );

    setGithubUrl(
      github?.url ?? ""
    );

    /*
     * Existing files are not placed into File state.
     */
    setProfileImage(null);
    setResumeFile(null);

  }, [profile]);

  // =============================================================
  // ADD SKILL
  // =============================================================

  const addSkill = () => {
    const skill =
      newSkill.trim();

    if (!skill) {
      return;
    }

    const alreadyExists =
      skills.some(
        (item) =>
          item.trim().toLowerCase() ===
          skill.toLowerCase()
      );

    if (alreadyExists) {
      setNewSkill("");
      return;
    }

    setSkills(
      (current) => [
        ...current,
        skill,
      ]
    );

    setNewSkill("");
  };

  // =============================================================
  // REMOVE SKILL
  // =============================================================

  const removeSkill = (
    skill: string
  ) => {
    setSkills(
      (current) =>
        current.filter(
          (item) =>
            item !== skill
        )
    );
  };

  // =============================================================
  // PROFILE IMAGE
  // =============================================================

  const handleProfileImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setProfileImage(file);
  };

  // =============================================================
  // RESUME
  // =============================================================

  const handleResumeFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setResumeFile(file);
  };

  // =============================================================
  // SUBMIT
  // =============================================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (saving) {
      return;
    }

    setSaving(true);
    setSubmitError(null);
    setSuccessMessage(null);

    try {
      const formData =
        new FormData();

      // =========================================================
      // PERSONAL INFORMATION
      // =========================================================

      formData.append(
        "fullName",
        fullName.trim()
      );

      formData.append(
        "email",
        email.trim()
      );

      formData.append(
        "phone",
        phone.trim()
      );

      formData.append(
        "professionalTitle",
        professionalTitle.trim()
      );

      formData.append(
        "about",
        about.trim()
      );

      formData.append(
        "address",
        address.trim()
      );

      // =========================================================
      // PROFESSIONAL INFORMATION
      // =========================================================

      if (
        yearsOfExperience !== ""
      ) {
        formData.append(
          "yearsOfExperience",
          String(
            yearsOfExperience
          )
        );
      }

      formData.append(
        "highestEducation",
        highestEducation.trim()
      );

      // =========================================================
      // PROFILE IMAGE
      // =========================================================

      if (profileImage) {
        formData.append(
          "profileImage",
          profileImage
        );
      }

      // =========================================================
      // RESUME FILE
      // =========================================================

      if (resumeFile) {
        formData.append(
          "resumeFile",
          resumeFile
        );
      }

      // =========================================================
      // RESUME URL
      // =========================================================

      /*
       * Only send resumeUrl if user entered one.
       *
       * If a new resume file is selected,
       * the file should take priority on backend.
       */

      if (resumeUrl.trim()) {
        formData.append(
          "resumeUrl",
          resumeUrl.trim()
        );
      }

      // =========================================================
      // OPEN TO WORK
      // =========================================================

      formData.append(
        "openToWork",
        String(openToWork)
      );

      // =========================================================
      // SKILLS
      // =========================================================

      /*
       * Normalize skills before sending.
       *
       * Example:
       *
       * Java
       * java
       * JAVA
       *
       * becomes:
       *
       * java
       */

      const normalizedSkills =
        Array.from(
          new Set(
            skills
              .map(
                (skill) =>
                  skill
                    .trim()
                    .toLowerCase()
              )
              .filter(Boolean)
          )
        );

      /*
       * Send every skill as:
       *
       * skills=java
       * skills=spring boot
       * skills=react
       */

      normalizedSkills.forEach(
        (skill) => {
          formData.append(
            "skills",
            skill
          );
        }
      );

      /*
       * If update has zero skills,
       * send an empty skills field.
       */

      if (
        !profileNotFound &&
        normalizedSkills.length === 0
      ) {
        formData.append(
          "skills",
          ""
        );
      }

      // =========================================================
      // SOCIAL PROFILES
      // =========================================================

      const socialProfiles: {
        platform: string;
        url: string;
      }[] = [];

      if (linkedinUrl.trim()) {
        socialProfiles.push({
          platform: "LinkedIn",
          url: linkedinUrl.trim(),
        });
      }

      if (githubUrl.trim()) {
        socialProfiles.push({
          platform: "GitHub",
          url: githubUrl.trim(),
        });
      }

      socialProfiles.forEach(
        (
          socialProfile,
          index
        ) => {
          formData.append(
            `socialProfiles[${index}].platform`,
            socialProfile.platform
          );

          formData.append(
            `socialProfiles[${index}].url`,
            socialProfile.url
          );
        }
      );

      // =========================================================
      // DEBUG
      // =========================================================

      console.log(
        "Job seeker FormData:"
      );

      for (
        const [key, value]
        of formData.entries()
      ) {
        console.log(
          key,
          value
        );
      }

      // =========================================================
      // CREATE
      // =========================================================

      if (profileNotFound) {
        await jobSeekerService.createProfile(
          formData
        );

        setSuccessMessage(
          "Profile created successfully."
        );
      }

      // =========================================================
      // UPDATE
      // =========================================================

      else {
        await jobSeekerService.updateMyProfile(
          formData
        );

        setSuccessMessage(
          "Profile updated successfully."
        );
      }

      // =========================================================
      // REFRESH PROFILE
      // =========================================================

      await refetch();

      // =========================================================
      // NAVIGATE TO PROFILE VIEW
      // =========================================================

      /*
       * After successful create/update,
       * go to:
       *
       * /dashboard/jobseeker/profile
       *
       * using centralized routes.
       */

      router.push(
        routes.jobseeker.profile.view
      );

    } catch (err: any) {
      console.error(
        "Failed to save job seeker profile:",
        err
      );

      setSubmitError(
        err?.message ||
        "Unable to save your profile."
      );

    } finally {
      setSaving(false);
    }
  };

  // =============================================================
  // LOADING
  // =============================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="rounded-2xl border border-slate-200 bg-white p-8">

            <p className="text-sm text-slate-500">
              Loading your profile...
            </p>

          </div>

        </div>

      </main>
    );
  }

  // =============================================================
  // PROFILE ERROR
  // =============================================================

  if (
    profileError &&
    !profileNotFound
  ) {
    return (
      <main className="min-h-screen bg-slate-50">

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

            <p className="text-sm font-medium text-red-600">
              {profileError}
            </p>

            <button
              type="button"
              onClick={refetch}
              className="mt-4 text-sm font-semibold text-red-700 underline"
            >
              Try again
            </button>

          </div>

        </div>

      </main>
    );
  }

  // =============================================================
  // PAGE
  // =============================================================

  return (
    <main className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =====================================================
            BACK
        ===================================================== */}

        <Link
          href={
            routes.jobseeker.profile.view
          }
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-500
            transition
            hover:text-slate-950
          "
        >
          <ArrowLeft size={16} />

          Back to Profile
        </Link>

        {/* =====================================================
            HEADING
        ===================================================== */}

        <div className="mt-6">

          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            {profileNotFound
              ? "Create Profile"
              : "Edit Profile"}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {profileNotFound
              ? "Create your professional profile so companies can learn more about your experience and skills."
              : "Keep your professional profile up to date so companies can better understand your experience and skills."}
          </p>

        </div>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {submitError && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

            <p className="text-sm text-red-600">
              {submitError}
            </p>

          </div>
        )}

        {/* =====================================================
            SUCCESS
        ===================================================== */}

        {successMessage && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3">

            <p className="text-sm text-green-600">
              {successMessage}
            </p>

          </div>
        )}

        {/* =====================================================
            FORM
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          {/* ===================================================
              PERSONAL INFORMATION
          =================================================== */}

          <FormSection
            title="Personal Information"
            description="Your basic professional information."
          >

            <div className="grid gap-5 sm:grid-cols-2">

              <Field>

                <FormLabel
                  htmlFor="fullName"
                  required
                >
                  Full Name
                </FormLabel>

                <Input
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(
                      event.target.value
                    )
                  }
                  placeholder="Enter your full name"
                  maxLength={150}
                  required
                />

                <FormError />

              </Field>

              <Field>

                <FormLabel
                  htmlFor="email"
                  required
                >
                  Email
                </FormLabel>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="Enter your email"
                  maxLength={150}
                  required
                />

                <FormError />

              </Field>

              <Field>

                <FormLabel
                  htmlFor="phone"
                  required
                >
                  Phone Number
                </FormLabel>

                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(
                      event.target.value
                    )
                  }
                  placeholder="+977 98XXXXXXXX"
                  maxLength={30}
                  required
                />

                <FormError />

              </Field>

              <Field>

                <FormLabel
                  htmlFor="professionalTitle"
                  required
                >
                  Professional Title
                </FormLabel>

                <Input
                  id="professionalTitle"
                  name="professionalTitle"
                  value={professionalTitle}
                  onChange={(event) =>
                    setProfessionalTitle(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Java Backend Developer"
                  maxLength={150}
                  required
                />

                <FormError />

              </Field>

            </div>

            <Field className="mt-5">

              <FormLabel htmlFor="about">
                About
              </FormLabel>

              <Textarea
                id="about"
                name="about"
                value={about}
                onChange={(event) =>
                  setAbout(
                    event.target.value
                  )
                }
                placeholder="Tell companies about yourself..."
                maxLength={1000}
              />

              <p className="mt-1.5 text-xs text-slate-400">
                Maximum 1000 characters.
              </p>

            </Field>

            <Field className="mt-5">

              <FormLabel htmlFor="address">
                Address
              </FormLabel>

              <Input
                id="address"
                name="address"
                value={address}
                onChange={(event) =>
                  setAddress(
                    event.target.value
                  )
                }
                placeholder="e.g. Kathmandu, Nepal"
                maxLength={500}
              />

              <FormError />

            </Field>

          </FormSection>

          {/* ===================================================
              PROFESSIONAL INFORMATION
          =================================================== */}

          <FormSection
            title="Professional Information"
            description="Tell companies about your experience and education."
          >

            <div className="grid gap-5 sm:grid-cols-2">

              <Field>

                <FormLabel
                  htmlFor="experienceYears"
                  required
                >
                  Years of Experience
                </FormLabel>

                <Input
                  id="experienceYears"
                  name="yearsOfExperience"
                  type="number"
                  min={0}
                  max={50}
                  value={yearsOfExperience}
                  onChange={(event) => {

                    const value =
                      event.target.value;

                    setYearsOfExperience(
                      value === ""
                        ? ""
                        : Number(value)
                    );
                  }}
                  placeholder="e.g. 2"
                  required
                />

                <FormError />

              </Field>

              <Field>

                <FormLabel
                  htmlFor="highestEducation"
                  required
                >
                  Highest Education
                </FormLabel>

                <Input
                  id="highestEducation"
                  name="highestEducation"
                  value={highestEducation}
                  onChange={(event) =>
                    setHighestEducation(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Bachelor of Computer Application"
                  maxLength={200}
                  required
                />

                <FormError />

              </Field>

            </div>

          </FormSection>

          {/* ===================================================
              PROFILE IMAGE
          =================================================== */}

          <FormSection
            title="Profile Image"
            description="Use a professional photo for your profile."
          >

            {profile?.profileImage?.imageUrl && (
              <div className="mb-5">

                <p className="mb-2 text-xs font-medium text-slate-500">
                  Current Profile Image
                </p>

                <div className="flex items-center gap-4">

                  <img
                    src={
                      profile.profileImage.imageUrl
                    }
                    alt="Current profile"
                    className="
                      h-20
                      w-20
                      rounded-xl
                      object-cover
                      ring-1
                      ring-slate-200
                    "
                  />

                  <div>

                    <p className="text-sm font-semibold text-slate-700">
                      {
                        profile.profileImage.fileName ||
                        "Current profile image"
                      }
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Select a new image below to replace it.
                    </p>

                  </div>

                </div>

              </div>
            )}

            <div>

              <FormLabel htmlFor="profileImage">
                {profile?.profileImage
                  ? "Replace Profile Image"
                  : "Profile Image"}
              </FormLabel>

              <label
                htmlFor="profileImage"
                className="
                  mt-2
                  flex
                  cursor-pointer
                  items-center
                  gap-4
                  rounded-xl
                  border
                  border-dashed
                  border-slate-300
                  bg-slate-50
                  px-5
                  py-5
                  transition
                  hover:border-slate-400
                  hover:bg-slate-100
                "
              >

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">

                  <ImagePlus size={21} />

                </div>

                <div className="min-w-0">

                  <p className="text-sm font-semibold text-slate-700">
                    {profileImage
                      ? profileImage.name
                      : "Choose a profile image"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    PNG, JPG or WEBP
                  </p>

                </div>

                <input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleProfileImage}
                  className="hidden"
                />

              </label>

            </div>

          </FormSection>

          {/* ===================================================
              RESUME
          =================================================== */}

          <FormSection
            title="Resume"
            description="Upload your resume or provide an existing resume URL."
          >

            {profile?.resume && (
              <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">

                    <FileText size={20} />

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold text-slate-700">
                      {
                        profile.resume.fileName ||
                        "Current resume"
                      }
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {
                        profile.resume.contentType ||
                        "Resume"
                      }
                    </p>

                  </div>

                  {profile.resume.fileUrl && (
                    <a
                      href={
                        profile.resume.fileUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-slate-700 hover:text-slate-950"
                    >
                      View
                    </a>
                  )}

                </div>

              </div>
            )}

            <Field>

              <FormLabel htmlFor="resumeFile">
                {profile?.resume
                  ? "Replace Resume"
                  : "Resume File"}
              </FormLabel>

              <label
                htmlFor="resumeFile"
                className="
                  mt-2
                  flex
                  cursor-pointer
                  items-center
                  gap-4
                  rounded-xl
                  border
                  border-dashed
                  border-slate-300
                  bg-slate-50
                  px-5
                  py-5
                  transition
                  hover:border-slate-400
                  hover:bg-slate-100
                "
              >

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">

                  <FileText size={21} />

                </div>

                <div className="min-w-0">

                  <p className="text-sm font-semibold text-slate-700">
                    {resumeFile
                      ? resumeFile.name
                      : "Choose your resume"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    PDF recommended
                  </p>

                </div>

                <input
                  id="resumeFile"
                  name="resumeFile"
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeFile}
                  className="hidden"
                />

              </label>

            </Field>

            <Field className="mt-5">

              <FormLabel htmlFor="resumeUrl">
                Resume URL
              </FormLabel>

              <Input
                id="resumeUrl"
                name="resumeUrl"
                type="url"
                value={resumeUrl}
                onChange={(event) =>
                  setResumeUrl(
                    event.target.value
                  )
                }
                placeholder="https://example.com/resume.pdf"
                leftIcon={
                  <FileText size={17} />
                }
                maxLength={500}
              />

              <FormError />

            </Field>

          </FormSection>

          {/* ===================================================
              SKILLS
          =================================================== */}

          <FormSection
            title="Skills"
            description="Add the technologies and skills you are comfortable with."
          >

            <div className="flex flex-wrap gap-2">

              {skills.length === 0 ? (

                <p className="text-sm text-slate-400">
                  No skills added yet.
                </p>

              ) : (

                skills.map(
                  (skill) => (

                    <div
                      key={skill}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-slate-200
                        bg-slate-50
                        px-3
                        py-2
                      "
                    >

                      <span className="text-sm font-medium text-slate-700">
                        {skill}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeSkill(
                            skill
                          )
                        }
                        className="
                          text-slate-400
                          transition
                          hover:text-red-500
                        "
                        aria-label={`Remove ${skill}`}
                      >

                        <Trash2 size={14} />

                      </button>

                    </div>
                  )
                )
              )}

            </div>

            <div className="mt-4 flex items-end gap-2">

              <div className="flex-1">

                <FormLabel htmlFor="newSkill">
                  Add Skill
                </FormLabel>

                <Input
                  id="newSkill"
                  value={newSkill}
                  onChange={(event) =>
                    setNewSkill(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {

                    if (
                      event.key ===
                      "Enter"
                    ) {

                      event.preventDefault();

                      addSkill();
                    }
                  }}
                  placeholder="e.g. React.js"
                  maxLength={50}
                />

              </div>

              <Button
                type="button"
                variant="outline"
                onClick={addSkill}
                leftIcon={
                  <Plus size={16} />
                }
              >
                Add
              </Button>

            </div>

            <p className="mt-2 text-xs text-slate-400">
              Add at least one skill. Each skill can contain
              up to 50 characters.
            </p>

          </FormSection>

          {/* ===================================================
              SOCIAL PROFILES
          =================================================== */}

          <FormSection
            title="Social Profiles"
            description="Add your professional social profiles."
          >

            <div className="space-y-5">

              <Field>

                <FormLabel htmlFor="linkedinUrl">
                  LinkedIn URL
                </FormLabel>

                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  type="url"
                  value={linkedinUrl}
                  onChange={(event) =>
                    setLinkedinUrl(
                      event.target.value
                    )
                  }
                  placeholder="https://linkedin.com/in/your-profile"
                  leftIcon={
                    <span className="text-xs font-extrabold">
                      in
                    </span>
                  }
                  maxLength={255}
                />

                <FormError />

              </Field>

              <Field>

                <FormLabel htmlFor="githubUrl">
                  GitHub URL
                </FormLabel>

                <Input
                  id="githubUrl"
                  name="githubUrl"
                  type="url"
                  value={githubUrl}
                  onChange={(event) =>
                    setGithubUrl(
                      event.target.value
                    )
                  }
                  placeholder="https://github.com/your-username"
                  leftIcon={
                    <span className="text-[10px] font-extrabold">
                      GH
                    </span>
                  }
                  maxLength={255}
                />

                <FormError />

              </Field>

            </div>

          </FormSection>

          {/* ===================================================
              JOB PREFERENCE
          =================================================== */}

          <FormSection
            title="Job Preferences"
            description="Tell companies whether you are currently available."
          >

            <label
              htmlFor="openToWork"
              className="
                flex
                cursor-pointer
                items-start
                gap-3
              "
            >

              <input
                id="openToWork"
                name="openToWork"
                type="checkbox"
                checked={openToWork}
                onChange={(event) =>
                  setOpenToWork(
                    event.target.checked
                  )
                }
                className="
                  mt-1
                  h-4
                  w-4
                  cursor-pointer
                  rounded
                  border-slate-300
                  accent-slate-950
                  focus:ring-2
                  focus:ring-slate-950/20
                "
              />

              <span>

                <span className="block text-sm font-semibold text-slate-800">
                  I'm open to work
                </span>

                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  Let companies know that you are currently
                  looking for new job opportunities.
                </span>

              </span>

            </label>

          </FormSection>

          {/* ===================================================
              ACTIONS
          =================================================== */}

          <div
            className="
              flex
              flex-col-reverse
              gap-3
              sm:flex-row
              sm:justify-end
            "
          >

            <Link
              href={
                routes.jobseeker.profile.view
              }
              className="
                inline-flex
                h-11
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                px-5
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:bg-slate-50
              "
            >
              Cancel
            </Link>

            <Button
              type="submit"
              size="lg"
              disabled={saving}
              rightIcon={
                <ArrowLeft
                  className="rotate-180"
                  size={17}
                />
              }
            >

              {saving
                ? "Saving..."
                : profileNotFound
                  ? "Create Profile"
                  : "Save Changes"}

            </Button>

          </div>

        </form>

      </div>

    </main>
  );
}

// =============================================================
// FIELD
// =============================================================

function Field({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

// =============================================================
// FORM SECTION
// =============================================================

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        sm:p-8
      "
    >

      <div className="border-b border-slate-100 pb-5">

        <h2 className="text-lg font-bold text-slate-950">
          {title}
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>

      </div>

      <div className="pt-6">
        {children}
      </div>

    </section>
  );
}