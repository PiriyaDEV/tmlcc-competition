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
              @click="viewDoc"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pdfMake from "pdfmake";
import pdfFonts from "../../assets/custom-font.js";

export default {
  computed: {
    ...mapGetters({
      userList: "admin/getUserList",
    }),
  },
  methods: {
    viewDoc() {
      pdfMake.vfs = pdfFonts.pdfMake.vfs; // 2. set vfs pdf font
      pdfMake.fonts = {
        // download default Roboto font from cdnjs.com
        Roboto: {
          normal:
            "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
          bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
          italics:
            "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
          bolditalics:
            "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
        },
        // Kanit Font
        IBMThai: {
          // 3. set Kanit font
          normal: "IBMPlexSansThaiLooped-Regular.ttf",
          bold: "IBMPlexSansThaiLooped-Bold.ttf",
        },
      };
      const docDefinition = {
        info: {
          title: "ใบสมัคร - นาย พิริยะ ชัยกุล (Pd.Piriya)",
        },
        content: [
          {
            image: "photo",
            width: 200,
            alignment: "center",
          },
          {
            text: "ใบสมัคร",
            alignment: "center",
            fontSize: 15,
            margin: [0, 20, 0, 8],
            bold: true,
          },
          {
            text: "Thailand Machine learning for Chemistry (TMLCC)",
            alignment: "center",
            fontSize: 15,
            margin: [0, 0, 0, 8],
            bold: true,
          },
          {
            text: "ข้อมูลผู้สมัคร",
            fontSize: 12,
            margin: [0, 20, 0, 8],
            bold: true,
          },
          {
            text: [
              { text: "คำนำหน้า : " },
              { text: "นาย", decoration: "underline" },
              { text: "              ชื่อ : " },
              { text: "พิริยะ", decoration: "underline" },
              { text: "              นามสกุล : " },
              { text: "ชัยกุล", decoration: "underline" },
            ],
            width: "*",
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              { text: "ระดับการศึกษาสูงสุด : " },
              { text: "ปริญญาตรี", decoration: "underline" },
              { text: "             สถานศึกษา : " },
              { text: "อัสสัมชัญสมุทรปราการ", decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              { text: "สังกัด : " },
              { text: "วิทยาศาสตร์ - คณิตศาสตร์", decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              { text: "ที่อยู่ : " },
              {
                text: "420-420/1 ม.ทิพวัล 1 ถ.เทพารักษ์ ต.เทพารักษ์ อ.เมือง จ.สมุทรปราการ 10270",
                decoration: "underline",
              },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              { text: "ประเทศ : " },
              { text: "ประเทศไทย", decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: "ช่องทางการติดต่อ",
            fontSize: 12,
            margin: [0, 15, 0, 8],
            bold: true,
          },
          {
            text: [
              { text: "เบอร์โทรศัพท์ : " },
              { text: "0896832465", decoration: "underline" },
              { text: "             Email : " },
              { text: "pry@mail.kmutt.ac.th", decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          { text: "ความสนใจ", fontSize: 13, margin: [0, 15, 0, 8], bold: true },
          {
            text: [
              { text: "ผลงานที่เคยทำ : " },
              { text: "หลายๆอย่าง", decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              {
                text: "หากมีข้อเสนอโครงการให้เข้าร่วมทำงาน/ฝึกงานกับบริษัท หรือ องค์กร : ",
              },
              { text: "สนใจ", decoration: "underline" },
            ],
          },
          {
            text: "ประเมิณตนเอง",
            fontSize: 12,
            margin: [0, 15, 0, 8],
            bold: true,
          },
          {
            text: "คิดว่าตัวเองมีทักษะ",
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              {
                text: "Programming:     ระดับ : ",
              },
              { text: "Beginner", decoration: "underline" },
              {
                text: "    ภาษา : ",
              },
              { text: "HTML, Vue.js", decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              {
                text: "Chemistry:     ระดับ : ",
              },
              { text: "Beginner", decoration: "underline" },
              {
                text: "    เรื่องที่เชี่ยวชาญ : ",
              },
              { text: "Isolation, Molecule", decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              {
                text: "Machine learning:     ระดับ : ",
              },
              { text: "Beginner", decoration: "underline" },
              {
                text: "    เรื่องที่เชี่ยวชาญ : ",
              },
              { text: "ระบบในโรงงาน", decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              {
                text: "อื่นๆ (โปรดระบุ):     เรื่องที่เชี่ยวชาญ : ",
              },
              { text: "นอนหลับพักผ่อน", decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
        ],
        images: {
          photo:
            "https://scontent.fubp1-1.fna.fbcdn.net/v/t1.6435-9/239874070_4761197243913069_1109602868497192659_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeEZNqxzgIHQXdC7jTumKWNfsLnp63Qlay2wuenrdCVrLfqAiRKrMSDhXQF_Atl_lz1A29345Me63siJKjnXN_bi&_nc_ohc=mR7brVKxq8YAX8PeVcE&tn=02SmQdQFY_dqYu2v&_nc_ht=scontent.fubp1-1.fna&oh=cedd7400a90aba6c90e6a6ad3d288155&oe=6143FDE3",
        },
        defaultStyle: {
          font: "IBMThai",
        },
      };
      // pdfMake.createPdf(docDefinition).open({}, window);
      pdfMake.createPdf(docDefinition).open();
    },
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
