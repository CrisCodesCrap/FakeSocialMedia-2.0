import CodeMirror from '@uiw/react-codemirror'
import { oneDark } from '@codemirror/theme-one-dark';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
interface InputProps {
    length: number
    changeValue: React.Dispatch<React.SetStateAction<string>>
    value: string
    type: string
}

export default function Input() {
    
    return ( 
                <div id='editor' className="rounded-lg outline-none w-156 h-64 bg-onedark border inline-flex flex-col items-center border-gray-400">
                    <div className="w-full h-8 flex justify-start items-center">
                        <div className="flex justify-center items-center w-full h-8 rounded-full bg-onedark text-white font-semibold"> Code editor</div>
                    </div>
                    <CodeMirror
                        theme={oneDark}
                        className='min-h-56 min-w-full h-56 max-h-56 max-w-full overflow-y-auto rounded-lg'
                        extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}                        
                        onChange={(value, viewUpdate) => {
                        /* Store it in a hook or something */
                        }}
                    />
                </div>
    )
}

