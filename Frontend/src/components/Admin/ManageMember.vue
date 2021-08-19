<template>
  <div id="manage-member">
    <div id="search-grid">
      <div>
        <h1 class="text-normal">ค้นหาจาก keyword</h1>
        <input class="input-box text-normal" type="text" />
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
          <th class="table-hd">Display Name</th>
          <th class="table-hd">ชื่อ</th>
          <th class="table-hd">นามสกุล</th>
          <th class="table-hd">Team</th>
          <th class="table-hd">E-mail</th>
          <th class="table-hd">ระดับการศึกษา</th>
          <th class="table-regis-hd">แสดงใบสมัคร</th>
        </tr>
        <tr v-for="(member, i) in userList" :key="i">
          <td>
            <span class="table-hd mb-head">Display Name</span
            ><span class="table-info display-name">{{
              member.displayName
            }}</span>
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
            <span class="table-hd mb-head">Team</span
            ><span class="table-info">{{ member.teamName }}</span>
          </td>
          <td>
            <span class="table-hd mb-head">E-mail</span
            ><span class="table-info">{{ member.email }}</span>
          </td>
          <td>
            <span class="table-hd mb-head">ระดับการศึกษา</span
            ><span class="table-info">{{ member.education }}</span>
          </td>
          <td>
            <span class="table-hd mb-head">แสดงใบสมัคร</span>
            <img
              class="file-icon"
              src="../../assets/icon/file-icon.png"
              alt=""
            />
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
      userList: "admin/getUserList",
    }),
  },
};
</script>

<style scoped>
#manage-member {
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
  grid-template-columns: 3fr 1fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
  align-items: flex-start;
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

.mb-head {
  display: none;
}

.display-name {
  text-transform: capitalize;
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
  #manage-member {
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
  .file-icon {
    width: 18px;
  }
}

@media screen and (max-width: 767px) {
  #search-grid {
    display: block;
  }
}
</style>
