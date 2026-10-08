const fs = require('fs');
let file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<button\s*<\/motion\.div>/;
// Wait, the file currently has:
//           <button
//         </motion.div>

content = content.replace(
  /          <button\s*<\/motion\.div>/m,
  `          <button
            onClick={() => {
              sfx.click();
              setGameState(prev => ({ ...prev, introSeen: true }));
            }}
            className="mt-8 px-6 py-3 border border-[#4a8270] text-[#8fd16a] rounded hover:bg-[#4a8270]/10 transition-all font-mono text-sm uppercase tracking-wider"
          >
            Abrir os olhos
          </button>
        </motion.div>`
);

fs.writeFileSync(file, content);
