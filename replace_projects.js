import fs from 'fs';
let code = fs.readFileSync('src/components/ProjectsSlider.tsx', 'utf-8');

const newProjects = `const portfolioProjects: Project[] = [
  {
    title: 'Lumi - Skincare & Aesthetic Treatment Management Platform',
    type: 'UI/UX Design | App Development',
    description: 'LUMI is a comprehensive skincare and aesthetic treatment management platform built for medical aesthetic clinics, nurse injectors, and skincare practitioners to deliver personalized client care through a centralized digital ecosystem.',
    technologies: ['FLUTTER', 'ANGULAR', 'AWS', 'PHP', 'MYSQL'],
    imageUrl: lumiProjectImg
  },
  {
    title: 'BuyMyStuff - E-Commerce Marketplace',
    type: 'UI/UX Design | App Development | Web Development',
    description: 'BMS introduces WINDOW SHOPPING, which are videos created by our community of users and influencers, and they provide a fun and entertaining way to discover new products and brands.',
    technologies: ['PHP', 'IONIC', 'ANGULAR', 'FIREBASE', 'AWS'],
    imageUrl: buymystuffImg
  },
  {
    title: 'BodyF1rst - Personalized Fitness & Nutrition Coaching Platform',
    type: 'App Development | Web Development | UI/UX Design',
    description: 'BodyF1rst is a comprehensive fitness application designed to connect coaches, and users through personalized workout plans, nutrition tracking, and exercise management.',
    technologies: ['ANGULAR', 'IONIC', 'PHP', 'MYSQL', 'AWS'],
    imageUrl: bodyf1rstImg
  },
  {
    title: 'Save Coach - Personal Finance Tracker & Tax Planner',
    type: 'App Development | Web Development | UI/UX Design',
    description: 'Save Coach Project is a financial management application designed to help users effectively track their expenses, manage budgets, monitor tax payments, and receive timely reminders. It also includes an educational section to enhance users’ financial literacy and a referral program to reward user engagement. The app aims to simplify financial planning through an intuitive dashboard, automated notifications, and insightful analytics.',
    technologies: ['PHP', 'FLUTTER', 'REACT JS', 'LARAVEL', 'MYSQL'],
    imageUrl: savecoachImg
  },
  {
    title: 'Mr.Gig - Courier Delivery Platform',
    type: 'App Development | UI/UX Design | SQA Engineering',
    description: 'MrGig is an innovative courier delivery platform designed to simplify and streamline the entire delivery process for businesses and individuals alike. With user-friendly features and powerful tracking capabilities, MrGig ensures fast, secure, and reliable deliveries every time.',
    technologies: ['FLUTTER'],
    imageUrl: mrgigImg
  },
  {
    title: 'Cope - Security Staff Booking and Management Solution',
    type: 'Web Development | SQA Engineering',
    description: 'Cope is an all-in-one staff management solution designed to help businesses efficiently manage their workforce while ensuring seamless communication, improved productivity, and accurate record-keeping. With user-friendly features and powerful automation tools, Cope empowers managers to stay organized and employees to stay informed.',
    technologies: ['ANGULAR', 'FIREBASE'],
    imageUrl: copeImg
  }
];`;

const startIdx = code.indexOf('const portfolioProjects: Project[] = [');
const endIdx = code.indexOf('];', startIdx) + 2;

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + newProjects + code.substring(endIdx);
  fs.writeFileSync('src/components/ProjectsSlider.tsx', code);
  console.log('Replaced successfully');
} else {
  console.log('Could not find portfolioProjects array');
}
