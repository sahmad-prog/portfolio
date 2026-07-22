import fs from 'fs';

let code = fs.readFileSync('src/components/ProjectsSlider.tsx', 'utf-8');

code = code.replace(
  '<div className={`w-full md:w-1/2 min-h-[300px] md:min-h-[400px] rounded-2xl overflow-hidden relative shadow-lg group flex items-center justify-center p-4 ${isDarkMode ? \'bg-[#150F30]\' : \'bg-slate-50\'}`}>',
  '<div className={`w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[400px] rounded-2xl overflow-hidden relative shadow-lg group flex items-center justify-center p-4 ${isDarkMode ? \'bg-[#150F30]\' : \'bg-slate-50\'}`}>'
);

code = code.replace(
  'className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-contain object-center transition-transform duration-700 group-hover:scale-105"',
  'className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105"'
);

fs.writeFileSync('src/components/ProjectsSlider.tsx', code);
