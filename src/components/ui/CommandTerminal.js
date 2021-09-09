import { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import 'xterm/css/xterm.css';

const arrayBufferToString = buf => {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}

const CommandTerminal = ({ commands = [] }) => {

    const terminalEl = useRef();
    const [terminalTitle, setTerminalTitle] = useState('Terminal');

    useEffect(() => {
        const textEncoder = new TextEncoder();

        const term = new Terminal({
            screenKeys: true,
            useStyle: true,
            cursorBlink: true,
        });
        term.open(terminalEl.current);

        let retryHandle = null;

        const connectTerminal = () => {
            const websocket = new WebSocket('ws://127.0.0.1:3000/term');
            websocket.binaryType = 'arraybuffer';

            term.onData(data => {
                websocket.send(textEncoder.encode("\x00" + data));
            });

            term.onResize(ev => {
                websocket.send(textEncoder.encode("\x01" + JSON.stringify({ cols: ev.cols, rows: ev.rows })))
            });

            term.onTitleChange(title => {
                setTerminalTitle(title);
            });

            websocket.onopen = ev => {
                setTerminalTitle('Connected!')

                commands.forEach(command => {
                    websocket.send(textEncoder.encode("\x00" + command + "\r\n"));
                })

                term.focus();
            };

            websocket.onmessage = ev => {
                if (ev.data instanceof ArrayBuffer) {
                    term.write(arrayBufferToString(ev.data));
                } else {
                    console.info(ev.data);
                }
            }

            websocket.onerror = ev => {
                console.error(ev);
                websocket.close();
            }

            websocket.onclose = ev => {
                setTerminalTitle('Disconnected')
                clearTimeout(retryHandle);
                retryHandle = setTimeout(connectTerminal, 1000);
            }
        }

        connectTerminal();

        return () => {
            term.dispose();
        }
    }, [commands]);

    return <div>
        <h4>{terminalTitle}</h4>
        <div ref={terminalEl}></div>
    </div>
}

export default CommandTerminal;
