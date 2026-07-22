import fs from 'fs';
let code = fs.readFileSync('src/components/ProjectsSlider.tsx', 'utf-8');

const lawxiaBlock = `  },
  {
    title: 'Lawxia - Legal Management Solution',
    type: 'Web Development',
    description: 'Lawxia is a comprehensive legal management solution designed to streamline case handling for lawyers and law firms.',
    technologies: ['ANGULAR', 'PHP', 'LARAVEL', 'AWS'],
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1470&auto=format&fit=crop'
  },`;

code = code.replace(lawxiaBlock, "  },");

fs.writeFileSync('src/components/ProjectsSlider.tsx', code);
