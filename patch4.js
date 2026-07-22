import fs from 'fs';
let code = fs.readFileSync('src/components/ProjectsSlider.tsx', 'utf-8');

code = code.replace(
  "import lumiProjectImg from '../assets/images/lumi_project_1784619336289.jpg';",
  "import lumiProjectImg from '../assets/images/lumi_project_1784619336289.jpg';\nimport buymystuffImg from '../assets/images/buymystuff_project_1784620078505.jpg';"
);

code = code.replace(
  "imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1470&auto=format&fit=crop'",
  "imageUrl: buymystuffImg"
);

fs.writeFileSync('src/components/ProjectsSlider.tsx', code);
