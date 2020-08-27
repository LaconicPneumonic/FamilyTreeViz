<template>
  <div class="person hover-shadow" @click="selected">
    <h1>{{this.person.Name}}</h1>
  </div>
</template>

<script>
import DBService from "@/services/DBService.js";

export default {
  name: "Person",
  props: {
    personID: Number,
    default: -1,
  },
  data() {
    return {
      person: {
        Name: "Unloaded",
        ParentIDs: [],
        ChildrenIDs: [],
        PersonID: null,
      },
    };
  },
  async created() {
    if (this.personID != undefined) {
      let value = await DBService.GetPersonByID(this.personID);
      this.person = value[0];
    }
  },
  methods: {
    selected() {
      this.$emit("rooted", { PersonID: this.person.PersonID });
    },
  },
};
</script>

<style>
.person {
  background-color: #f0cea0;
  padding: 0 1.5%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  transition: all 0.6s ease;
  display: inline-block;
  box-sizing: border-box;
  margin: auto 1%;
}

.person:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.45);
  transform: translateY(-4px);
}

.person:active {
  transform: none;
}

.person h1 {
  background-color: #f0cea0;
  font-family: "Roboto", sans-serif;
}
</style>