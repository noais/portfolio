// Velko service fee tiers, as shown on the Velko landing page and Support FAQ.
// The renter pays the fee on top of the owner's price; the owner receives the
// full price they set (velko-server migration 0054, docs/MONEY_SAFETY.md).
//
// KEEP IN SYNC: this mirrors the backend `commission_tiers` table
// (velko-server migration 0048). Change the rates there and here together,
// and update section 6 of src/pages/velko/terms.astro (which states the
// rates in its own words, because a change to the Terms needs advance notice
// and a terms_version bump).
//
// Any VAT due on the fee is included in it, and Stripe's processing fees are
// paid by Velko out of it. The fee has a minimum that covers Velko's costs, so
// the percentage is the plain rate only from about €90.

import { velkoOperator } from './velkoOperator';

export type CommissionTierCode = 'standard' | 'volume' | 'founding';

export interface CommissionTier {
  code: CommissionTierCode;
  name: string;
  /** Service fee as a whole percentage of the owner's price. */
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
// every booking uses the current flat 8% rate. The copy says so wherever it quotes
// the new rates.
export const ownerPricingSummary = 'When the new pricing model activates, the service fee on a Standard Partner’s listings will be 12% of their price and on a Founding Partner’s 8%. Listing remains free, and owners receive the full price they set.';
export const currentRateNote = 'Until the new pricing model activates, every booking uses the current 8% rate.';
export const foundingMigrationSummary = 'Existing owners with at least one published listing or a booking as owner before the activation cutoff qualify for the Founding Partner rate. This applies to private owners, schools and shops. Accounts with only drafts and no bookings default to Standard.';
export const foundingApplicationsSummary = foundingApplicationsOpen
  ? 'Founding Partner applications are open to eligible early partners, including owners joining the Ericeira and Peniche launch. New owners default to Standard; the 8% rate requires approval from Velko.'
  : 'Founding Partner applications are closed. Existing Founding Partners retain their eligibility; new owners default to Standard.';
export const existingBookingSummary = 'Already-confirmed bookings keep their original amounts. The new rates apply to future bookings after activation.';

/** Worked example used on every tier card. */
export const exampleRentalPrice = 100;

export const formatEuro = (amount: number) =>
  `€${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;

/** What the renter pays at a price where the plain percentage applies (about €90 and up). */
export const renterPays = (tier: CommissionTier, price = exampleRentalPrice) =>
  Math.round(price * (100 + tier.percent)) / 100;

export const standardTier: CommissionTier = {
  code: 'standard',
  name: 'Standard Partners',
  percent: 12,
  badge: 'Default for every owner',
  isDefault: true,
  bullets: [
    'Free equipment listings',
    'No upfront subscription',
    'Service fee only on rentals that go ahead, paid by the renter',
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
    'A reward for supporting Velko from the beginning',
    'Eligibility and duration governed by the published programme terms',
    foundingApplicationsOpen
      ? 'Already listing on Velko? Your listings keep the 8% rate as a Founding Partner'
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

const applyMail = `mailto:${velkoOperator.email}?subject=${encodeURIComponent('Velko partner tier')}`;

const foundingApply = foundingApplicationsOpen
  ? `The Founding Partner programme is open to new owners, by approval, and owners who already list on Velko keep the ${foundingTier.percent}% rate as Founding Partners. Its eligibility and duration are set by the published programme terms.`
  : `The Founding Partner programme is closed to new applications; owners who are already Founding Partners keep the ${foundingTier.percent}% rate under the published programme terms.`;

export const pricingFaqs: PricingFaq[] = [
  {
    id: 'commission',
    q: 'How much is the service fee, and which tier am I on?',
    a: `You receive the full price you set, and the renter pays Velko’s service fee on top. The rate depends on your tier: every owner starts as a Standard Partner, at ${standardTier.percent}%. Volume Partners are at ${volumeTier.percent}% and Founding Partners at ${foundingTier.percent}%, both by approval. The fee has a minimum that covers Velko’s costs, so it is a higher share on small rentals, for example €5.50 on a €50 rental at the ${foundingTier.percent}% rate. On a ${formatEuro(exampleRentalPrice)} rental you receive ${formatEuro(exampleRentalPrice)} on every tier, and the renter pays ${formatEuro(renterPays(standardTier))}, ${formatEuro(renterPays(volumeTier))} or ${formatEuro(renterPays(foundingTier))}. What you’ll receive and what the renter will pay are shown before you publish a listing and on every booking.`,
  },
  {
    id: 'free-listing',
    q: 'Is listing free?',
    a: 'Yes. Listing your equipment costs nothing and there is no subscription. Velko only earns its service fee, paid by the renter, when a rental goes ahead.',
  },
  {
    id: 'when-charged',
    q: 'When is the service fee charged?',
    a: 'Only when a rental goes ahead. The renter’s card is authorised for the total, service fee included, when they send a request, and charged when you accept it. Nothing is deducted from your price. If the rental is refunded, Velko returns its fee too.',
  },
  {
    id: 'payouts',
    q: 'How and when do I get paid?',
    a: 'Through Stripe Connect. Set up payouts in Profile → Payments & payouts; you need this before you can accept a booking. The price you set is paid to your Stripe account once the gear has been handed over (pickup confirmed in the app), and Stripe pays it out to your bank on Stripe’s payout schedule. Velko pays Stripe’s card processing fees on a rental out of its service fee.',
  },
  {
    id: 'cancellations',
    q: 'What happens if a rental is cancelled or refunded?',
    a: 'A renter can cancel a request for free before you accept it. After you accept, they can cancel until 48 hours before pickup and are refunded less the card payment fee, which the payment provider doesn’t return (for example €1.00 on a €50 rental paid by a European card); after that, there’s no refund. If you cancel an accepted booking, the renter always gets a full refund, and you first pay by card the payment fee that refund costs (for example €1.30 on a €50 rental). The app shows the amount before anyone confirms.',
  },
  {
    id: 'renter-fees',
    q: 'What do renters pay?',
    a: 'The price they see. Every price in the app already includes Velko’s service fee, and checkout shows it as its own line, so nothing is added at the end. If a listing has a deposit, it is held on the renter’s card, not charged, unless there is a damage claim.',
  },
  {
    id: 'become-partner',
    q: 'How do I become a Founding or Volume Partner?',
    a: `Email ${velkoOperator.email} with a few words about you and your gear, and Velko will review it. The Volume Partner rate is for qualified high-volume partners such as rental businesses, schools, clubs and frequent equipment owners. ${foundingApply} Until a tier is approved, you are on the Standard rate.`,
    link: { href: applyMail, label: `Email ${velkoOperator.email}` },
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
    a: `${currentRateNote} ${existingBookingSummary} The amounts for each booking are fixed when it is made and shown before you accept it.`,
  },
  {
    id: 'vat',
    q: 'Does the service fee include VAT?',
    a: 'Yes. Any VAT due on Velko’s service fee is included in it. You remain responsible for any taxes due on what you earn.',
  },
];

export const pricingFaq = (id: string): PricingFaq => {
  const faq = pricingFaqs.find((f) => f.id === id);
  if (!faq) throw new Error(`Unknown pricing FAQ: ${id}`);
  return faq;
};
