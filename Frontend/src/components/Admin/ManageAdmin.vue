<template>
  <div id="manage-admin">
    <div id="search-grid">
      <div>
        <h1 class="text-normal">ค้นหาจาก keyword</h1>
        <input v-model="keyword" class="input-box text-normal" type="text" />
      </div>
      <div>
        <h1 class="text-normal">Role</h1>
        <div id="role-select">
          <div>
            <input
              id="checkEditor"
              value="editor"
              v-model="role"
              @click="uncheck('editor')"
              checked
              name="Role"
              type="radio"
            />
            <label class="text-normal">Editor</label>
          </div>
          <div>
            <input
              id="checkAdmin"
              value="admin"
              v-model="role"
              @click="uncheck('admin')"
              checked
              name="Role"
              type="radio"
            />
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
          <option value="email">อีเมล ก - ฮ</option>
          <option value="organization">สังกัด ก - ฮ</option>
        </select>
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
          <th class="table-regis-hd">แก้ไขข้อมูล</th>
        </tr>
        <h1
          v-if="staffList && staffList.length == 0"
          class="text-normal l-grey-text no-info"
        >
          ไม่มีข้อมูลในระบบ
        </h1>
        <tr v-for="(staff, i) in staffList" :key="i">
          <td>
            <span class="table-hd mb-head">Role</span>
            <!-- <span
              class="table-info member-role"
              v-if="edit != staff.user_id"
              >{{ staff.role }}</span
            > -->
            <span class="table-info member-role">{{ staff.role }}</span>
            <span>
              <!-- <button
                class="editor-role-btn table-info"
                v-if="edit == staff.user_id"
              >
                เปลี่ยนเป็น Editor
              </button> -->
              <!-- <button class="admin-role-btn table-info" v-if="edit[i]">
                เปลี่ยนเป็น Admin
              </button> -->
            </span>
          </td>
          <td>
            <span class="table-hd mb-head">ชื่อ</span
            ><span class="table-info capital" v-if="edit != staff.user_id">{{
              staff.firstName
            }}</span>
            <span
              ><input
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
            </span>
          </td>
          <td>
            <span class="table-hd mb-head">นามสกุล</span
            ><span class="table-info capital" v-if="edit != staff.user_id">{{
              staff.lastName
            }}</span>
            <span
              ><input
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
            </span>
          </td>
          <td>
            <span class="table-hd mb-head">เบอร์โทร</span
            ><span class="table-info" v-if="edit != staff.user_id">{{
              staff.phone
            }}</span>
            <span
              ><input
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
            </span>
          </td>
          <td>
            <span class="table-hd mb-head">E-mail</span
            ><span class="table-info" v-if="edit != staff.user_id">{{
              staff.email
            }}</span>
            <span
              ><input
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
            </span>
          </td>
          <td>
            <span class="table-hd mb-head">สังกัด</span
            ><span class="table-info capital" v-if="edit != staff.user_id">{{
              staff.organization
            }}</span>
            <span
              ><input
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
            </span>
          </td>
          <td>
            <span class="table-hd mb-head">แก้ไขข้อมูล</span>
            <button
              class="edit-btn"
              v-if="edit != staff.user_id"
              @click="editClick(staff)"
            >
              edit
            </button>
            <button
              class="save-btn"
              v-if="edit == staff.user_id"
              @click="saveClick(staff)"
            >
              save
            </button>
          </td>
        </tr>
      </table>
    </div>
    <div id="pagination">
      <Pagination :keywordClear="keyword" :currentPage="`staff`" />
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
    uncheck(value) {
      if (this.role == value) {
        if (value == "admin") {
          document.getElementById("checkAdmin").checked = false;
          this.role = "";
        }
        if (value == "editor") {
          document.getElementById("checkEditor").checked = false;
          this.role = "";
        }
      }
    },
  },
};
</script>

<style scoped>
#manage-admin {
  background: #ffffff;
  border-radius: 30px;
  padding: 30px 60px;
  margin-top: 25px;
}

.input-box {
  width: 100%;
}

#search-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
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
}

table > tr {
  vertical-align: text-top;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

td > span > .input-box {
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
  color: #f07821;
  font-size: 1.75em;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  border: 2px solid #f07821;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: transparent;
  padding: 0px 15px;
  cursor: pointer;
}

.save-btn {
  color: #ffffff;
  font-size: 1.75em;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  border: 2px solid #f07821;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: #f07821;
  padding: 0px 15px;
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
    padding: 30px;
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

  .mb-head {
    display: initial;
    padding-right: 15px;
  }
  td:last-child {
    text-align: left;
    display: flex;
    align-items: center;
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

  #role-select {
    margin-top: 0px;
    margin-bottom: 10px;
  }
}
</style>
