<template>
  <div>
    <v-row>
      <v-col cols="9">
        <v-btn color="primary" dark @click="renderDialog('employee')">
          Add Employee</v-btn
        >

        <v-btn color="primary" dark @click="renderDialog('manager')">
          Add Manger</v-btn
        >
      </v-col>
      <v-col cols="3">
        <v-select
          @input="filterUser"
          :items="dropDownElem"
          v-model="selectedUser"
          label="Filter"
          item-value="data.name"
          item-text="data.name"
          :filter="customFilter"
          :search-input.sync="search"
          outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <NeoGraph v-if="showGraph" :data="elements" />
      </v-col>
    </v-row>
    <CreateUserPopUp
      v-if="showDialog"
      :type="formType"
      :addEmployee="handleAddUser"
      :closeDialog="renderDialog"
    />
  </div>
</template>
<script>
import CreateUserPopUp from "./CreateUserPopUp.vue";
export default {
  components: { CreateUserPopUp },
  data() {
    return {
      showDialog: false,
      formType: "",
      selectedUser: null,
      showGraph: false,
      elements: [],
      dropDownElem: [],
      search: "",
    };
  },
  methods: {
    customFilter(item, queryText, itemText) {
      const hasQuery = queryText.length > 0;
      const regex = new RegExp(queryText, "i");
      return hasQuery ? regex.test(itemText) : true;
    },
    async handleAddUser(user) {
      try {
        const date = new Date(user.doj);
        const epochTime = Math.floor(date.getTime() / 1000);
        await this.$store.dispatch("ApiCall", {
          method: "post",
          url:
            this.formType === "employee" ? `create-employee` : `create-manager`,
          params: {
            name: user.name,
            age: user.age,
            doj: epochTime,
            reportsTo: user.manager,
          },
        });
        if (this.selectedUser != null && this.selectedUser != "") {
          this.filterUser();
        } else {
          this.getAllUser();
        }
        this.showDialog = false;
      } catch (error) {
        console.log(error);
      }
    },
    renderDialog(type = "") {
      this.formType = type;
      this.showDialog = !this.showDialog;
    },
    async getAllUser() {
      try {
        let response = await this.$store.dispatch("ApiCall", {
          method: "get",
          url: `get-all`,
          params: {},
        });
        if (response.data) {
          let temp = response.data.map((e) => {
            return {
              position: { x: Math.random() * 500, y: Math.random() * 500 },
              data: e.data,
            };
          });

          this.elements = temp;
          this.dropDownElem = temp.map((e) => e.data.name);
          this.dropDownElem.push("None");

          this.showGraph = true;
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    async filterUser() {
      try {
        if (!this.selectedUser) return;
        if (this.selectedUser === "None") {
          this.getAllUser();
        } else {
          let response = await this.$store.dispatch("ApiCall", {
            method: "post",
            url: `get-all-by-name`,
            params: {
              name: this.selectedUser,
            },
          });
          if (response) {
            let temp = response.data.map((e) => {
              return {
                position: { x: Math.random() * 500, y: Math.random() * 500 },
                data: e.data,
              };
            });
            this.elements = temp;
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  },
  async mounted() {
    await this.getAllUser();
  },
};
</script>
