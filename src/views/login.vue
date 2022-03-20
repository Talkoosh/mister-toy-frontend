<template>
    <div class="login-screen-btns">
        <el-button @click="isLogin = true" type="primary">Login</el-button>
        <el-button @click="isLogin = false" type="success">Sign Up</el-button>
    </div>

    <el-form
        v-if="isLogin"
        status-icon
        label-width="120px"
        class="form login-form"
        @submit.prevent="login()"
    >
        <h1>Login!</h1>
        <el-form-item label="Username">
            <el-input v-model="userLogin.username" type="text" autocomplete="off" required />
        </el-form-item>
        <el-form-item label="password" prop="pass">
            <el-input type="password" v-model.number="userLogin.password" required />
        </el-form-item>
        <el-form-item>
            <el-button class="form-btn" type="primary">
                <input class="submit-input" type="submit" value="Login" />
            </el-button>
        </el-form-item>
    </el-form>

    <el-form
        v-if="!isLogin"
        status-icon
        label-width="120px"
        class="form signup-form"
        @submit.prevent="signup()"
    >
        <h1>Sign Up!</h1>
        <el-form-item label="Full Name">
            <el-input v-model="userSignup.fullname" type="text" autocomplete="off" required />
        </el-form-item>
        <el-form-item label="Username">
            <el-input v-model="userSignup.username" type="text" autocomplete="off" required />
        </el-form-item>
        <el-form-item label="password" prop="pass">
            <el-input type="password" v-model="userSignup.password" required />
        </el-form-item>
        <div class="form-btn-conainter">
            <el-form-item>
                <el-button class="form-btn" type="success">
                    <input class="submit-input" type="submit" value="Sign Up" />
                </el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script >

export default {
    data() {
        return {
            isLogin: false,
            userSignup: {
                fullname: '',
                username: '',
                password: ''
            },
            userLogin: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async signup() {
            try {
                await this.$store.dispatch({ type: 'signup', newUser: this.userSignup })
                this.$router.push('/toy')
            } catch (err) {
                this.$router.push('/');
                console.log(err);
            }

        },
        async login() {
            try {
                await this.$store.dispatch({ type: 'login', loginUser: this.userLogin })
                this.$router.push('/toy')
            } catch (err) {
                this.$router.push('/');
                console.log(err);
                return
            }
        }
    }
}

</script>
