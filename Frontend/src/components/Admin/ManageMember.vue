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
        <tr v-for="(member, i) in memberList" :key="i">
          <td class="table-info">pd.piriya</td>
          <td class="table-info">พิริยะ</td>
          <td class="table-info">ชัยกุล</td>
          <td class="table-info">Deep Blue Sea</td>
          <td class="table-info">piriya@gmail.com</td>
          <td class="table-info">มัธยมศึกษา</td>
          <td>
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
export default {
  data() {
    return {
      memberList: 20,
    };
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
</style>
