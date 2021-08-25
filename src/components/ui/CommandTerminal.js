import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import 'xterm/css/xterm.css';

const CommandTerminal = () => {

    const terminalEl = useRef();

    useEffect(() => {
        var websocket = new WebSocket("ws://127.0.0.1:3000/term");
        websocket.binaryType = "arraybuffer";

        function ab2str(buf) {
            return String.fromCharCode.apply(null, new Uint8Array(buf));
        }

        websocket.onopen = ev => {
            let term = new Terminal({
                screenKeys: true,
                useStyle: true,
                cursorBlink: true,
            });

            term.onData(data => {
                websocket.send(new TextEncoder().encode("\x00" + data));
            });

            term.onResize(ev => {
                websocket.send(new TextEncoder().encode("\x01" + JSON.stringify({ cols: ev.cols, rows: ev.rows })))
            });

            term.onTitleChange(title => {
                document.title = title;
            });

            term.open(terminalEl.current);
            websocket.onmessage = ev => {
                if (ev.data instanceof ArrayBuffer) {
                    term.write(ab2str(ev.data));
                } else {
                    console.info(ev.data);
                }
            }

            websocket.onclose = ev => {
                term.destroy();
            }

            websocket.onerror = ev => {
                if (typeof console.log == "function") {
                    console.log(ev)
                }
            }
        };
    }, []);

    return <div ref={terminalEl}></div>
}

export default CommandTerminal;
