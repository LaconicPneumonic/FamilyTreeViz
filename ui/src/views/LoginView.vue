<template>
  <div class="login-view login-grid">
    <div class="login-form-wrapper">
      <div class="login-image">
        <img
          src="@/assets/capHaitien.jpg"
          alt="W3Schools.com"
        />
      </div>
      <div class="login-welcome">
        <h1>Welcome to your Family Tree Vizualization</h1>
        <p>
          Authored by Anthony Rolland.
          <a
            href="https://github.com/LaconicPneumonic/FamilyTreeViz"
          >Github</a>
        </p>
      </div>
      <div class="login-form">
        <div class="login-input">
          <span>
            <label for="frmEmailA">
              <font-awesome-icon class="icon" icon="user" />
            </label>
          </span>
          <div>
            <input
              v-model="username"
              type="email"
              name="email"
              id="frmEmailA"
              placeholder="name@example.com"
              required
              autocomplete="email"
            />
          </div>
        </div>
        <div class="login-input">
          <span>
            <label for="frmPass">
              <font-awesome-icon class="icon" icon="lock" />
            </label>
          </span>
          <div>
            <input
              v-model="password"
              type="password"
              name="current-password"
              id="frmPass"
              placeholder="enter password"
              required
              autocomplete="current-password"
            />
          </div>
        </div>
        <transition name="fade">
          <div
            class="incorrect-login"
            v-if="this.incorrectLogin"
          >Your login information was incorrect, please try again</div>
        </transition>
        <div class="submission">
          <button @click="submission(username, password)">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginview",
  data() {
    return {
      username: "",
      password: "",
      signedIn: undefined,
      incorrectLogin: false,
    };
  },
  mounted() {
    // when using a router, mounted is run as history is pushed and popped
    if (this.$dbservice.store.loggedIn) this.$router.push("family");
  },
  methods: {
    async submission(username, password) {
      let result = await this.$dbservice.LogInUser(username, password);
      if (!result) this.incorrectLogin = true;
      else {
        this.$router.push("family");
      }
    },
  },
};
</script>

<style>
.login-grid {
  display: flex;
  justify-content: center;
  align-items: center;
}

div.login-form-wrapper {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.49);
  margin: 10vh auto 10vh auto;
  height: 80vh;
  max-width: 50%;
  max-height: 50%;
  position: relative;

  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: 50% 50%;
}

div.login-form-wrapper * {
  background-color: #c5283d;
}

.login-input {
  margin: 5% auto 5%;
  border-bottom: solid black;
}

.login-input div {
  margin-left: 10%;
  padding-bottom: 5%;
}

.login-input span {
  float: left;
}

input {
  width: 100%;
  border: none;
  background: none;
  font-family: "Roboto", sans-serif;
  font-size: 1vh;
}

.fa-user {
  width: 10%;
}

input:focus {
  outline: none;
}

.login-welcome {
  grid-row: 1;
  grid-column: 2;
  padding: 10%;
  word-wrap: break-word;
}

.login-welcome h1 {
  font-family: "Bebas Neue";
  font-size: 3vh;
}

.login-welcome p {
  font-family: "Roboto", sans-serif;
  font-size: 1.5vh;
}

.login-form {
  grid-row: 2;
  grid-column: 2;
  overflow: hidden;
  padding: 10%;
}

.login-image {
  grid-column: 1;
  grid-row: 1 / 3;
  overflow: hidden;
}

.login-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(2px);
}

.incorrect-login {
  font-family: "Roboto", sans-serif;
  font-size: 1vh;
  background-color: white !important;
}

.submission button {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s ease;
  text-transform: uppercase;
  padding: 2%;
  font-family: "Bebas Neue";
  font-size: 2vh;
}

.submission button:hover {
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.18), 0 5px 5px rgba(0, 0, 0, 0.12);
}

.submission {
  margin: 5% auto 5%;
}
</style>