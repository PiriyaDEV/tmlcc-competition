<template>
  <div>
    <DashboardNavbar />
    <div id="member-setting" class="section">
      <div id="member-container" class="page-container">
        <div>
          <h1 class="header-m">สมาชิกของระบบ</h1>
          <div id="menu-select">
            <div>
              <h1 :class="cssHeaderMember" @click="memberChoice()">
                ผู้ลงทะเบียน
              </h1>
              <hr class="bar-color" v-if="choice == `member`" />
            </div>
            <div>
              <h1 :class="cssHeaderAdmin" @click="adminChoice()">
                ผู้ดูแลระบบ
              </h1>
              <hr class="bar-color" v-if="choice == `admin`" />
            </div>
          </div>

          <ManageMember v-if="choice == `member`" />
          <ManageAdmin
            v-if="choice == `admin` && addStatus == false"
            @statusAdd="statusAdd"
          />
          <AddAdmin
            v-if="choice == `admin` && addStatus == true"
            @statusAdd="statusAdd"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ManageMember from "../../components/Admin/ManageMember.vue";
import ManageAdmin from "../../components/Admin/ManageAdmin.vue";
import DashboardNavbar from "../../components/Menu/DashboardNavbar.vue";
import AddAdmin from "../../components/Admin/Menu/AddAdmin.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      choice: "member",
      addStatus: false,
    };
  },
  components: {
    DashboardNavbar,
    ManageMember,
    ManageAdmin,
    AddAdmin,
  },
  computed: {
    cssHeaderMember() {
      let select = "header-ms selected";
      let unselect = "header-ms";
      if (this.choice == "member") {
        return select;
      }
      return unselect;
    },
    cssHeaderAdmin() {
      let select = "header-ms selected";
      let unselect = "header-ms";
      if (this.choice == "admin") {
        return select;
      }
      return unselect;
    },
    ...mapGetters({
      editing: "admin/getEditing",
    }),
  },
  methods: {
    memberChoice() {
      if (this.editing == false) {
        this.choice = "member";
        this.addStatus = false;
      }
    },
    statusAdd(value) {
      this.addStatus = value;
    },
    adminChoice() {
      this.choice = "admin";
    },
    ...mapActions({
      getUserList: "admin/getUserList",
      getStaffList: "admin/getStaffList",
    }),
  },
  mounted() {
    this.$store.dispatch("page/setPage", "dashBoard");
    this.getUserList();
    this.getStaffList();
  },
};
</script>

<style scoped>
#member-setting {
  /* min-height: 100vh; */
  padding: 50px 0px 200px 0px;
  background-color: #f3f3f3;
}

#member-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#member-container > div {
  width: 100%;
}

.bar-color {
  width: 71px;
  color: #2f65af;
  background-color: #2f65af;
  border: 1.5px solid #2f65af;
}

#menu-select {
  margin-top: 7px;
  display: flex;
  text-align: start;
  justify-content: center;
}

#menu-select > div {
  padding: 0px 20px;
}

.header-ms {
  font-family: "IBM-PLEX-THAI";
  font-weight: 500;
  cursor: pointer;
}

.selected {
  color: #2f65af;
  cursor: default;
}

.unselect-bar {
  color: #f3f3f3;
  background-color: #f3f3f3;
  border: 1.5px solid #f3f3f3;
}

@media screen and (max-width: 1100px) {
  #member-setting {
    padding: 100px 0px 200px 0px;
  }
}
</style>
