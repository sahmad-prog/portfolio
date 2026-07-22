import fs from 'fs';

let jiraCode = fs.readFileSync('src/components/JiraBoard.tsx', 'utf-8');

jiraCode = jiraCode.replace(
  'custom-scrollbar',
  '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
);

fs.writeFileSync('src/components/JiraBoard.tsx', jiraCode);
