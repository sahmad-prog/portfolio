import fs from 'fs';

let appCode = fs.readFileSync('src/App.tsx', 'utf-8');

appCode = appCode.replace(
  '                <div>\n                  <span className="block text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">{st.value}</span>\n                  <span className={`text-sm font-bold uppercase tracking-wider block mt-0.5 ${isDarkMode ? \'text-slate-400\' : \'text-purple-800\'}`}>{st.label}</span>\n                </div>',
  '                <div className="flex-1 min-w-0">\n                  <span className="block text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">{st.value}</span>\n                  <span className={`text-sm font-bold uppercase tracking-wider block mt-0.5 leading-tight ${isDarkMode ? \'text-slate-400\' : \'text-purple-800\'}`}>{st.label}</span>\n                </div>'
);

fs.writeFileSync('src/App.tsx', appCode);
