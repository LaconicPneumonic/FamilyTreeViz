<template>
  <b-container fluid class="bv-example-row d-flex">
    <b-row class="justify-content-center align-self-center test">
      <b-col> </b-col>
      <b-col cols="8">
        <b-row>
          <b-col cols="8" sm="6">
            <img src="@/assets/capHaitien.jpg" />
          </b-col>
          <b-col cols="4" sm="6">
            <div class="login-welcome">
              <h1>Welcome to your Family Tree Vizualization</h1>
              <p>
                Authored by Anthony Rolland.
                <a href="https://github.com/LaconicPneumonic/FamilyTreeViz"
                  >Github</a
                >
              </p>
            </div>
            <div>
              <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group
                  id="input-group-1"
                  label="Email address:"
                  label-for="input-1"
                  description="We'll never share your email with anyone else."
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Enter email"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-2"
                  label="Password:"
                  label-for="input-1"
                  description="Please enter your password"
                >
                  <b-form-input
                    id="input-2"
                    v-model="form.password"
                    type="password"
                    required
                    placeholder="Enter password"
                  ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
              </b-form>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "loginview",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: true,
      incorrectLogin: false,
    };
  },
  mounted() {
    // when using a router, mounted is run as history is pushed and popped
    if (this.$dbservice.store.loggedIn) this.$router.push("family");
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      let result = await this.$dbservice.LogInUser(
        this.form.email,
        this.form.password
      );
      if (!result) this.incorrectLogin = true;
      else {
        this.$router.push("family");
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.test {
  width: 100%;
}
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bv-example-row {
  height: 100vh;
}

.login-welcome h1 {
  font-family: "Bebas Neue";
  font-size: 3vh;
}

.login-welcome p {
  font-family: "Roboto", sans-serif;
  font-size: 1.5vh;
}

button {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s ease;
  text-transform: uppercase;
  padding: 2%;
  font-family: "Bebas Neue";
  font-size: 2vh;
}
</style>