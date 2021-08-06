<template>
  <div id="manage-file">
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
      <div>
        <button class="add-btn">เพิ่มไฟล์</button>
      </div>
    </div>
    <div>
      <h1 class="text-normal b-header">รายการเอกสาร (Materials)</h1>
      <div id="file-box">
        <div class="file-container" v-for="(file, i) in fileList" :key="i">
          <div>
            <img
              class="file-icon"
              src="../../assets/icon/file-icon.png"
              alt=""
            />
            <h1 class="file-name">โจทย์การแข่งขัน.pdf</h1>
          </div>
          <button class="edit-btn">edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: 20,
    };
  },
};
</script>

<style scoped>
#manage-file {
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
  grid-template-columns: 3fr 2fr 1fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
  align-items: flex-end;
}

.b-header {
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
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

/* File */
#file-box {
  overflow-y: scroll;
  height: 522px;
}

.file-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  padding: 0px 20px;
}

.file-container > div {
  display: flex;
  align-items: center;
}

.file-icon {
  width: 25px;
  margin-right: 20px;
  cursor: pointer;
}

.file-name {
  font-size: 2em;
  font-weight: 500;
  color: #303030;
  margin: 0;
  cursor: pointer;
}

.file-date {
  font-size: 1.5em;
  font-weight: 500;
  margin: 0;
  color: #2f65af;
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
