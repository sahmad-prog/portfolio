import fs from 'fs';
let code = fs.readFileSync('src/components/ProjectsSlider.tsx', 'utf-8');

if (!code.includes('bodyf1rst_project_1784620447740.jpg')) {
  code = code.replace(
    "import buymystuffImg from '../assets/images/buymystuff_project_1784620078505.jpg';",
    "import buymystuffImg from '../assets/images/buymystuff_project_1784620078505.jpg';\nimport bodyf1rstImg from '../assets/images/bodyf1rst_project_1784620447740.jpg';"
  );
  
  code = code.replace(
    "imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop'",
    "imageUrl: bodyf1rstImg"
  );
  
  fs.writeFileSync('src/components/ProjectsSlider.tsx', code);
}
