import { State } from './state.js';


export function cleanInput(input: string): string[]{
    return input.split(/\s+/).filter(word => word.length > 0 );
}

export async function startREPL(state: State) {
    
  const {readline: rl, commands } = state;

    rl.prompt();

    rl.on('line', async (line) => {
        const words = cleanInput(line);
        if(words.length === 0){
            rl.prompt();
            return;
        }

        const commandWord = words[0].toLowerCase();
        const args = words.slice(1);
        const command = commands[commandWord];

        if(command){
            try{
                await command.callback(state, ...args);
            }catch(error){
                console.error(`Error executing command '${commandWord}':`, error);
            }
        }else {
            console.log(`Unknown command. Type 'help' for a list of commands.`);
        }
       

        rl.prompt();


    });
    rl.on('close', async () => {
        await state.commands.exit.callback(state);
    });
}