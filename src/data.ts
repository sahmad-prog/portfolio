import { Skill, Service, PortfolioProject, StatItem } from './types';

export const SKILLS: Skill[] = [
  // Testing Group
  { name: 'Manual Testing', category: 'Testing', proficiency: 98, description: 'Structured test planning & manual verification' },
  { name: 'Functional Testing', category: 'Testing', proficiency: 95, description: 'Verifying software behaviors against criteria' },
  { name: 'Regression Testing', category: 'Testing', proficiency: 96, description: 'Ensuring new changes don\'t break existing features' },
  { name: 'Smoke & Sanity Testing', category: 'Testing', proficiency: 94, description: 'Critical flow and build stability validations' },
  { name: 'API Testing (REST)', category: 'Testing', proficiency: 92, description: 'Payload validation, response assertions, & status codes' },
  { name: 'Database Testing', category: 'Testing', proficiency: 88, description: 'Verifying data integrity, schema rules & CRUD logic' },
  { name: 'Mobile App Testing', category: 'Testing', proficiency: 90, description: 'Testing native Android & iOS environments' },
  { name: 'Black Box Testing', category: 'Testing', proficiency: 95, description: 'Testing software without internal code exposure' },
  { name: 'UI & Usability Testing', category: 'Testing', proficiency: 92, description: 'Ensuring accessible, responsive, and seamless experiences' },
  
  // Tools Group
  { name: 'Postman', category: 'Tools', proficiency: 95, description: 'API collection runners, variables & automated assertions' },
  { name: 'Jira', category: 'Tools', proficiency: 96, description: 'Agile sprint tracking, epic mapping & bug tracking' },
  { name: 'Trello', category: 'Tools', proficiency: 90, description: 'Kanban tracking for quick, lightweight task management' },
  { name: 'Cypress', category: 'Tools', proficiency: 82, description: 'Automating UI flows & end-to-end integration tests' },
  { name: 'SQL (MySQL/Postgres)', category: 'Tools', proficiency: 88, description: 'Drafting complex queries, joins, & schema checks' },
  { name: 'GitHub', category: 'Tools', proficiency: 90, description: 'Pull request reviews, version control, & workflow pipelines' },
  { name: 'Firebase', category: 'Tools', proficiency: 85, description: 'Realtime database listeners & auth flow verifications' },
  { name: 'AWS', category: 'Tools', proficiency: 80, description: 'CloudWatch log reviews & S3 asset tracking' },
  { name: 'Chrome DevTools', category: 'Tools', proficiency: 95, description: 'Console diagnostics, network analysis, & screen resizing' }
];

export const SERVICES: Service[] = [
  {
    title: 'Website Testing',
    icon: 'Globe',
    description: 'Comprehensive cross-browser testing to guarantee uniform performance across Chrome, Safari, Firefox, and Edge.',
    items: ['Functional Testing', 'UI & Layout Alignment', 'Responsive Breakpoint Audits', 'Cross-Browser UX Verification']
  },
  {
    title: 'Mobile App Testing',
    icon: 'Smartphone',
    description: 'Rigorous testing on Android & iOS platforms focusing on touch interactions, battery drain, and system notifications.',
    items: ['Android App Audits', 'iOS Compatibility Tests', 'Usability & Ergonomic Checks', 'Regression Performance Loops']
  },
  {
    title: 'API Testing & Validation',
    icon: 'Terminal',
    description: 'Validating security, response schemas, and latency checks to ensure resilient backend-to-frontend handshakes.',
    items: ['Postman Collection Building', 'RESTful API Schema Audits', 'Swagger Documentation Reviews', 'JSON Payload Integrity Checks']
  },
  {
    title: 'Bug Reporting & Tracking',
    icon: 'Bug',
    description: 'Transforming technical anomalies into highly action-oriented reports, equipped with logs, assets, and reproduction steps.',
    items: ['Jira Ticket Engineering', 'Trello Kanban Flow Tracking', 'Screen Recording Logs', 'Precise Severity Labeling']
  }
];

export const PROJECTS: PortfolioProject[] = [
  {
    title: 'E-commerce Platform Testing',
    bugsFound: 52,
    testCases: 120,
    category: 'Web Application',
    tags: ['Regression Testing', 'API Testing', 'UI/UX Audit', 'Checkout Flow'],
    description: 'Conducted a deep regression cycle on a high-volume shopping platform. Designed comprehensive test suites for basket modifications, guest checkout, Stripe payments, and stock decrement checks.',
    detailedBugs: [
      {
        id: 'SEC-102',
        title: 'Session Hijacking through Cookies without HttpOnly Attribute',
        severity: 'Critical',
        category: 'Functional',
        steps: [
          'Log in to user dashboard using standard credentials.',
          'Open Developer Tools -> Storage -> Cookies.',
          'Verify the session cookie attributes.',
          'Notice that "HttpOnly" and "Secure" flags are set to false, allowing arbitrary JS reads.'
        ],
        expected: 'Session identifier cookies should be guarded by HttpOnly and Secure flags.',
        actual: 'Session token leaked to client-side JS executing `document.cookie`.',
        environment: 'Chrome v122, macOS Sonoma'
      },
      {
        id: 'CART-405',
        title: 'Negative Input Value in Cart Item Counter leads to Negative Billing',
        severity: 'High',
        category: 'Calculation',
        steps: [
          'Add any item worth $100 to the shopping cart.',
          'Inspect item quantity counter and use browser tools to override bounds, or type "-2" manually.',
          'Proceed to checkout page.'
        ],
        expected: 'Cart validator should reject quantities <= 0 and throw an error toast.',
        actual: 'The total bill registers as -$200.00 and payment gateway fails but allows order dispatch.',
        environment: 'Safari Mobile, iOS 17'
      },
      {
        id: 'UI-812',
        title: 'Overlapping Text inside Coupon Card layout on 320px Viewports',
        severity: 'Low',
        category: 'UI',
        steps: [
          'Open active cart page.',
          'Enable responsive simulator in Chrome DevTools set to 320px width (iPhone SE).',
          'Locate the "APPLY NEW WINTER DEALS COUPON" text card.'
        ],
        expected: 'Layout should wrap text elegantly or resize font elements smoothly.',
        actual: 'Coupon submit button overlaps the heading text block, rendering it unclickable.',
        environment: 'Chrome DevTools, Responsive Mode'
      }
    ]
  },
  {
    title: 'Secure Banking App Audit',
    bugsFound: 38,
    testCases: 95,
    category: 'Mobile Application',
    tags: ['Mobile Testing', 'Security Checks', 'JWT Validation', 'Transaction Integrity'],
    description: 'Executed manual verification of a retail banking app. Validated biometric login fail-safes, cross-currency balance transfers, and live server polling during network drops.',
    detailedBugs: [
      {
        id: 'BANK-203',
        title: 'Double-Submit Trigger leading to Duplicate Transaction Transfers',
        severity: 'Critical',
        category: 'Functional',
        steps: [
          'Navigate to "Internal Transfer" portal.',
          'Enter recipient details and click Send.',
          'Tap the Transfer Confirmation button 3-4 times rapidly before network completes request.'
        ],
        expected: 'Button should immediately enter disabled state, and backend should deduplicate tokenized transfers.',
        actual: 'Two distinct transfer transactions executed consecutively, pulling balance into negative.',
        environment: 'Android 14, Samsung S24'
      },
      {
        id: 'API-551',
        title: 'Bearer Token persists in memory after explicit account logout',
        severity: 'High',
        category: 'Validation',
        steps: [
          'Authenticate successfully on the banking dashboard.',
          'Tap logout. Redirected to welcome screen.',
          'Intercept outgoing requests or manually replay previous transaction token via console.'
        ],
        expected: 'The server should blacklist or invalidate the token immediately upon logout.',
        actual: 'Previous token remains active and authorized on backend endpoints for 15 additional minutes.',
        environment: 'iOS 17, Postman interceptor'
      }
    ]
  },
  {
    title: 'Enterprise CRM Database Sync',
    bugsFound: 45,
    testCases: 110,
    category: 'Database & API Integration',
    tags: ['Database Validation', 'PostgreSQL Auditing', 'JSON Schema Check', 'Role Permissions'],
    description: 'Designed detailed smoke tests and bulk insert verifications for customer account fields. Ensured nested table joins and relational constraints update correctly upon lead conversion.',
    detailedBugs: [
      {
        id: 'CRM-774',
        title: 'SQL Trigger fail on null phone value halts bulk CSV lead import',
        severity: 'High',
        category: 'Calculation',
        steps: [
          'Access CRM dashboard and navigate to "Bulk Import".',
          'Upload target CSV with 50 leads where 1 lead lacks a phone number.',
          'Initiate ingestion.'
        ],
        expected: 'Importer should skip or insert empty placeholder, listing warning log.',
        actual: 'Database transaction rolls back entirely, dropping all 50 records without descriptive error.',
        environment: 'PostgreSQL 15, Windows 11 Enterprise'
      }
    ]
  }
];

export const STATS: StatItem[] = [
  { value: '500+', label: 'Test Cases Executed', icon: 'FileText' },
  { value: '300+', label: 'Bugs Formally Reported', icon: 'Bug' },
  { value: '50+', label: 'APIs Validated & Monitored', icon: 'Terminal' },
  { value: '20+', label: 'Projects Successfully Shipped', icon: 'ShieldCheck' }
];

export interface SandboxBug {
  id: string;
  name: string;
  description: string;
  uiTarget: string;
  foundMessage: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
}

export const SANDBOX_BUGS: SandboxBug[] = [
  {
    id: 'BUG-01',
    name: 'Negative Quantity Exploitation',
    description: 'Allows checkout value to fall below zero by typing negative numbers, giving a negative balance.',
    uiTarget: 'Quantity input selector',
    foundMessage: '🎯 BINGO! You discovered the Negative Billing Bug! Allowing negative inputs in e-commerce results in critical financial loss.',
    severity: 'Critical'
  },
  {
    id: 'BUG-02',
    name: 'Exposed Plaintext Password',
    description: 'The password input element uses type="text" instead of type="password", leaking user credentials.',
    uiTarget: 'Password entry field',
    foundMessage: '🔒 HIGH SEVERITY EXPOSURE! You found the Unmasked Password bug. Credentials must always be obscured in input fields.',
    severity: 'High'
  },
  {
    id: 'BUG-03',
    name: 'Broken "Apply Coupon" Endpoint Trigger',
    description: 'Clicking the coupon button throws a persistent JSON database validation crash (HTTP 500) rather than a clean toast.',
    uiTarget: 'Apply Coupon action',
    foundMessage: '💥 BACKEND CRASH! You triggered the 500 Internal Server error coupon bug. Error boundary fallback is missing.',
    severity: 'Medium'
  },
  {
    id: 'BUG-04',
    name: 'Unresponsive Clipping Area / Text Wrap Overlap',
    description: 'The text "Guaranteed Secure Checkout via Stripe & Encryption Layer" overflows out of its container boundaries on tight grids.',
    uiTarget: 'Footer legal copy text',
    foundMessage: '🎨 REFLOW DEFECT! You spotted the clipping alignment bug. Containers must utilize text-wrap and responsive overflows.',
    severity: 'Low'
  },
  {
    id: 'BUG-05',
    name: 'Duplicate Action Dispatch',
    description: 'The "Complete Checkout" button triggers duplicate events if clicked repeatedly, bypassing disabled state during transit.',
    uiTarget: 'Complete Checkout primary button',
    foundMessage: '🔄 DEBOUNCE FAILURE! Clicking rapidly spawns multiple identical transaction instances. Buttons must lock during API actions.',
    severity: 'High'
  }
];
