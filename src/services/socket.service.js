import io from 'socket.io-client'

export const socketEvents = {
    addMsg: 'chat newMsg',
    chatEnter: 'chat topic',
    getMsg: 'chat addMsg',
    currUserTyping: 'user-typing',
    showUserTyping: 'show-user-typing',
    deleteMsg: 'delete-typing-msg',
    finishedTyping: 'finished-typing',
    getChat: 'get chat'

}


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

// socketService.setup()


function createSocketService() {
    var socket = null;
    const socketService = {
        async setup() {
            socket = io(baseUrl)
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return;
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            console.log(eventName, data);
            socket.emit(eventName, data)
        },
        terminate() {
            socket = null
        }
    }
    return socketService
}
