export type PhoneValidationResult = {
  valid: boolean;
  normalized: string | null;
  error: string | null;
};

// Saudi mobile numbers: 50-59 prefixes, 9 digits after country code.
const SAUDI_MOBILE_PREFIXES = /^[5][0-9]$/;

export function validateSaudiPhone(input: string): PhoneValidationResult {
  if (typeof input !== "string") {
    return { valid: false, normalized: null, error: "Phone number is required." };
  }

  // Remove spaces, dashes, parentheses, dots.
  const cleaned = input.trim().replace(/[\s\-().]/g, "");

  if (cleaned === "") {
    return { valid: false, normalized: null, error: "Phone number is required." };
  }

  // Handle leading +
  let digits = cleaned;
  if (digits.startsWith("+")) digits = digits.slice(1);

  // Handle 00 prefix
  if (digits.startsWith("00")) digits = digits.slice(2);

  // Now digits should be numeric
  if (!/^\d+$/.test(digits)) {
    return { valid: false, normalized: null, error: "Phone number must contain only digits." };
  }

  // Normalize to country code form
  let national = digits;
  if (digits.startsWith("966")) {
    national = digits.slice(3);
  } else if (digits.startsWith("0")) {
    national = digits.slice(1);
  }

  // national should be 9 digits starting with 5
  if (national.length !== 9) {
    return {
      valid: false,
      normalized: null,
      error: "Saudi mobile number must have 9 digits after the country code.",
    };
  }

  if (!national.startsWith("5")) {
    return {
      valid: false,
      normalized: null,
      error: "Saudi mobile number must start with 5.",
    };
  }

  const prefix = national.slice(0, 2);
  if (!SAUDI_MOBILE_PREFIXES.test(prefix)) {
    return {
      valid: false,
      normalized: null,
      error: "Invalid Saudi mobile prefix.",
    };
  }

  return { valid: true, normalized: `+966${national}`, error: null };
}