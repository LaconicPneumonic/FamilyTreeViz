<template>
  <div class="familyview grid-container">
    <div id="parents">
      <h1 class="title">PARENTS:</h1>
      <div>
        <Person
          class="spaced"
          v-for="(person) in root.ParentIDs"
          :key="person"
          :personID="person"
          @rooted="onPersonClick"
        ></Person>
      </div>
    </div>
    <div id="you">
      <h1 class="title">YOU:</h1>
      <Person
        class="spaced"
        v-if="this.root.PersonID"
        :key="this.root.PersonID"
        :personID="this.root.PersonID"
        @rooted="onPersonClick"
      />
    </div>
    <div id="spouse">
      <h1 class="title">SPOUSE:</h1>
      <Person
        class="spaced"
        v-if="this.root.SpouseID"
        :key="this.root.SpouseID"
        :personID="this.root.SpouseID"
        @rooted="onPersonClick"
      />
    </div>
    <div id="children">
      <h1 class="title">CHILDREN:</h1>
      <div>
        <Person
          class="spaced"
          v-for="(person) in root.ChildrenIDs"
          :key="person"
          :personID="person"
          @rooted="onPersonClick"
        ></Person>
      </div>
    </div>
  </div>
</template>

<script>
import Person from "@/components/Person.vue";
import DBService from "@/services/DBService.js";

export default {
  name: "familyview",
  components: {
    Person,
  },
  data() {
    return {
      root: {
        PersonID: undefined,
        ParentIds: [],
        ChildrenIDs: [],
        SpouseID: undefined
      },
    };
  },
  async created() {
    let value = await DBService.GetFirstPerson();
    this.root = value[0];
  },

  methods: {
    async onPersonClick(newRoot) {
      console.log(newRoot);
      if (newRoot.PersonID != this.root.PersonID) {
        let value = await DBService.GetPersonByID(newRoot.PersonID);
        this.root = Object.assign({}, this.root, value[0]);
      }
    },
  },
};
</script>

<style>
.grid-container {
  display: grid;
  grid-template-areas:
    "parent parent parent"
    "you you spouse"
    "child child child";
}

#parents {
  grid-area: parent;
}

#you {
  grid-area: you;
  border: solid;
  border-left: none;
  border-right: none;
}

#spouse {
  grid-area: spouse;
  border: solid;
  border-right: none;
  border-left: dashed;
}

#children {
  grid-area: child;
}

.grid-container > div {
  text-align: center;
  padding: 1% 0%;
  font-size: 30px;
}

.familyview .title {
  font-family: "Bebas Neue";
}

.familyview {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
}

.familyview hr {
  border: 3px solid black;
  margin: 1%;
}
</style>