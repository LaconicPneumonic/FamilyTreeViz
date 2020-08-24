<template>
  <div class="person tooltip" @click="selected">{{this.person.Name}}
    <span class="tooltiptext">Special Info for {{this.person.Name}}</span>
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
        PersonID: null
      },
    };
  },
  async created() {
    if (this.personID != undefined) {
      let value = await DBService.GetPersonByID(this.personID)
      this.person = value[0];
    }
  },
  methods: {
    selected() {
      this.$emit("rooted", { PersonID: this.person.PersonID});
    },
  },
};
</script>

<style>
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.person {
  background-color: #F0CEA0;
  padding: 0 1.5em;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>