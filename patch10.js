import fs from 'fs';
let code = fs.readFileSync('src/components/ProjectsSlider.tsx', 'utf-8');

const newImports = `import localbountyImg from '../assets/images/localbounty_project_1784624213789.jpg';
import motherjunkerImg from '../assets/images/motherjunker_project_1784624407511.jpg';
import batchedImg from '../assets/images/batched_project_1784624425110.jpg';
import renewraImg from '../assets/images/renewra_project_1784624442256.jpg';
import imaalgaliImg from '../assets/images/imaalgali_project_1784624457302.jpg';
import childrensaudioImg from '../assets/images/childrensaudio_project_1784624472655.jpg';
import poweraboveclockImg from '../assets/images/poweraboveclock_project_1784624488146.jpg';
import businessbossesImg from '../assets/images/businessbosses_project_1784624504447.jpg';`;

code = code.replace(
  "import localbountyImg from '../assets/images/localbounty_project_1784624213789.jpg';",
  newImports
);

const newProjects = `    imageUrl: localbountyImg
  },
  {
    title: 'Mother Junker - Real Estate Network Platform',
    type: 'UI/UX Design | Web Development',
    description: 'Mother Junker Web is a nationwide membership-based platform designed to connect real estate professionals with trusted clean-out specialists through a structured digital network.',
    technologies: ['REACT.JS', 'NODE.JS', 'AWS'],
    imageUrl: motherjunkerImg
  },
  {
    title: 'Batched - Creator Booking & Collaboration Platform',
    type: 'UI/UX Design | Web Development',
    description: 'Batched is a modern creator booking platform designed to connect entrepreneurs and brands with content creators through a streamlined inquiry, booking, and collaboration system.',
    technologies: ['ANGULAR', 'LARAVEL', 'AWS'],
    imageUrl: batchedImg
  },
  {
    title: 'Renewra - Faith & Wellness Community App',
    type: 'UI/UX Design | Mobile App Development',
    description: 'Renewar is a faith-based wellness and community platform designed to provide users with a calming digital space for spiritual growth, emotional reflection, and positive daily encouragement.',
    technologies: ['REACT NATIVE', 'SUPABASE'],
    imageUrl: renewraImg
  },
  {
    title: 'Imaalgali - Investment Registration & Share Management Platform',
    type: 'UI/UX Design | Mobile App Development',
    description: 'Imaalgali is a multilingual mobile investment registration platform designed to simplify share application and user onboarding through a clean, secure, and user-friendly digital experience. The platform enables users to submit investment interest requests, manage share allocations, and receive automated confirmation details through a streamlined mobile workflow.',
    technologies: ['IONIC', 'SUPABASE'],
    imageUrl: imaalgaliImg
  },
  {
    title: 'Children\\'s Audio - Educational Audio Platform',
    type: 'UI/UX Design | Web Development',
    description: 'Children\\'s Audio is a modern phonics learning platform designed to provide children, parents, and teachers with a seamless and interactive educational audio experience.',
    technologies: ['WORDPRESS'],
    imageUrl: childrensaudioImg
  },
  {
    title: 'POWER ABOVE THE CLOCK - Faith-Based Fitness & Wellness Tracking Platform',
    type: 'UI/UX Design | App Development',
    description: 'Power Above The Clock is a faith-based fitness and wellness platform designed to help users improve their physical health while staying spiritually motivated throughout their fitness journey. The platform combines workout routines, nutrition planning, motivational spiritual content, progress tracking, and personalized fitness scheduling into one simple and engaging mobile experience.',
    technologies: ['FLUTTER', 'LARAVEL', 'AWS'],
    imageUrl: poweraboveclockImg
  },
  {
    title: 'Business Bosses - Business Networking & Growth App',
    type: 'UI/UX Design | App Development | SQA Engineering',
    description: 'Start and grow your business within a professional networking platform do you have a business idea and want to start a business but are not sure how? Or are you an already-established small business, freelancer, or solopreneur looking to grow and succeed? Join Business Bosses now and you’ll have a whole community, resources, tools, and networking platform',
    technologies: ['FLUTTER', 'NODE.JS', 'REACT', 'AWS'],
    imageUrl: businessbossesImg
  }`;

code = code.replace(
  "    imageUrl: localbountyImg\n  }",
  newProjects
);

fs.writeFileSync('src/components/ProjectsSlider.tsx', code);
