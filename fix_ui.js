import fs from 'fs';

// 1. Fix App.tsx (Metrics Cards and Sub-Domain Audit)
let appCode = fs.readFileSync('src/App.tsx', 'utf-8');

appCode = appCode.replace(
  '<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">',
  '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">'
);

appCode = appCode.replace(
  /className="truncate"([^>]*>\{it\}<\/span>)/g,
  'className="leading-tight break-words"$1'
);

appCode = appCode.replace(
  '<div className={`grid grid-cols-2 gap-2 text-sm font-mono ${isDarkMode ? \'text-slate-400\' : \'text-slate-600\'}`}>',
  '<div className={`grid grid-cols-1 xl:grid-cols-2 gap-2 text-sm font-mono ${isDarkMode ? \'text-slate-400\' : \'text-slate-600\'}`}>'
);

appCode = appCode.replace(
  /<div key=\{i\} className="flex items-center space-x-2">/g,
  '<div key={i} className="flex items-start space-x-2">'
);

appCode = appCode.replace(
  /<span className="w-1\.5 h-1\.5 rounded-full bg-purple-500 shrink-0" \/>/g,
  '<span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />'
);

fs.writeFileSync('src/App.tsx', appCode);

// 2. Fix JiraBoard.tsx (Tabs overflow)
let jiraCode = fs.readFileSync('src/components/JiraBoard.tsx', 'utf-8');

jiraCode = jiraCode.replace(
  '<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">',
  '<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 min-w-0">'
);

jiraCode = jiraCode.replace(
  '<div className={`flex p-1 rounded-full border space-x-1 shrink-0 self-start overflow-x-auto ${isDarkMode ? \'bg-slate-900/60 border-slate-800\' : \'bg-purple-100 border-purple-200\'}`}>',
  '<div className="w-full lg:w-auto min-w-0 overflow-hidden"><div className={`flex p-1 rounded-full border space-x-1 overflow-x-auto ${isDarkMode ? \'bg-slate-900/60 border-slate-800\' : \'bg-purple-100 border-purple-200\'}`}>'
);

// We need to add the closing div for the new wrapper.
// Find the end of the tabs container.
const tabsEndIdx = jiraCode.indexOf('</div>', jiraCode.indexOf('</button>')) + '</div>'.length; // wait, this might be tricky with regex.
