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
        <tr v-for="(member, i) in memberList" :key="i">
          <td class="table-info">Admin</td>
          <td class="table-info">พิริยะ</td>
          <td class="table-info">ชัยกุล</td>
          <td class="table-info">0896832465</td>
          <td class="table-info">piriya@gmail.com</td>
          <td class="table-info">DeepBlueSea</td>
          <td>
            <button class="edit-btn">edit</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      memberList: 20,
    };
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
</style>
