import fs from 'fs';
let code = fs.readFileSync('src/components/ProjectsSlider.tsx', 'utf-8');

code = code.replace(
  /'https:\/\/images.unsplash.com\/photo-1551288049-bebda4e38f71\?q=80&w=1470&auto=format&fit=crop'/,
  "'/lumi-project.png'"
);

fs.writeFileSync('src/components/ProjectsSlider.tsx', code);
