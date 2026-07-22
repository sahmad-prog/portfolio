import fs from 'fs';
let code = fs.readFileSync('src/components/ProjectsSlider.tsx', 'utf-8');

code = code.replace(
  /<div className="flex flex-wrap gap-4 pt-2">[\s\S]*?<\/div>\s*<div className="pt-4 border-t border-purple-500\/20">/,
  `
              <div className="flex flex-wrap gap-4 pt-2">
                {portfolioProjects[currentIndex].type.includes('UI/UX') && (
                  <div className={\`flex items-center space-x-2 font-semibold text-sm \${isDarkMode ? 'text-slate-300' : 'text-slate-700'}\`}>
                    <PenTool className="w-5 h-5 text-purple-500" />
                    <span>UI/UX Design</span>
                  </div>
                )}
                {portfolioProjects[currentIndex].type.includes('Web') && (
                  <div className={\`flex items-center space-x-2 font-semibold text-sm \${isDarkMode ? 'text-slate-300' : 'text-slate-700'}\`}>
                    <Code className="w-5 h-5 text-purple-500" />
                    <span>Web Development</span>
                  </div>
                )}
                {portfolioProjects[currentIndex].type.includes('App') && (
                  <div className={\`flex items-center space-x-2 font-semibold text-sm \${isDarkMode ? 'text-slate-300' : 'text-slate-700'}\`}>
                    <Smartphone className="w-5 h-5 text-purple-500" />
                    <span>App Development</span>
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-purple-500/20">`
);

fs.writeFileSync('src/components/ProjectsSlider.tsx', code);
