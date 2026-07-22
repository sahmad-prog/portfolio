import fs from 'fs';
let code = fs.readFileSync('src/components/ProjectsSlider.tsx', 'utf-8');

if (!code.includes('cope_project_img_1784620645434.jpg')) {
  code = code.replace(
    "import bodyf1rstImg from '../assets/images/bodyf1rst_project_1784620447740.jpg';",
    "import bodyf1rstImg from '../assets/images/bodyf1rst_project_1784620447740.jpg';\nimport copeImg from '../assets/images/cope_project_img_1784620645434.jpg';"
  );
  
  code = code.replace(
    "imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop'",
    "imageUrl: copeImg"
  );
  
  fs.writeFileSync('src/components/ProjectsSlider.tsx', code);
}
