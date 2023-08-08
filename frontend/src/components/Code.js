import { useState } from 'react';
import './Code.css';
import CodeMirror from '@uiw/react-codemirror';

function Code() {
    const [code, setCode] = useState('print("hello world")');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState("");
    const [language, setLang] = useState("python");

    const handleChange = (newCode) => {
        setCode(newCode);
    };

    const handleInputChange = (e) => {
        console.log(e.target.value)
        setInput(e.target.value);
    };

    const handleSelectChange = (e) => {
        const selectedLanguage = e.target.value;
        console.log(selectedLanguage);
        setLang(selectedLanguage);
    };

    const handleRunCode = (e) => {
        console.log(input);
        fetch("/api/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                input: input,
                code: code,
                language: language
            }),
        })
            .then((response) => response.json())
            .then((data) => {

                setOutput(data.output)
                console.log(data.output)
            })
            .catch((error) => console.error(error));

    };


    return (
        <div className='main'>
        <div className='navbar'>
        <div className='webname'>
            <p>compile<span>X</span></p>
        </div>
        <div className='temp'>
            <div className='lang'>
                <form>
                    <select name="language" onChange={handleSelectChange}>
                        <option value="python">Python</option>
                        <option value="cpp">C++</option>
                    </select>
                </form>
            </div>
            <div className='run-button'>
                <button onClick={handleRunCode}>Run</button>
            </div>

        </div>
    </div>
            <div className='container'>
            <div className='container-left'>
            <CodeMirror className='code-box'
                width='100%'
                height='480px'
                value={code}
                options={{
                    mode: 'python',
                    theme: 'dracula',
                }}
                onChange={handleChange}
            />
        </div>
                <div className='container-right'>
                    <div className='input-box'>
                        <textarea rows={14} cols={30}
                            placeholder='Enter input'
                            value={input}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div className='output-box'>
                        <textarea placeholder='output' rows={14} cols={30} readOnly value={output} style={{ whiteSpace: 'pre-wrap' }} >
                        </textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Code;
