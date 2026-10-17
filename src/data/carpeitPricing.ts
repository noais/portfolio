// Website copy only: activation and owner eligibility are managed by the backend.
// Closing applications does not remove existing partners’ eligibility.
export const foundingApplicationsOpen = true;

export const ownerPricingSummary = 'When the new pricing model activates, Standard commission will be 12% of the rental price and Founding Partners will pay 8%. Listing remains free, and renters pay no additional service fee.';
export const foundingMigrationSummary = 'Existing owners with at least one published listing or a booking as owner before the activation cutoff qualify for Founding Partner commission. This applies to private owners, schools and shops. Accounts with only drafts and no bookings default to Standard.';
export const foundingApplicationsSummary = foundingApplicationsOpen
  ? 'Founding Partner applications are open to eligible early partners, including owners joining the Ericeira and Peniche launch. New owners default to Standard; the 8% rate requires approval from CarpeIt.'
  : 'Founding Partner applications are closed. Existing Founding Partners retain their eligibility; new owners default to Standard.';
export const existingBookingSummary = 'Already-confirmed bookings keep their original commission. The new rates apply to future bookings after activation.';
