import fs from 'fs';
let code = fs.readFileSync('src/components/ProjectsSlider.tsx', 'utf-8');

const newImports = `import savecoachImg from '../assets/images/savecoach_project_img_1784621819136.jpg';
import drippImg from '../assets/images/dripp_project_1784624129840.jpg';
import randevalImg from '../assets/images/randeval_project_1784624149975.jpg';
import servImg from '../assets/images/serv_project_1784624165445.jpg';
import cnectnplayImg from '../assets/images/cnectnplay_project_1784624182127.jpg';
import doorinspecImg from '../assets/images/doorinspec_project_1784624195943.jpg';
import localbountyImg from '../assets/images/localbounty_project_1784624213789.jpg';`;

code = code.replace(
  "import savecoachImg from '../assets/images/savecoach_project_img_1784621819136.jpg';",
  newImports
);

const newProjects = `  {
    title: 'Cope - Security Staff Booking and Management Solution',
    type: 'Web Development | SQA Engineering',
    description: 'Cope is an all-in-one staff management solution designed to help businesses efficiently manage their workforce while ensuring seamless communication, improved productivity, and accurate record-keeping. With user-friendly features and powerful automation tools, Cope empowers managers to stay organized and employees to stay informed.',
    technologies: ['ANGULAR', 'FIREBASE'],
    imageUrl: copeImg
  },
  {
    title: 'DRIPP - Beauty Services & Appointment Booking Platform',
    type: 'UI/UX Design | App Development',
    description: 'DRIPP is a modern beauty services marketplace designed to connect clients with beauty technicians through a seamless mobile-first experience. The platform enables users to discover local beauty professionals, browse services, book appointments, and manage their beauty experiences from one intuitive ecosystem.',
    technologies: ['FLUTTER', 'NODE.JS', 'AWS'],
    imageUrl: drippImg
  },
  {
    title: 'Randeval - Service Booking & Local Professionals Marketplace',
    type: 'UI/UX Design | App Development',
    description: 'Randeval is a modern service booking platform designed to connect users with local professionals, salons, and beauty experts through a seamless mobile experience. The app allows users to discover nearby service providers, explore categories, book appointments, and manage their bookings all in one convenient platform.',
    technologies: ['FLUTTER', 'NODE.JS', 'AWS'],
    imageUrl: randevalImg
  },
  {
    title: 'Serv - Service Booking Platform',
    type: 'UI/UX Design | App Development',
    description: 'Serv is a smart electrician service and maintenance platform designed to simplify the process of booking, managing, and tracking electrical services. The app connects customers with professional electricians for residential, commercial, and maintenance-related tasks through a seamless and user-friendly mobile experience.',
    technologies: ['IONIC', 'LARAVEL', 'AWS'],
    imageUrl: servImg
  },
  {
    title: 'CnectNPlay - Sports Gaming & Community Engagement Platform',
    type: 'UI/UX Design | App Development',
    description: 'CnectNPlay is an interactive sports and gaming platform designed to connect players, hosts, and communities through competitive and casual game experiences. The platform allows users to create, host, join, and manage sports activities while building a social environment centered around teamwork, competition, and collaboration.',
    technologies: ['FLUTTER', 'LARAVEL', 'AWS'],
    imageUrl: cnectnplayImg
  },
  {
    title: 'DoorInspec+ - Fire Door Inspection & Maintenance Management Platform',
    type: 'UI/UX Design | App Development',
    description: 'DoorInspec+ is a smart inspection and maintenance platform designed to streamline the monitoring, servicing, and compliance management of fire doors across residential, commercial, and industrial properties. The app enables inspectors, maintenance teams, and facility managers to efficiently track fire door conditions, schedule inspections, and maintain safety compliance through a centralized digital system.',
    technologies: ['FLUTTER', 'LARAVEL', 'AWS'],
    imageUrl: doorinspecImg
  },
  {
    title: 'Local Bounty - E-Commerce & Community Platform',
    type: 'UI/UX Design | App Development',
    description: 'Local Bounty is a community-driven marketplace platform designed to connect local farmers, food producers, and nearby customers through a simple and engaging digital experience. The app allows farmers and small businesses to showcase their products, share daily updates, and build direct relationships with their local community.',
    technologies: ['IONIC', 'NODE.JS', 'AWS'],
    imageUrl: localbountyImg
  }`;

code = code.replace(
  /\{\s*title:\s*'Cope - Security Staff Booking and Management Solution'[^}]+\},?/,
  newProjects
);

fs.writeFileSync('src/components/ProjectsSlider.tsx', code);
