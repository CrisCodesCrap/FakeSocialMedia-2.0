import CodeMirror from '@uiw/react-codemirror'
import { oneDark } from '@codemirror/theme-one-dark';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { useRef } from 'react';
import { FaUpload } from 'react-icons/fa';
interface InputProps {
    length?: number
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    inputValue: string
    type: string
}

export default function Input({length, setInputValue, type, inputValue}:InputProps) {	
        
    if(type === 'Thread') {
        return ( 
                <div id='editor' className="rounded-lg sm:w-156 sm:h-64 outline-none w-full h-2/3 bg-onedark border inline-flex flex-col items-center border-gray-400">
                    <div className="w-full h-8 flex justify-start items-center">
                        <div className="flex justify-center items-center w-full h-8 rounded-full bg-onedark text-white font-semibold">Code editor</div>
                    </div>
                    <CodeMirror
                        height='14rem'                   
                        theme={oneDark}
                        className='min-h-56 min-w-full h-56 max-h-56 max-w-full overflow-y-auto rounded-lg'
                        extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}                        
                        onChange={(value, viewUpdate) => {
                            /* Store it in a hook or something */
                            setInputValue(value)
                        }}
                    />
                </div>
        )
    }
    else if(type === 'Status') {
        return (
            <div className="rounded-lg sm:w-156 sm:h-64 outline-none w-full h-2/3 bg-onedark border inline-flex flex-col items-center justify-center border-gray-400">
                <div className="w-full h-8 flex justify-start items-center">
                    <div className="flex justify-center items-center w-full h-8 rounded-full bg-onedark text-white font-semibold">Status</div>
                </div>
                <div suppressContentEditableWarning={true} contentEditable={true} className="w-144 h-56 min-h-56 min-w-144 max-h-56 max-w-144 outline-none text-white" data-placeholder="Say what's on your mind..">{inputValue}</div>
            </div>
        )
    }
    else if(type === 'Picture') {
        return(
            <div className="rounded-lg sm:w-156 sm:h-64 outline-none w-full h-2/3 bg-onedark border inline-flex flex-col items-center  border-gray-400">
                    <div className="w-full h-8 flex justify-start items-center">
                        <div className="flex justify-center items-center w-full h-8 rounded-full bg-onedark text-white font-semibold">Picture upload</div>
                    </div>
                    <div className='flex items-start justify-center w-156 h-64'>
                        <div className='text-gray-400 font-semibold opacity-40 mt-16 flex items-center justify-center h-12 w-56 select-none'>Drop files here <FaUpload className='m-2'/></div>
                        <div className='mt-16 h-12 w-12 flex items-center justify-start text-white font-semibold cursor-default select-none'>or</div>
                        <div className='bg-blue-500 rounded-lg w-56 h-12 flex items-center mt-16 justify-center text-white font-semibold cursor-pointer select-none' 
                        onClick={()=>{
                            const fileselector = buildFileSelector()
                            fileselector.click()
                        }}>
                            Upload a picture
                            <FaUpload className='m-2'/>
                        </div>
                    </div>
            </div>
            )
        }
    return(
        <div className='flex h-64 w-156 items-center justify-center text-gray-400 opacity-90 font-semibold'>Select an option to post something.</div>
    )
}

function buildFileSelector(){
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    return fileSelector;
  }

