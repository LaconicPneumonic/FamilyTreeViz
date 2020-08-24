<template>
  <div class="FamilyView">
    <div>
      <h1>PARENTS:</h1>
      <div id="parents">
        <Person
          class="spaced"
          v-for="(person) in root.ParentIDs"
          :key="person"
          :personID="person"
          @rooted="onPersonClick"
        ></Person>
        <!-- <span class="stretch"></span> -->
      </div>
    </div>
    <div style="border-top: 5px solid black; border-bottom: 5px solid black;">
      <h1>YOU:</h1>
      <div id="you">
      <Person
        class="spaced"
        v-if="this.root.PersonID"
        :key="this.root.PersonID"
        :personID="this.root.PersonID"
        @rooted="onPersonClick"
      />
      </div>
    </div>
    <div>
      <h1>CHILDREN:</h1>
      <div id="children">
        <Person
          class="spaced"
          v-for="(person) in root.ChildrenIDs"
          :key="person"
          :personID="person"
          @rooted="onPersonClick"
        ></Person>
        <!-- <span class="stretch"></span> -->
      </div>
    </div>
  </div>
</template>

<script>
import Person from "@/components/Person.vue";
import DBService from "@/services/DBService.js";

export default {
  name: "FamilyView",
  components: {
    Person,
  },
  data() {
    return {
      root: {
        PersonID: undefined,
        ParentIds: [],
        ChildrenIDs: [],
      },
    };
  },
  async created() {
    let value = await DBService.GetFirstPerson();
    this.root = value[0];
  },

  methods: {
    async onPersonClick(newRoot) {
      console.log(newRoot)
      if (newRoot.PersonID != this.root.PersonID) {
        let value = await DBService.GetPersonByID(newRoot.PersonID)
        this.root = Object.assign({}, this.root, value[0]);
      }
    },
  },
};
</script>

<style>
#parents {
  display: flex;
  justify-content: center;
}

#children {
  display: flex;
  justify-content: center;
}

#you {
  display: flex;
  justify-content: center;
}

.spaced {
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
}

.stretch {
  width: 100%;
  display: inline-block;
  font-size: 0;
  line-height: 0;
}
</style>