// David's career record, shared by the portfolio, the AI consulting page and the
// CV so the dates and titles can't drift apart. Source: the CV (see commit 61c7db0).
// Add only what the CV backs up: no invented roles, achievements or metrics.

export const profile = {
  name: 'David Ferreira',
  role: 'Software Engineering Lead',
  yearsExperience: '16+',
  location: 'Portugal',
  timezone: 'UTC+0 / UTC+1 (Lisbon)',
  availability: 'Open to fully remote roles with international teams, working from Portugal.',
  email: 'hey@davidferreira.dev',
  linkedin: 'https://www.linkedin.com/in/david-ferreira-69041367',
  github: 'https://github.com/noais',
  site: 'https://davidferreira.dev',
  cv: '/cv/',
};

export interface Role {
  company: string;
  role: string;
  /** Display range, e.g. "Nov 2025 – Apr 2026". */
  period: string;
  /** ISO year-month, for <time datetime>. */
  start: string;
  end: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export const experience: Role[] = [
  {
    company: 'FRiNGE',
    role: 'Head of Mobile / Lead iOS Engineer',
    period: 'Nov 2025 – Apr 2026',
    start: '2025-11',
    end: '2026-04',
    summary: 'Sole mobile lead on a location-based livestreaming iOS app, owning it end to end from architecture to release.',
    highlights: [
      'Designed and shipped the iOS app end to end as sole mobile lead, with Swift 6, SwiftUI, Agora RTC, Supabase and PostHog',
      'Led architecture on Go-Live performance, the camera ↔ Agora handoff and Swift 6 strict concurrency safety',
      'Implemented token prefetch and warm-restart flows so going live feels instant and survives flaky outdoor networks',
    ],
    stack: ['Swift 6', 'SwiftUI', 'Agora RTC', 'Supabase', 'PostHog'],
  },
  {
    company: 'Volkswagen Group',
    role: 'Lead iOS Developer',
    period: 'Nov 2023 – Nov 2025',
    start: '2023-11',
    end: '2025-11',
    summary: 'Led iOS development of the MAN TGE companion app after starting on the CAT Architecture Team.',
    highlights: [
      'Led iOS development for the MAN TGE companion app: architecture, technical roadmap and delivery across releases',
      'Defined and enforced Clean Architecture + MVVM standards with strict concurrency safety; drove release strategy within a SAFe Program Increment cadence',
      'Started on the CAT Architecture Team, supporting the release pipeline and onboarding new teams org-wide, with tooling in Python, Bash and YAML',
    ],
    stack: ['Swift', 'Clean Architecture', 'MVVM', 'Swift Concurrency', 'APNs', 'MQTT', 'Python'],
  },
  {
    company: 'YEO Messaging',
    role: 'Lead iOS Developer',
    period: 'Jul 2021 – Oct 2023',
    start: '2021-07',
    end: '2023-10',
    summary: 'Security-sensitive messaging: on-device recipient verification, end-to-end encryption and real-time delivery.',
    highlights: [
      'Built the recipient-verification pipeline with CoreML and ARKit for on-device face recognition, authenticating the person, not just the device',
      'Implemented OLM end-to-end encryption, GraphQL APIs and WebSocket-based real-time messaging',
      'Architected a hybrid UIKit/SwiftUI codebase in MVVM-C with snapshot testing and Bitrise CI',
    ],
    stack: ['CoreML', 'ARKit', 'OLM', 'GraphQL', 'WebSockets', 'MVVM-C', 'Bitrise'],
  },
  {
    company: 'Prozis (ProzisGo)',
    role: 'Lead iOS Developer',
    period: 'Apr 2017 – Jun 2021',
    start: '2017-04',
    end: '2021-06',
    summary: 'Mobile architecture for a health and nutrition product fed by wearable data.',
    highlights: [
      'Defined the architecture for ingesting data from multiple wearables (smart scales, bands) into a nutrition inference engine',
      'Applied strict TDD with explicit use-case and test-case specifications, building with TCA, RxSwift and Realm',
      'Authored an internal SDK consumed by other product teams',
    ],
    stack: ['Swift', 'TCA', 'RxSwift', 'Realm', 'HealthKit', 'TDD'],
  },
  {
    company: 'Bosch',
    role: 'iOS Developer',
    period: 'Mar 2014 – Apr 2017',
    start: '2014-03',
    end: '2017-04',
    summary: 'Smart-home and installer apps, including architecture and protocol design.',
    highlights: [
      'Architected HeatHub, a smart-home app for Bosch’s thermotechnology appliance line: a hybrid Swift/Objective-C/C++ codebase with HomeKit integration',
      'Designed a new BLE communication protocol from scratch for ProWater, a water-heater installer app',
      'Contributed to the open-source Charts library',
    ],
    stack: ['Swift', 'Objective-C', 'C++', 'HomeKit', 'BLE'],
  },
  {
    company: 'Portugal Telecom',
    role: 'IT Consultant',
    period: 'Jul 2010 – Mar 2014',
    start: '2010-07',
    end: '2014-03',
    summary: 'Backend and platform engineering, plus a native macOS product.',
    highlights: [
      'Built an Objective-C macOS product for wireless pen drives that automatically selected the best available network',
      'Backend work on an SSO platform (Java, Spring MVC/Security, Hibernate) and a QoS platform (Java, PostgreSQL, Bash)',
    ],
    stack: ['Objective-C', 'Java', 'Spring', 'Ruby on Rails', 'PostgreSQL'],
  },
];

export const education = {
  degree: 'M.Sc. Computers and Telematics Engineering',
  school: 'University of Aveiro',
  note: 'Thesis: semantic enrichment of SAPO’s EPG to improve retrieval across heterogeneous data.',
};

export const community = [
  { name: 'SwiftAveiro', detail: 'Founder & organiser · 2016–2019' },
  { name: 'CocoaHeads Aveiro', detail: 'Organiser · since 2013' },
  { name: 'Charts', detail: 'Open-source contributor' },
];

export const languages = [
  { name: 'Portuguese', level: 'Native' },
  { name: 'English', level: 'Professional' },
  { name: 'French', level: 'Professional' },
];

/** The Person node every page's JSON-LD points at by @id. */
export const personSchema = {
  '@type': 'Person',
  '@id': `${profile.site}/#person`,
  name: profile.name,
  jobTitle: profile.role,
  url: `${profile.site}/`,
  email: `mailto:${profile.email}`,
  image: `${profile.site}/og.png`,
  address: { '@type': 'PostalAddress', addressCountry: 'PT' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: education.school },
  knowsLanguage: ['pt', 'en', 'fr'],
  knowsAbout: [
    'Software engineering',
    'Software architecture',
    'Engineering leadership',
    'Mobile development',
    'Real-time systems',
    'Release management',
    'AI-assisted development',
  ],
  sameAs: [profile.linkedin, profile.github],
};
