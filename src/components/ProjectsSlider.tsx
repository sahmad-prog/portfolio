import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, PenTool, Code, Smartphone } from 'lucide-react';
import lumiProjectImg from '../assets/images/lumi_project_1784619336289.jpg';
import buymystuffImg from '../assets/images/buymystuff_project_1784620078505.jpg';
import bodyf1rstImg from '../assets/images/bodyf1rst_project_1784620447740.jpg';
import copeImg from '../assets/images/cope_project_img_1784620645434.jpg';
import mrgigImg from '../assets/images/mrgig_project_img_1784621669461.jpg';
import savecoachImg from '../assets/images/savecoach_project_img_1784621819136.jpg';
import drippImg from '../assets/images/dripp_project_1784624129840.jpg';
import randevalImg from '../assets/images/randeval_project_1784624149975.jpg';
import servImg from '../assets/images/serv_project_1784624165445.jpg';
import cnectnplayImg from '../assets/images/cnectnplay_project_1784624182127.jpg';
import doorinspecImg from '../assets/images/doorinspec_project_1784624195943.jpg';
import localbountyImg from '../assets/images/localbounty_project_1784624213789.jpg';
import motherjunkerImg from '../assets/images/motherjunker_project_1784624407511.jpg';
import batchedImg from '../assets/images/batched_project_1784624425110.jpg';
import renewraImg from '../assets/images/renewra_project_1784624442256.jpg';
import imaalgaliImg from '../assets/images/imaalgali_project_1784624457302.jpg';
import childrensaudioImg from '../assets/images/childrensaudio_project_1784624472655.jpg';
import poweraboveclockImg from '../assets/images/poweraboveclock_project_1784624488146.jpg';
import businessbossesImg from '../assets/images/businessbosses_project_1784624504447.jpg';

interface Project {
  title: string;
  type: string;
  description: string;
  technologies: string[];
  imageUrl: string;
}

const portfolioProjects: Project[] = [
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
    title: 'Children\'s Audio - Educational Audio Platform',
    type: 'UI/UX Design | Web Development',
    description: 'Children\'s Audio is a modern phonics learning platform designed to provide children, parents, and teachers with a seamless and interactive educational audio experience.',
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
  }
];

interface Props {
  isDarkMode: boolean;
}

export default function ProjectsSlider({ isDarkMode }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === portfolioProjects.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? portfolioProjects.length - 1 : prev - 1));
  };

  return (
    <div className={`relative max-w-6xl mx-auto p-6 md:p-10 rounded-3xl border shadow-xl ${isDarkMode ? 'bg-[#150F30]/80 border-purple-950/40' : 'bg-white border-purple-100'}`}>
      <div className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 z-10">
        <button
          onClick={handlePrev}
          className={`p-2 md:p-3 rounded-full border shadow-md transition-all ${isDarkMode ? 'bg-[#120E2C] border-purple-900/50 text-purple-400 hover:bg-purple-900/30' : 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50'}`}
          aria-label="Previous project"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <div className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 z-10">
        <button
          onClick={handleNext}
          className={`p-2 md:p-3 rounded-full border shadow-md transition-all ${isDarkMode ? 'bg-[#120E2C] border-purple-900/50 text-purple-400 hover:bg-purple-900/30' : 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50'}`}
          aria-label="Next project"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <div className="overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col md:flex-row items-stretch gap-8 md:gap-12"
          >
            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-5 md:space-y-6 py-4">
              <div>
                <h3 className={`text-2xl md:text-3xl font-extrabold tracking-tight leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {portfolioProjects[currentIndex].title}
                </h3>
              </div>
              
              <p className={`text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {portfolioProjects[currentIndex].description}
              </p>

              
              <div className="flex flex-wrap gap-4 pt-2">
                {portfolioProjects[currentIndex].type.includes('UI/UX') && (
                  <div className={`flex items-center space-x-2 font-semibold text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <PenTool className="w-5 h-5 text-purple-500" />
                    <span>UI/UX Design</span>
                  </div>
                )}
                {portfolioProjects[currentIndex].type.includes('Web') && (
                  <div className={`flex items-center space-x-2 font-semibold text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <Code className="w-5 h-5 text-purple-500" />
                    <span>Web Development</span>
                  </div>
                )}
                {portfolioProjects[currentIndex].type.includes('App') && (
                  <div className={`flex items-center space-x-2 font-semibold text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <Smartphone className="w-5 h-5 text-purple-500" />
                    <span>App Development</span>
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-purple-500/20">
                <div className="flex flex-wrap gap-3">
                  {portfolioProjects[currentIndex].technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className={`px-4 py-1.5 text-xs font-mono font-bold rounded-full border shadow-sm ${isDarkMode ? 'bg-purple-950/30 text-purple-300 border-purple-900/30' : 'bg-white text-purple-800 border-purple-200'}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={`w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[400px] rounded-2xl overflow-hidden relative shadow-lg group flex items-center justify-center p-4 ${isDarkMode ? 'bg-[#150F30]' : 'bg-slate-50'}`}>
              <div className={`absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none ${isDarkMode ? 'bg-purple-900' : 'bg-purple-300'}`}></div>
              <img 
                src={portfolioProjects[currentIndex].imageUrl} 
                alt={portfolioProjects[currentIndex].title}
                className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {portfolioProjects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all ${currentIndex === idx ? (isDarkMode ? 'bg-purple-500 scale-125' : 'bg-purple-600 scale-125') : (isDarkMode ? 'bg-slate-700 hover:bg-slate-500' : 'bg-purple-200 hover:bg-purple-400')}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
