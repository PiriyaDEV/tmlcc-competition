<template>
  <div id="manage-admin">
    <div id="search-grid">
      <div>
        <h1 class="text-normal">ค้นหาจาก keyword</h1>
        <input class="input-box text-normal" type="text" />
      </div>
      <div>
        <h1 class="text-normal">Role</h1>
        <div id="role-select">
          <div>
            <input value="Editor" name="Role" type="radio" />
            <label class="text-normal">Editor</label>
          </div>
          <div>
            <input value="Admin" name="Role" type="radio" />
            <label class="text-normal">Admin</label>
          </div>
        </div>
      </div>
      <div>
        <h1 class="text-normal">เรียงลำดับ</h1>
        <select name="sorting" id="sorting" class="input-box text-normal">
          <option value="มัธยมศึกษา">ชื่อ ก - ฮ</option>
          <option value="มัธยมศึกษา">ชื่อ ก - ฮ</option>
          <option value="มัธยมศึกษา">ชื่อ ก - ฮ</option>
          <option value="มัธยมศึกษา">ชื่อ ก - ฮ</option>
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
        <tr v-for="(member, i) in staffList" :key="i">
          <td>
            <span class="table-hd mb-head">Role</span
            ><span class="table-info member-role">{{ member.role }}</span>
          </td>
          <td>
            <span class="table-hd mb-head">ชื่อ</span
            ><span class="table-info">{{ member.firstName }}</span>
          </td>
          <td>
            <span class="table-hd mb-head">นามสกุล</span
            ><span class="table-info">{{ member.lastName }}</span>
          </td>
          <td>
            <span class="table-hd mb-head">เบอร์โทร</span
            ><span class="table-info">{{ member.phone }}</span>
          </td>
          <td>
            <span class="table-hd mb-head">E-mail</span
            ><span class="table-info">{{ member.email }}</span>
          </td>
          <td>
            <span class="table-hd mb-head">สังกัด</span
            ><span class="table-info">{{ member.organization }}</span>
          </td>
          <td>
            <span class="table-hd mb-head">แก้ไขข้อมูล</span>
            <button class="edit-btn">edit</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      staffList: "admin/getStaffList",
    }),
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

#role-select > div:nth-child(1) {
  margin-right: 25px;
}

#table-section {
  height: 522px;
  overflow-y: auto;
  padding-right: 10px;
}

#member-table {
  width: 100%;
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

table {
  border-collapse: collapse;
  border-spacing: 0;
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
