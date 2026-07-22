import fs from 'fs';
let code = fs.readFileSync('src/components/ProjectsSlider.tsx', 'utf-8');

code = code.replace(
  '<div className="overflow-hidden relative min-h-[550px] md:min-h-[450px]">',
  '<div className="overflow-hidden relative">'
);

code = code.replace(
  'className="absolute inset-0 flex flex-col md:flex-row items-center gap-8 md:gap-12"',
  'className="w-full flex flex-col md:flex-row items-stretch gap-8 md:gap-12"'
);

code = code.replace(
  'className={`text-2xl md:text-3xl font-extrabold tracking-tight leading-tight ${isDarkMode ? \'text-white\' : \'text-slate-900\'}`}',
  'className={`text-2xl md:text-3xl font-extrabold tracking-tight leading-snug ${isDarkMode ? \'text-white\' : \'text-slate-900\'}`}'
);

code = code.replace(
  '<div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">',
  '<div className="w-full md:w-1/2 flex flex-col justify-center space-y-5 md:space-y-6 py-4">'
);

code = code.replace(
  '<div className={`w-full md:w-1/2 h-64 md:h-full rounded-2xl overflow-hidden relative shadow-lg group flex items-center justify-center ${isDarkMode ? \'bg-[#150F30]\' : \'bg-slate-50\'}`}>',
  '<div className={`w-full md:w-1/2 min-h-[300px] md:min-h-[400px] rounded-2xl overflow-hidden relative shadow-lg group flex items-center justify-center p-4 ${isDarkMode ? \'bg-[#150F30]\' : \'bg-slate-50\'}`}>'
);

code = code.replace(
  'className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105"',
  'className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-contain object-center transition-transform duration-700 group-hover:scale-105"'
);

fs.writeFileSync('src/components/ProjectsSlider.tsx', code);
