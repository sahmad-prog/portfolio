import fs from 'fs';
let code = fs.readFileSync('src/components/ProjectsSlider.tsx', 'utf-8');

if (!code.includes('savecoach_project_img_1784621819136.jpg')) {
  code = code.replace(
    "import mrgigImg from '../assets/images/mrgig_project_img_1784621669461.jpg';",
    "import mrgigImg from '../assets/images/mrgig_project_img_1784621669461.jpg';\nimport savecoachImg from '../assets/images/savecoach_project_img_1784621819136.jpg';"
  );
  
  code = code.replace(
    "imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop'",
    "imageUrl: savecoachImg"
  );
  
  fs.writeFileSync('src/components/ProjectsSlider.tsx', code);
}
