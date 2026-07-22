import fs from 'fs';

let jiraCode = fs.readFileSync('src/components/JiraBoard.tsx', 'utf-8');

jiraCode = jiraCode.replace(
  '<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">',
  '<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 min-w-0">'
);

jiraCode = jiraCode.replace(
  '<div className={`flex p-1 rounded-full border space-x-1 shrink-0 self-start overflow-x-auto ${isDarkMode ? \'bg-slate-900/60 border-slate-800\' : \'bg-purple-100 border-purple-200\'}`}>',
  '<div className="w-full lg:w-auto min-w-0"><div className={`flex p-1 rounded-full border space-x-1 overflow-x-auto custom-scrollbar ${isDarkMode ? \'bg-slate-900/60 border-slate-800\' : \'bg-purple-100 border-purple-200\'}`}>'
);

// We need to add `</div>` after the mapping.
jiraCode = jiraCode.replace(
  /(\s*\{\s*PROJECTS\.map[\s\S]*?<\/button>\s*\)\)\s*\}\s*<\/div>)/,
  '$1\n        </div>'
);

fs.writeFileSync('src/components/JiraBoard.tsx', jiraCode);
