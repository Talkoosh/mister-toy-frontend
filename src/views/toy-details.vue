<template>
    <section class="toy-page">
        <section v-if="toy" class="main">
            <h2>{{ toy.name }}</h2>
            <h4>Price: {{ toy.price }}</h4>
            <h4>Created At: {{ toyCreated }}</h4>
            <h3>Labels:</h3>
            <ul>
                <li v-for="label in toy.labels" :key="label">
                    <p>{{ label }}</p>
                </li>
            </ul>
            <div v-if="reviews">
                <h3>Reviews:</h3>
                <div class="toy-review" v-for="review in reviews" :key="review._id">
                    <p>Review by: {{ review.byUser ? review.byUser.fullname : userFullname }}</p>
                    <p>{{ review.txt }}</p>
                </div>
            </div>
            <h1>Add a review</h1>
            <form @submit.prevent="addReview">
                <label>
                    <h4>Review:</h4>
                    <input type="text" v-model="review.txt" @input="userTyping" />
                    <button>Submit review</button>
                </label>
            </form>
        </section>
        <section class="toy-chat">
            <ul>
                <li v-for="msg in msgs" :key="msg">{{ msg.from }}: {{ msg.txt }}</li>
            </ul>
            <h5 v-if="typingUser">{{ typingUserMsg }}</h5>
            <form @submit.prevent="sendMsg">
                <input type="text" v-model="msg.txt" />
                <button>Send</button>
            </form>
        </section>
    </section>
</template>

<script>
import { httpService } from '../services/http.service.js'
import { socketService, socketEvents } from '../services/socket.service.js'
export default {

    data() {
        return {
            review: {
                txt: ''
            },
            msg: {
                from: '',
                txt: ''
            },
            msgs: [],
            typingUser: ''
        }
    },
    async created() {
        await this.$store.dispatch({ type: 'setCurrToy', id: this.$route.params.toyId })
        const toyId = this.$store.getters.currToy._id
        await this.$store.dispatch({ type: 'loadToyReviews', toyId })
        await socketService.setup()
        socketService.emit(socketEvents.chatEnter, this.toy._id)
        socketService.on(socketEvents.getChat, this.setChat)
        socketService.on(socketEvents.getMsg, this.addMsg)
        socketService.on(socketEvents.showUserTyping, this.setUserTyping)
        socketService.on(socketEvents.deleteMsg, this.setUserTyping);
    },
    computed: {
        toy() {
            return this.$store.getters.currToy
        },
        toyCreated() {
            return new Date(this.toy.createdAt)
        },
        reviews() {
            return this.$store.getters.reviewsForDisplay
        },
        userFullname() {
            return this.$store.getters.currUser.fullname
        },
        typingUserMsg() {
            if (this.typingUser) {
                return `${this.typingUser} is typing...`
            }
            else {
                return ''
            }
        }
    },
    methods: {
        addReview() {
            this.review.toyId = this.toy._id
            console.log(this.review);
            this.$store.dispatch({ type: 'addReview', review: this.review })
        },
        sendMsg() {
            this.msg.from = this.userFullname;
            socketService.emit(socketEvents.addMsg, this.msg);
            this.msg = { from: '', txt: '' };
        },
        addMsg(msg) {
            this.msgs.push(msg);
        },
        setUserTyping(userFullname) {
            this.typingUser = userFullname
        },
        setChat(chat){
            console.log(chat);
            if(chat.length){
                this.msgs = chat
            }
        }
    },
    watch: {
        'msg.txt': {
            handler() {
                if (this.msg.txt) {
                    socketService.emit(socketEvents.currUserTyping, this.userFullname)
                } else {
                    socketService.emit(socketEvents.finishedTyping)
                }
            }
        }
    }
}
</script>

<style>
.toy-review {
    border: 1px solid black;
    margin-bottom: 10px;
}

.toy-page {
    display: flex;
    gap: 20px;
    justify-content: space-between;
}
</style>