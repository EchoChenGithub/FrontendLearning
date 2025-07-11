import {useState, useEffect, useRef} from "react";
import { createConnection } from './chat.jsx'
import {MapWidget} from "./map-widget.jsx";

// 1.Connecting to external systems:
// 1. ChatRoom
function ChatRoom({roomId}) {
    const [serverUrl,setServerUrl] = useState('https:localhost:1234')

    useEffect(() => {
        const connection = createConnection(serverUrl, roomId)
        connection.connect()
        return () => {
            connection.disconnect()
        }
    }, [roomId, serverUrl])
    return (
        <>
            <label>
                Server URL:{' '}
                <input
                    value={serverUrl}
                    onChange={e => setServerUrl(e.target.value)}
                />
            </label>
            <h3>Welcome to the {roomId} room!</h3>
        </>
    )
}
function ChatRoomApp() {
    const [roomId, setRoomId] = useState('general');
    const [show, setShow] = useState(false);
    return (
        <>
            <label>
                Choose the chat room:{' '}
                <select
                    value={roomId}
                    onChange={e => setRoomId(e.target.value)}
                >
                    <option value="general">general</option>
                    <option value="travel">travel</option>
                    <option value="music">music</option>
                </select>
            </label>
            <button onClick={() => setShow(!show)}>
                {show ? 'Close chat' : 'Open chat'}
            </button>
            {show && <hr />}
            {show && <ChatRoomTwo roomId={roomId} />}
            <br/>
        </>

    )
}

// 2. BrowserDOM：Listening to a global browser event
function BrowserDOM() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isInside, setIsInside] = useState(false);
    const areaRef = useRef(null); // 用来获取追踪区域的DOM元素

    function handleMove(e) {
        if (!areaRef.current) return;

        // 获取追踪区域的边界信息
        const rect = areaRef.current.getBoundingClientRect();

        // 检查鼠标是否在区域内
        const inside = (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
        );

        setIsInside(inside);

        if (inside) {
            // 计算相对于区域内的位置
            setPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    }

    useEffect(() => {
        window.addEventListener('pointermove', handleMove);
        return () => {
            window.removeEventListener('pointermove', handleMove);
        };
    }, []);

    return (
        <div
            ref={areaRef}
            style={{
                position: 'relative',
                width: '500px',   // 设置追踪区域宽度
                height: '300px',  // 设置追踪区域高度
                border: '2px dashed #ccc',
                margin: '20px auto'
            }}
        >
            {/* 鼠标追踪圆点 */}
            {isInside && (
                <div style={{
                    position: 'absolute',
                    backgroundColor: 'pink',
                    borderRadius: '50%',
                    opacity: 0.6,
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    pointerEvents: 'none',
                    left: -20,
                    top: -20,
                    width: 40,
                    height: 40,
                }} />
            )}

            {/* 提示文字 */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#999'
            }}>
                在此区域内移动鼠标
            </div>
        </div>
    );
}

// 3. ModalDialog
function ModalDialog({isOpen, children}) {
    const ref = useRef(null)

    useEffect(() => {
        if (!isOpen) {
            return
        }
        const dialog = ref.current
        dialog.showModal()
        return () => {
            dialog.close()
        }
    }, [isOpen])

    return <dialog ref={ref}>{children}</dialog>
}
function ModalDialogApp() {
    const [show, setShow] = useState(false)
    return (
        <>
            <button onClick={() => setShow(true)}>
                Open dialog
            </button>
            <ModalDialog isOpen={show}>
                Hello there!
                <br/>
                <button onClick={() => setShow(false)}>
                    Close
                </button>
            </ModalDialog>
        </>
    )
}

// 4. custom useChatRoom Hook
function useChatRoom({serveUrl, roomId}) {
    useEffect(() => {
        const connection = createConnection(serveUrl, roomId)
        connection.connect()
        return () => {
            connection.disconnect()
        }
    }, [roomId, serveUrl])
}
function ChatRoomTwo({roomId}) {
    const [serverUrl, setServerUrl] = useState('https:localhost:1234')
    useChatRoom({
        rooId: roomId,
        serverUrl: serverUrl,
    })
    return (
        <>
            <label>
                Server URL:{' '}
                <input
                    value={serverUrl}
                    onChange={e => setServerUrl(e.target.value)}
                />
            </label>
            <h3>Welcome to the {roomId} room!</h3>
        </>
    )
}

// 5. Map
function Map ({ zoomLevel }) {
    const containerRef = useRef(null)
    const mapRef = useRef(null)

    useEffect(() => {
        if (mapRef.current === null) {
            mapRef.current = new MapWidget(containerRef.current)
        }

        const map = mapRef.current
        map.setZoom(zoomLevel)
    }, [zoomLevel])

    return (
        <div style={{ width: 200, height: 200 }}
             ref={containerRef}></div>
    )
}
function MapApp () {
    const [zoomLevel, setZoomLevel] = useState(0)
    return (
        <>
            Zoom level: {zoomLevel}x
            <button onClick={() => setZoomLevel(zoomLevel + 1)}>+</button>
            <button onClick={() => setZoomLevel(zoomLevel - 1)}>-</button>
            <hr />
            <Map zoomLevel={zoomLevel} />
        </>
    )
}

// 6. Fetching data with Effects
// function Page () {
//     const [person, setPerson] = useState('Alice')
//     const [bio, setBio] = useState(null)
//
//     useEffect(() => {
//         let ignore = false
//         setBio(null)
//         fetchBio(person).then(result=> {
//             if (!ignore) {
//                 setBio(result)
//             }
//         })
//         return () => {
//             ignore = true
//         }
//     }, [person])
//
//     return (
//         <>
//             <select value={person} onChange={e => {
//                 setPerson(e.target.value);
//             }}>
//                 <option value="Alice">Alice</option>
//                 <option value="Bob">Bob</option>
//                 <option value="Taylor">Taylor</option>
//             </select>
//             <hr />
//             <p><i>{bio ?? 'Loading...'}</i></p>
//         </>
//     )
// }
// Page 函数但是 async写法
function PageAsync () {
    const [person, setPerson] = useState('Alice')
    const [bio, setBio] = useState(null)

    useEffect(() => {

        async function startFetching() {
            setBio(null)
            const result = await fetchBio(person)

            if (!ignore) {
                setBio(result)
            }
        }
        let ignore = false
        startFetching()
        return () => {
            ignore = true
        }
    }, [person])

    return (
        <>
            <select value={person} onChange={e => {
                setPerson(e.target.value);
            }}>
                <option value="Alice">Alice</option>
                <option value="Bob">Bob</option>
                <option value="Taylor">Taylor</option>
            </select>
            <hr />
            <p><i>{bio ?? 'Loading...'}</i></p>
        </>
    )
}


export function UseEffectPractice() {
    return (
        <>
            <div className="external-system">
                <h2>Connecting to an external system</h2>
                <hr/>
                <h3>Example 1/4: ChatRoom</h3>
                <div className='chat-room'>
                    <ChatRoomApp />
                </div>
                <hr/>
                <h3>Example 2/4: Listening to global browser event</h3>
                <div className='broser-event'>
                    <BrowserDOM />
                </div>
                <hr/>
                <h3>Example 3/4: Modal Dialog</h3>
                <div className='modal-dialog'>
                    <ModalDialogApp />
                </div>
                <hr/>
                <h3>Example 4/4: Map</h3>
                <div className='map'>
                    <MapApp />
                </div>
        </div>
        </>
    )
}