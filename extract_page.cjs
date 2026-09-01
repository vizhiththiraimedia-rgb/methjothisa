const fs = require('fs');
const transcript = fs.readFileSync('C:/Users/ASUS/.gemini/antigravity/brain/94e8b8a5-0353-4aca-a00e-80349e22a339/.system_generated/logs/transcript_full.jsonl', 'utf8');
const lines = transcript.split('\n');

let best = '';
let maxLen = 0;

for (const line of lines) {
    if (!line) continue;
    try {
        const parsed = JSON.parse(line);
        if (parsed.tool_calls) {
            for (const call of parsed.tool_calls) {
                if (call.name === 'write_to_file' || call.name === 'replace_file_content') {
                    if (call.arguments) {
                        try {
                            const args = typeof call.arguments === 'string' ? JSON.parse(call.arguments) : call.arguments;
                            if (args.TargetFile && args.TargetFile.includes('page.tsx')) {
                                const content = args.CodeContent || args.ReplacementContent;
                                if (content && content.length > maxLen) {
                                    maxLen = content.length;
                                    best = content;
                                }
                            }
                        } catch(e) {}
                    }
                }
            }
        }
    } catch(e) {}
}

if (best) {
    fs.writeFileSync('src/app/charts/[id]/page.tsx', best);
    console.log('Restored page.tsx length:', best.length);
} else {
    console.log('Failed to find best content');
}
