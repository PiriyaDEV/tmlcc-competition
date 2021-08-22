<template>
  <div id="video-upload">
    <div class="center page-change-left">
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <h1 class="text-normal purple-text">หน้าหลักการจัดการไฟล์วิดิโอ</h1>
    </div>

    <div id="video-upload-box">
      <h1 class="header-ms">เพิ่ม Video</h1>
      <hr class="bar-color" />
    </div>

    <div class="search-grid">
      <h1 class="text-normal">ชื่อวิดีโอ</h1>
      <input
        class="input-box text-normal"
        type="text"
        placeholder="กรอกชื่อวิดิโอ"
      />
    </div>

    <div class="search-grid seach-no-btn">
      <h1 class="text-normal">Video Link</h1>
      <input
        class="input-box text-normal"
        type="text"
        placeholder="กรอก url ของ video"
      />
    </div>

    <div class="info-grid seach-no-btn">
      <h1 class="text-normal">ข้อมูลเพิ่มเติม</h1>
      <h1 class="text-normal date-info">วัน/เดือน/ปี ที่เผยแพร่</h1>
      <input
        class="input-box text-normal"
        type="text"
        placeholder="เลือกวัน/เดือน/ปี (Default คือ วันที่่เปิดหน้าที่นี้)"
      />
    </div>

    <div class="info-grid seach-no-btn">
      <span></span>
      <h1 class="text-normal">เวลา ที่เผยแพร่</h1>
      <input
        class="input-box text-normal"
        type="text"
        placeholder="เลือกเวลาในการเผยแพร่ (Default คือ เวลาที่เปิดหน้าที่นี้)"
      />
    </div>

    <div class="info-grid seach-no-btn">
      <span></span>
      <h1 class="text-normal">รายละเอียดวิดิโอ</h1>
      <input
        class="input-box text-normal"
        type="text"
        placeholder="กรอกรายละเอียดเพิ่มเติมของวิดิโอ  (สามารถเว้นว่างได้)"
      />
    </div>

    <hr class="bar-color orange-bar" />

    <div class="center">
      <button class="btn-white">บันทึกข้อมูล</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: 2,
    };
  },
};
</script>

<style scoped>
#video-upload {
  background: #ffffff;
  border-radius: 30px;
  padding: 30px 60px;
  margin-top: 25px;
  position: relative;
}

.input-box {
  width: 100%;
  margin: 0px;
}

.fa {
  font-size: 2.25em;
  font-weight: 500;
}

.fa-angle-left {
  margin: 0px 15px 0px 0px;
  color: #bf2e7e !important;
}

.page-change-left {
  position: absolute;
  top: 35px;
  left: 50px;
  cursor: pointer;
}

.bar-color {
  width: 71px;
}

.orange-bar {
  color: #f07821;
  background-color: #f07821;
  border: 1.5px solid #f07821;
  margin-top: 25px;
}

#video-upload-box {
  margin-top: 50px;
}

#file-content {
  margin-top: 20px;
}

.search-grid {
  display: grid;
  grid-template-columns: 1fr 3.5fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
  align-items: center;
  margin-top: 30px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 2.5fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
  align-items: center;
  margin-top: 30px;
}

.btn-white {
  margin-top: 20px;
  color: #2f65af;
}

.seach-no-btn {
  margin-top: 10px;
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
  margin: 0px;
}

#file-content > h1 {
  margin-bottom: 10px;
}

#file-box > div > div > .input-box {
  color: #303030 !important;
  padding: 3px 5px !important;
}

.file-list-box,
.file-list-box > div {
  display: flex;
  align-items: center;
}

.file-list-box {
  justify-content: space-between;
  padding-left: 20px;
}

.file-list-box:not(:last-child) {
  margin-bottom: 10px;
}

#file-input {
  display: none;
}

.edit-btn,
.delete-btn {
  font-size: 1.75em;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  box-sizing: border-box;
  border-radius: 12px;
  padding: 0px 15px;
  cursor: pointer;
}

.edit-btn {
  color: #f07821;
  border: 2px solid #f07821;
  background-color: transparent;
}

.delete-btn {
  color: #bf2e7e;
  border: 2px solid #bf2e7e;
  background-color: transparent;
  margin: 0px 10px;
  display: flex;
  align-items: center;
}

.delete-btn > img {
  width: 13px;
  margin-right: 4px;
}

/* File */
#file-box {
  overflow-y: scroll;
  height: 522px;
}

.file-container {
  align-items: center;
  margin-top: 15px;
  padding: 0px 20px;
}

.file-container > div:first-child {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.file-container > div > div,
#icon-list {
  display: flex;
  align-items: center;
}

.folder-icon {
  width: 22px;
  margin-right: 8px;
}

#icon-list {
  margin-top: 10px;
  margin-left: 25px;
  margin-bottom: 10px;
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

.file-head {
  font-weight: 800;
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

@media screen and (max-width: 980px) {
  #video-upload {
    padding: 30px;
  }

  .file-container {
    padding: 0px 15px 10px 0px;
  }

  .file-name {
    font-size: 1.75em;
  }

  .edit-btn,
  .delete-btn,
  .cancel-btn {
    font-size: 1.5em;
    padding: 0px 10px;
  }

  .add-btn {
    font-size: 1.5em;
    padding: 1.5px 10px;
  }

  .file-icon {
    width: 18px;
    margin-right: 12px;
  }

  .delete-btn > img {
    width: 10px;
  }

  .folder-icon {
    width: 16px;
  }
}

@media screen and (max-width: 767px) {
  .file-name {
    font-size: 1.5em;
  }

  .file-container {
    padding: 0px 5px 10px 0px;
  }

  .edit-btn,
  .delete-btn,
  .cancel-btn {
    font-size: 1.25em;
    padding: 0px 5px;
    margin: 0px 5px;
  }

  .search-grid,
  .info-grid {
    display: block;
  }

  .fa {
    font-size: 3.25em;
  }

  .add-btn {
    margin-top: 10px;
  }

  .delete-btn > img {
    width: 7px;
  }

  .date-info {
    margin-top: 5px;
  }
}
</style>
