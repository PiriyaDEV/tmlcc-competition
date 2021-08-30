<template>
  <div id="manage-admin">
    <div class="center page-change-left">
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <h1 @click="clickDasboard()" class="text-normal purple-text">
        กลับหน้าแดชบอร์ด
      </h1>
    </div>

    <div id="search-grid">
      <div>
        <h1 class="text-normal">ค้นหาจาก keyword</h1>
        <input v-model="keyword" class="input-box text-normal" type="text" />
      </div>
      <div>
        <h1 class="text-normal">Role</h1>
        <div id="role-select">
          <div>
            <input id="checkEditor" v-model="editorCheck" type="checkbox" />
            <label class="text-normal">Editor</label>
          </div>
          <div>
            <input id="checkAdmin" v-model="adminCheck" type="checkbox" />
            <label class="text-normal">Admin</label>
          </div>
        </div>
      </div>
      <div>
        <h1 class="text-normal">เรียงลำดับ</h1>
        <select
          v-model="sort"
          name="sorting"
          id="sorting"
          class="input-box text-normal"
        >
          <option value="name">ชื่อ ก - ฮ</option>
          <option value="nameLast">ชื่อ ฮ - ก</option>
          <option value="email">อีเมล ก - ฮ</option>
          <option value="organization">สังกัด ก - ฮ</option>
        </select>
      </div>
      <div>
        <h1 class="text-normal">แสดงผล</h1>
        <select
          v-model="perPage"
          name="show"
          id="show"
          class="input-box text-normal addon-btn"
        >
          <!-- <option value="1">1 รายการ</option> -->
         <!--  <option value="5">5 รายการ</option> -->
          <option value="25">25 รายการ</option>
          <option value="50" v-if="staffListLength > 25">50 รายการ</option>
          <option value="100" v-if="staffListLength > 50">100 รายการ</option>
          <option value="200" v-if="staffListLength > 100">200 รายการ</option>
          <option value="500" v-if="staffListLength > 200">500 รายการ</option>
          <option value="all">ทั้งหมด</option>
        </select>
      </div>
    </div>

    <div id="add-admin-box">
      <div></div>
      <div>
        <button class="add-btn" @click="adminAdd()">เพิ่มผู้ดูแลระบบ</button>
      </div>
    </div>

    <div id="table-section">
      <table id="member-table">
        <tr>
          <th class="table-hd">Role</th>
          <th class="table-hd">ชื่อ</th>
          <th class="table-hd">นามสกุล</th>
          <th class="table-hd">เบอร์โทร</th>
          <th class="table-hd">E-mail</th>
          <th class="table-hd">สังกัด</th>
          <th class="table-hd">แก้ไขข้อมูล</th>
        </tr>
        <h1
          v-if="staffList && staffList.length == 0"
          class="text-normal l-grey-text no-info"
        >
          ไม่มีข้อมูลในระบบ
        </h1>
        <tr v-for="(staff, i) in staffList" :key="i">
          <td>
            <h1 class="table-hd mb-head">Role</h1>
            <!-- <h1
              class="table-info member-role"
              v-if="edit != staff.user_id"
              >{{ staff.role }}</h1
            > -->
            <h1 class="table-info member-role">{{ staff.role }}</h1>
            <h1>
              <!-- <button
                class="editor-role-btn table-info"
                v-if="edit == staff.user_id"
              >
                เปลี่ยนเป็น Editor
              </button> -->
              <!-- <button class="admin-role-btn table-info" v-if="edit[i]">
                เปลี่ยนเป็น Admin
              </button> -->
            </h1>
          </td>
          <td>
            <h1 class="table-hd mb-head">ชื่อ</h1>
            <h1 class="table-info capital" v-if="edit != staff.user_id">
              {{ staff.firstName }}
            </h1>
            <h1>
              <input
                class="input-box table-info"
                type="text"
                v-if="edit == staff.user_id"
                v-model="staff.firstName"
                maxlength="32"
              />
              <p
                v-if="edit == staff.user_id && updateStatus.firstName.isInvalid"
                class="text-normal orange-text error-message"
              >
                * {{ updateStatus.firstName.message }}
              </p>
            </h1>
          </td>
          <td>
            <h1 class="table-hd mb-head">นามสกุล</h1>
            <h1 class="table-info capital" v-if="edit != staff.user_id">
              {{ staff.lastName }}
            </h1>
            <h1>
              <input
                class="input-box table-info"
                type="text"
                v-if="edit == staff.user_id"
                maxlength="32"
                v-model="staff.lastName"
              />
              <p
                v-if="edit == staff.user_id && updateStatus.lastName.isInvalid"
                class="text-normal orange-text error-message"
              >
                * {{ updateStatus.lastName.message }}
              </p>
            </h1>
          </td>
          <td>
            <h1 class="table-hd mb-head">เบอร์โทร</h1>
            <h1 class="table-info" v-if="edit != staff.user_id">
              {{ staff.phone }}
            </h1>
            <h1>
              <input
                class="input-box table-info"
                type="text"
                v-if="edit == staff.user_id"
                maxlength="16"
                v-model="staff.phone"
              />
              <p
                v-if="edit == staff.user_id && updateStatus.phone.isInvalid"
                class="text-normal orange-text error-message"
              >
                * {{ updateStatus.phone.message }}
              </p>
            </h1>
          </td>
          <td>
            <h1 class="table-hd mb-head">E-mail</h1>
            <h1 class="table-info" v-if="edit != staff.user_id">
              {{ staff.email }}
            </h1>
            <h1>
              <input
                class="input-box table-info"
                type="text"
                v-if="edit == staff.user_id"
                maxlength="64"
                v-model="staff.email"
              />
              <p
                v-if="edit == staff.user_id && updateStatus.email.isInvalid"
                class="text-normal orange-text error-message"
              >
                * {{ updateStatus.email.message }}
              </p>
            </h1>
          </td>
          <td>
            <h1 class="table-hd mb-head">สังกัด</h1>
            <h1 class="table-info capital" v-if="edit != staff.user_id">
              {{ staff.organization }}
            </h1>
            <h1>
              <input
                class="input-box table-info"
                type="text"
                v-if="edit == staff.user_id"
                v-model="staff.organization"
                maxlength="128"
              />
              <p
                v-if="
                  edit == staff.user_id && updateStatus.organization.isInvalid
                "
                class="text-normal orange-text error-message"
              >
                * {{ updateStatus.organization.message }}
              </p>
            </h1>
          </td>
          <td>
            <h1 class="table-hd mb-head">แก้ไขข้อมูล</h1>
            <button
              class="edit-btn center"
              v-if="edit != staff.user_id"
              @click="editClick(staff)"
            >
              <img
                class="edit-icon"
                src="../../assets/icon/edit-icon-p.png"
                alt=""
              />
              Edit
            </button>
            <button
              class="save-btn center"
              v-if="edit == staff.user_id"
              @click="saveClick(staff)"
            >
              <i class="fa fa-save"></i>
              Save
            </button>
          </td>
        </tr>
      </table>
    </div>
    <div id="pagination">
      <Pagination
        :keywordClear="keyword"
        :currentPage="`staff`"
        :active="activeCheck"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "../Admin/Menu/Pagination.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      edit: "",
      keyword: "",
      role: "",
      sort: "name",
      editorCheck: "",
      adminCheck: "",
      perPage: 25,
      currentPage: "staff",
      activeCheck: false,
    };
  },
  components: {
    Pagination,
  },
  mounted() {
    this.keyword = this.staffSearch;
    this.$store.dispatch("admin/updateStaffSort", this.sort);
    this.$store.dispatch("admin/updateStaffSearchRole", this.role);
    this.$store.dispatch("admin/resetStatusUpdate");
    this.$store.dispatch("admin/updateEditing", false);
  },
  computed: {
    ...mapGetters({
      updateStatus: "admin/getUpdateStatus",
      staffList: "admin/getStaffList",
      staffSearch: "admin/getStaffSearch",
      editing: "admin/getEditing",
      userListLength: "admin/getUserListLength",
      staffListLength: "admin/getStaffListLength",
    }),
    // isInArray: function () {
    //   return this.edit.includes(false);
    // },
  },
  watch: {
    keyword: function () {
      this.$store.dispatch("admin/updateStaffSearch", this.keyword);
    },
    role: function () {
      this.$store.dispatch("admin/updateStaffSearchRole", this.role);
    },
    sort: function () {
      this.$store.dispatch("admin/updateStaffSort", this.sort);
    },
    editorCheck: function () {
      this.checkCase();
    },
    adminCheck: function () {
      this.checkCase();
    },
    perPage: function () {
      this.activeCheck = !this.activeCheck;
      if (this.perPage == "all") {
        if (this.currentPage == "staff") {
          this.$store.dispatch(
            "admin/updateStaffPageLimit",
            this.staffListLength
          );
        }
      } else {
        if (this.currentPage == "staff") {
          this.$store.dispatch("admin/updateStaffPageLimit", this.perPage);
          this.page = 1;
          this.$store.dispatch("admin/updateStaffSelectPage", 1);
        }
      }
    },
  },
  methods: {
    editClick(value) {
      if (this.editing == false) {
        this.edit = value.user_id;
        this.$store.dispatch("admin/updateEditing", true);
      }
    },
    async saveClick(staff) {
      await this.$store.dispatch("admin/updateStaff", {
        user_id: staff.user_id,
        firstName: staff.firstName,
        lastName: staff.lastName,
        phone: staff.phone,
        email: staff.email,
        organization: staff.organization,
        role: staff.role,
      });
      if (this.updateStatus.isSuccess) {
        this.$store.dispatch("admin/resetStatusUpdate");
        this.$store.dispatch("admin/updateEditing", false);
        this.edit = "";
      }
    },
    clickDasboard() {
      if (this.$route.path != "/dashboard") {
        this.$router.push("/dashboard");
      }
    },
    adminAdd() {
      this.$emit("statusAdd", true);
    },
    checkCase() {
      if (this.editorCheck == true && this.adminCheck == true) {
        this.role = "";
      } else if (this.editorCheck == true) {
        this.role = "editor";
      } else if (this.adminCheck == true) {
        this.role = "admin";
      } else {
        this.role = "";
      }
    },
  },
};
</script>

<style scoped>
#manage-admin {
  background: #ffffff;
  border-radius: 30px;
  padding: 80px 60px 30px 60px;
  margin-top: 25px;
  position: relative;
}

.fa {
  font-size: 2.25em;
  font-weight: 500;
}

.fa-angle-left {
  margin: 0px 15px 0px 0px;
  color: #bf2e7e !important;
}

.fa-grey {
  color: #c4c4c4 !important;
}

td > h1 > input {
  font-size: inherit !important;
}

.page-change-left {
  position: absolute;
  top: 35px;
  left: 60px;
  cursor: pointer;
}

#add-admin-box {
  display: grid;
  grid-template-columns: 5fr 1.05fr;
}

.fa-save {
  font-size: 1.2em !important;
  margin-right: 5px;
}

.edit-icon {
  width: 15px;
  margin-right: 4px;
  /* margin-left: 5px; */
}

.add-btn {
  font-size: 1.75em;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  color: #2f65af;
  margin-bottom: 15px;
  background-color: transparent;
  border: 2px solid #2f65af;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 6px 15px;
  width: 100%;
  cursor: pointer;
}

.input-box {
  width: 100%;
}

#search-grid {
  display: grid;
  grid-template-columns: 2.5fr 2fr 1.4fr 1.4fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
  align-items: flex-start;
}

#role-select {
  display: flex;
  align-items: center;
  margin-top: 16px;
}

#role-select > div > input {
  margin-right: 10px;
}

.no-info {
  margin-top: 10px;
  margin-left: 10px;
}

#role-select > div:nth-child(1) {
  margin-right: 25px;
}

#table-section {
  /* height: 522px; */
  /* overflow-y: auto; */
  padding-right: 10px;
}

#member-table {
  width: 100%;
}

.error-message {
  margin-bottom: 0px;
  margin-top: 5px;
  padding-left: 5px;
}

.editor-role-btn,
.admin-role-btn {
  color: #ffffff !important;
  padding: 2px 5px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1.65em !important;
  width: 100%;
  cursor: pointer;
}

.admin-role-btn {
  background-color: #f07821 !important;
  border: 2px solid #f07821;
}

.editor-role-btn {
  background-color: #2f65af !important;
  border: 2px solid #2f65af;
}

.table-hd {
  font-size: 2em;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-weight: 600;
  color: #303030;
  margin: 0;
}

.mb-head {
  display: none;
}

.member-role {
  text-transform: capitalize;
}

.table-regis-hd {
  font-size: 1.5em;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-weight: 600;
  text-align: center !important;
  color: #303030;
  margin: 0;
}

.table-info {
  font-size: 2em;
  font-weight: 500;
  color: #303030;
  margin: 0;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  word-wrap: break-word;
  height: 100%;
  max-width: 100px;
}

table > tr {
  vertical-align: text-top;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

td > h1 > .input-box {
  padding: 3px 5px !important;
  color: #303030 !important;
}

td,
th {
  border: 1px solid rgba(79, 79, 79, 0.16);
  text-align: left;
  padding: 5px 13px 5px 10px;
}

td:nth-child(1),
th:nth-child(1) {
  border-left: none;
}

td:last-child,
th:last-child {
  border-right: none;
}

.file-icon {
  width: 21px;
  cursor: pointer;
}

td:last-child {
  text-align: center;
}

.edit-btn {
  color: #bf2e7e;
  border: 2px solid #bf2e7e;
  font-size: 1.75em;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  box-sizing: border-box;
  border-radius: 12px;
  background-color: transparent;
  padding: 0px 15px;
  cursor: pointer;
}

.save-btn {
  font-size: 1.75em;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  border: 2px solid #2f65af;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 0px 15px;
  color: #ffffff !important;
  background-color: #2f65af !important;
  cursor: pointer;
}

/* Scrollbar */

div::-webkit-scrollbar {
  height: 3px;
  width: 3px;
  padding-bottom: 30px;
}
div::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.2);
}
div::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  /* box-shadow: 0 0 1px rgba(255, 255, 255, 1); */
}

@media screen and (max-width: 980px) {
  #manage-admin {
    padding: 80px 30px 30px 30px;
  }

  td:nth-child(1),
  th:nth-child(1) {
    border-left: 1px solid #c4c4c4;
  }

  td[data-v-80aeddec]:last-child {
    border-right: 1px solid #c4c4c4;
  }

  .edit-icon {
    width: 10px;
  }

  #add-admin-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0px;
  }

  #add-admin-box > div {
    width: 100%;
  }

  #add-admin-box > div:first-child {
    display: none;
  }

  .page-change-left {
    left: 30px;
  }

  .add-btn {
    font-size: 1.5em;
    padding: 1.5px 10px;
    margin-top: 10px;
  }

  table tr {
    display: block;
  }

  table td {
    display: block;
  }

  td {
    background-color: #f8f8f8;
  }

  #table-section {
    padding-right: 0px;
  }

  .mb-head {
    display: initial;
    padding-right: 15px;
  }
  td:last-child {
    text-align: left;
    display: flex;
    align-items: center;
  }
  .table-info {
    max-width: 100%;
  }
  #member-table > tr:first-child {
    display: none;
  }
  #member-table > tr {
    margin-bottom: 20px;
  }
  td,
  th {
    border: 1px solid #c4c4c4;
  }
}

@media screen and (max-width: 767px) {
  #search-grid {
    display: block;
  }

  .edit-icon {
    width: 9px;
  }

  #role-select {
    margin-top: 7px;
    margin-bottom: 10px;
  }

  /* .add-btn {
    font-size: 1.25em;
    padding: 3px 5px;
    margin: 0px 5px;
  } */
}
</style>
