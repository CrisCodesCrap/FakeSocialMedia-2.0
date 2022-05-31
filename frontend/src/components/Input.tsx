import CodeMirror from '@uiw/react-codemirror'
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python';
import { json } from '@codemirror/lang-json';
import { lezer } from '@codemirror/lang-lezer';
import { markdown } from '@codemirror/lang-markdown';
import { php } from '@codemirror/lang-php';
import { rust } from '@codemirror/lang-rust';
import { sql } from '@codemirror/lang-sql';
import { xml } from '@codemirror/lang-xml';
import { java } from '@codemirror/lang-java';
import { html } from '@codemirror/lang-html';
import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
interface InputProps {
    length: number
    changeValue: React.Dispatch<React.SetStateAction<string>>
    value: string
    type: string
}

export default function Input() {
    
    return ( 
                <div id='editor' className="rounded-lg outline-none w-156 h-48 bg-onedark border inline-flex flex-col items-center border-gray-400">
                    <div className="w-full h-8 flex justify-start items-center">
                        <div className="flex justify-center items-center w-full h-8 rounded-full bg-onedark text-white font-semibold"> Code editor</div>
                    </div>
                    <CodeMirror
                        theme={oneDark}
                        className='min-h-40 min-w-full h-40 max-h-40 overflow-y-auto rounded-lg'
                        extensions={[
                            javascript({ jsx: true, typescript:true }),
                            python(),
                            json(),
                            lezer(),
                            markdown(),
                            php(),
                            rust(),
                            sql(),
                            xml(),
                            java(),
                            html(),
                            cpp(),
                            css(),
                            e

                        ]}
                        onChange={(value, viewUpdate) => {
                        /* Store it in a hook or something */
                        }}
                    />
                </div>
    )
}

