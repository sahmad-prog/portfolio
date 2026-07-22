import fs from 'fs';
let code = fs.readFileSync('src/components/ProjectsSlider.tsx', 'utf-8');

if (!code.includes('lumi_project_1784619336289.jpg')) {
  code = code.replace(
    "import { ChevronLeft, ChevronRight, PenTool, Code, Smartphone } from 'lucide-react';",
    "import { ChevronLeft, ChevronRight, PenTool, Code, Smartphone } from 'lucide-react';\nimport lumiProjectImg from '../assets/images/lumi_project_1784619336289.jpg';"
  );
  
  code = code.replace(
    "imageUrl: '/lumi-project.png'",
    "imageUrl: lumiProjectImg"
  );
  
  fs.writeFileSync('src/components/ProjectsSlider.tsx', code);
}
