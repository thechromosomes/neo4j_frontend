<template>
  <div>
    <v-dialog max-width="600" v-model="dialog" @click:outside="closeDialog()">
      <v-card>
        <v-card-title>
          <span class="headline">Add {{ type }}</span>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field label="Name" v-model="user.name"></v-text-field>
            <v-text-field
              label="Age"
              v-model="user.age"
              type="number"
            ></v-text-field>
            <v-select
              :items="items"
              label="Select Manger"
              item-text="name"
              item-value="name"
              v-model="user.manager"
              :filter="customFilter"
              :search-input.sync="search"
            />
            <div class="subheading">Select Date of Joining</div>
            <v-date-picker
              label="Date of Joining"
              full-width
              v-model="user.doj"
            ></v-date-picker>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog()"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="addEmployee(user)"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["type", "closeDialog", "addEmployee"],
  data() {
    return {
      dialog: true,
      user: {
        name: "",
        age: "",
        doj: "",
        manager: null,
      },
      items: [],
      search: "",
    };
  },
  methods: {
    customFilter(item, queryText, itemText) {
      const hasQuery = queryText.length > 0;
      const regex = new RegExp(queryText, "i");
      return hasQuery ? regex.test(itemText) : true;
    },

    async getAllUser() {
      let response = await this.$store.dispatch("ApiCall", {
        method: "get",
        url: `get-all-manager`,
        params: {},
      });
      this.items = response.data
    },
  },
  mounted() {
    this.getAllUser();
  },
};
</script>
