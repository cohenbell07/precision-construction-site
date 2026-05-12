/**
 * Shared client-side validation for the lead/quote forms.
 *
 * Every quote variant (root, basement, bundle, supplier-deals, per-service)
 * and the contact form validate the same name/email/projectDetails contract,
 * so a shared helper keeps the rules in one place and prevents drift.
 *
 * Wire-up pattern in each form:
 *
 *   const [errors, setErrors] = useState<LeadFormErrors>({});
 *   const handleSubmit = (e) => {
 *     e.preventDefault();
 *     const errs = validateLeadForm(formData);
 *     setErrors(errs);
 *     if (Object.keys(errs).length) {
 *       document.getElementById(Object.keys(errs)[0])?.focus();
 *       return;
 *     }
 *     // ...submit
 *   };
 *
 * And on each input:
 *   <Input
 *     id="name" aria-required="true"
 *     aria-invalid={!!errors.name}
 *     aria-describedby={errors.name ? "name-error" : undefined}
 *     ...
 *   />
 *   {errors.name && <p id="name-error" role="alert" ...>{errors.name}</p>}
 */

export type LeadFormErrors = Partial<Record<"name" | "email" | "projectDetails", string>>;

interface LeadFormShape {
  name: string;
  email: string;
  projectDetails: string;
  [key: string]: unknown;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLeadForm(data: LeadFormShape): LeadFormErrors {
  const errors: LeadFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name.";
  }

  const email = data.email.trim();
  if (!email) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "That email doesn't look right.";
  }

  if (!data.projectDetails.trim()) {
    errors.projectDetails = "Please tell us a little about your project.";
  }

  return errors;
}
