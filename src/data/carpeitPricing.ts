// CarpeIt owner commission tiers, as shown on the CarpeIt landing page and
// Support FAQ.
//
// KEEP IN SYNC: this mirrors the backend `commission_tiers` table
// (carpeit-server migration 0048). Change the rates there and here together,
// and update section 6 of src/pages/carpeit/terms.astro (which states the
// rates in its own words, because a change to the Terms needs advance notice
// and a terms_version bump).
//
// The percentage is everything CarpeIt takes from the owner: any VAT due on
// CarpeIt's commission is included in it, and Stripe's processing fees are
// paid by CarpeIt out of its commission.

import { carpeitOperator } from './carpeitOperator';

export type CommissionTierCode = 'standard' | 'volume' | 'founding';

export interface CommissionTier {
  code: CommissionTierCode;
  name: string;
  /** Commission as a whole percentage of the rental price. */
  percent: number;
  /** Short label shown above the rate, e.g. who the tier is for. */
  badge: string;
  bullets: string[];
  /** Standard is the default every owner starts on. */
  isDefault?: boolean;
}

/**
 * Whether new owners can apply to become Founding Partners (admin-approved).
 * Website copy only: activation and owner eligibility are managed by the
 * backend (app_config.founding_partner_enrollment_open). Set to false when
 * the programme closes: the Founding card then reads "existing Founding
 * Partners only". Closing applications does not remove existing partners'
 * eligibility.
 */
export const foundingApplicationsOpen = true;

// Until the backend switches the new model on (commission_tiers_enabled),
// every owner pays the current flat 8%. The copy says so wherever it quotes
// the new rates.
export const ownerPricingSummary = 'When the new pricing model activates, Standard commission will be 12% of the rental price and Founding Partners will pay 8%. Listing remains free, and renters pay no additional service fee.';
export const currentRateNote = 'Until the new pricing model activates, every owner pays the current 8% commission.';
export const foundingMigrationSummary = 'Existing owners with at least one published listing or a booking as owner before the activation cutoff qualify for Founding Partner commission. This applies to private owners, schools and shops. Accounts with only drafts and no bookings default to Standard.';
export const foundingApplicationsSummary = foundingApplicationsOpen
  ? 'Founding Partner applications are open to eligible early partners, including owners joining the Ericeira and Peniche launch. New owners default to Standard; the 8% rate requires approval from CarpeIt.'
  : 'Founding Partner applications are closed. Existing Founding Partners retain their eligibility; new owners default to Standard.';
export const existingBookingSummary = 'Already-confirmed bookings keep their original commission. The new rates apply to future bookings after activation.';

/** Worked example used on every tier card. */
export const exampleRentalPrice = 100;

export const formatEuro = (amount: number) =>
  `€${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;

export const ownerReceives = (tier: CommissionTier, price = exampleRentalPrice) =>
  Math.round(price * (100 - tier.percent)) / 100;

export const standardTier: CommissionTier = {
  code: 'standard',
  name: 'Standard Partners',
  percent: 12,
  badge: 'Default for every owner',
  isDefault: true,
  bullets: [
    'Free equipment listings',
    'No upfront subscription',
    'Commission charged only on successful rentals',
    'Clear and transparent pricing',
  ],
};

export const volumeTier: CommissionTier = {
  code: 'volume',
  name: 'Volume Partners',
  percent: 10,
  badge: 'By approval',
  bullets: [
    'Reduced rate for qualified high-volume partners',
    'Suited to rental businesses, schools, clubs and frequent equipment owners',
    'Eligibility subject to approval',
  ],
};

export const foundingTier: CommissionTier = {
  code: 'founding',
  name: 'Founding Partners',
  percent: 8,
  badge: foundingApplicationsOpen ? 'Open to new owners · by approval' : 'Existing Founding Partners only',
  bullets: [
    'Special reduced rate for eligible early partners',
    'A reward for supporting CarpeIt from the beginning',
    'Eligibility and duration governed by the published programme terms',
    foundingApplicationsOpen
      ? 'Already listing on CarpeIt? You keep 8% as a Founding Partner'
      : 'No longer open to new applications',
  ],
};

/** Display order: the default first, then the approval-based tiers. */
export const commissionTiers: CommissionTier[] = [standardTier, volumeTier, foundingTier];

// ── Owner pricing FAQ ─────────────────────────────────────────────
// Shared by the landing page (all of them, plus FAQPage JSON-LD) and the
// Support page (a subset, picked by id). Answers are plain text so the
// JSON-LD matches what is shown.

export interface PricingFaq {
  id: string;
  q: string;
  a: string;
  link?: { href: string; label: string };
}

const applyMail = `mailto:${carpeitOperator.email}?subject=${encodeURIComponent('CarpeIt partner tier')}`;

const foundingApply = foundingApplicationsOpen
  ? `The Founding Partner programme is open to new owners, by approval, and owners who already list on CarpeIt keep ${foundingTier.percent}% as Founding Partners. Its eligibility and duration are set by the published programme terms.`
  : `The Founding Partner programme is closed to new applications; owners who are already Founding Partners keep ${foundingTier.percent}% under the published programme terms.`;

export const pricingFaqs: PricingFaq[] = [
  {
    id: 'commission',
    q: 'How much is the commission, and which tier am I on?',
    a: `Every owner starts as a Standard Partner, at ${standardTier.percent}% of the rental price. Volume Partners pay ${volumeTier.percent}% and Founding Partners ${foundingTier.percent}%; both are by approval. Your rate and exactly what you’ll receive are shown before you publish a listing and on every booking. On a ${formatEuro(exampleRentalPrice)} rental, a Standard Partner receives ${formatEuro(ownerReceives(standardTier))}, a Volume Partner ${formatEuro(ownerReceives(volumeTier))} and a Founding Partner ${formatEuro(ownerReceives(foundingTier))}.`,
  },
  {
    id: 'free-listing',
    q: 'Is listing free?',
    a: 'Yes. Listing your equipment costs nothing and there is no subscription. CarpeIt only earns its commission when a rental goes ahead.',
  },
  {
    id: 'when-charged',
    q: 'When is the commission charged?',
    a: 'Only when a rental goes ahead. The renter’s card is authorised when they send a request and charged when you accept it; CarpeIt’s commission is deducted from that payment before your share is paid out. If the renter ends up with a full refund, CarpeIt gives back its commission too, so you pay nothing on that rental.',
  },
  {
    id: 'payouts',
    q: 'How and when do I get paid?',
    a: 'Through Stripe Connect. Set up payouts in Profile → Payments & payouts; you need this before you can accept a booking. Your share of each rental is paid to your Stripe account when you accept the booking, and Stripe pays it out to your bank on Stripe’s payout schedule. Stripe’s card processing fees are paid by CarpeIt out of its commission, not by you.',
  },
  {
    id: 'cancellations',
    q: 'What happens if a rental is cancelled or refunded?',
    a: 'A renter can cancel a request for free before you accept it. After you accept, the renter gets a full refund if they cancel up to 48 hours before pickup, and no refund after that. If you cancel, the renter always gets a full refund. Whenever the renter gets a full refund, CarpeIt gives back its commission, so you pay nothing on that rental.',
  },
  {
    id: 'renter-fees',
    q: 'Do renters pay any extra fees?',
    a: 'No. Renters pay the price shown before they book, with no service fee on top. If a listing has a deposit, it is held on the renter’s card, not charged, unless there is a damage claim.',
  },
  {
    id: 'become-partner',
    q: 'How do I become a Founding or Volume Partner?',
    a: `Email ${carpeitOperator.email} with a few words about you and your gear, and CarpeIt will review it. The Volume Partner rate is for qualified high-volume partners such as rental businesses, schools, clubs and frequent equipment owners. ${foundingApply} Until a tier is approved, you are on the Standard rate.`,
    link: { href: applyMail, label: `Email ${carpeitOperator.email}` },
  },
  {
    id: 'founding-eligibility',
    q: 'Who qualifies as a Founding Partner?',
    a: `${foundingMigrationSummary} ${foundingApplicationsSummary}`,
    link: { href: applyMail, label: 'Contact us about eligibility' },
  },
  {
    id: 'existing-bookings',
    q: 'When do the new rates start, and what about my existing bookings?',
    a: `${currentRateNote} ${existingBookingSummary} The rate for each booking is fixed when it is made and shown before you accept it.`,
  },
  {
    id: 'vat',
    q: 'Does the commission include VAT?',
    a: 'Yes. The percentage is everything CarpeIt takes from you: any VAT due on CarpeIt’s commission is included in it. You remain responsible for any taxes due on what you earn.',
  },
];

export const pricingFaq = (id: string): PricingFaq => {
  const faq = pricingFaqs.find((f) => f.id === id);
  if (!faq) throw new Error(`Unknown pricing FAQ: ${id}`);
  return faq;
};
