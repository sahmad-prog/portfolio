import fs from 'fs';
let code = fs.readFileSync('src/components/ProjectsSlider.tsx', 'utf-8');

if (!code.includes('mrgig_project_img_1784621669461.jpg')) {
  code = code.replace(
    "import copeImg from '../assets/images/cope_project_img_1784620645434.jpg';",
    "import copeImg from '../assets/images/cope_project_img_1784620645434.jpg';\nimport mrgigImg from '../assets/images/mrgig_project_img_1784621669461.jpg';"
  );
  
  code = code.replace(
    "imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c82633?q=80&w=1470&auto=format&fit=crop'",
    "imageUrl: mrgigImg"
  );
  
  fs.writeFileSync('src/components/ProjectsSlider.tsx', code);
}
