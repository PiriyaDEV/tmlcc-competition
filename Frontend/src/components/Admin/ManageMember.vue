<template>
  <div id="manage-member">
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
          <option value="team">ชื่อทีม ก - ฮ</option>
          <option value="education">ระดับการศึกษา ก - ฮ</option>
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
          <option value="5">5 รายการ</option>
          <option value="25" v-if="userListLength > 5">25 รายการ</option>
          <option value="50" v-if="userListLength > 25">50 รายการ</option>
          <option value="100" v-if="userListLength > 50">100 รายการ</option>
          <option value="200" v-if="userListLength > 100">200 รายการ</option>
          <option value="500" v-if="userListLength > 200">500 รายการ</option>
          <option value="all">ทั้งหมด</option>
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
          <th class="table-hd">แสดงใบสมัคร</th>
        </tr>
        <h1
          v-if="userList && userList.length == 0"
          class="text-normal l-grey-text no-info"
        >
          ไม่มีข้อมูลในระบบ
        </h1>
        <tr v-for="(user, i) in userList" :key="i">
          <td>
            <h1 class="table-hd mb-head">Display Name</h1>
            <h1 class="table-info display-name capital">
              {{ user.displayName }}
            </h1>
          </td>
          <td>
            <h1 class="table-hd mb-head">ชื่อ</h1>
            <h1 class="table-info capital">{{ user.firstName }}</h1>
          </td>
          <td>
            <h1 class="table-hd mb-head">นามสกุล</h1>
            <h1 class="table-info capital">{{ user.lastName }}</h1>
          </td>
          <td>
            <h1 class="table-hd mb-head">Team</h1>
            <h1 class="table-info capital">{{ user.teamName }}</h1>
          </td>
          <td>
            <h1 class="table-hd mb-head">E-mail</h1>
            <h1 class="table-info">{{ user.email }}</h1>
          </td>
          <td>
            <h1 class="table-hd mb-head">ระดับการศึกษา</h1>
            <h1 class="table-info">{{ user.education }}</h1>
          </td>
          <td>
            <h1 class="table-hd mb-head">แสดงใบสมัคร</h1>
            <img
              class="file-icon"
              src="../../assets/icon/file-icon.png"
              alt=""
              @click="viewDoc(user.user_id)"
            />
          </td>
        </tr>
      </table>
    </div>
    <div id="pagination">
      <Pagination
        :keywordClear="keyword"
        :currentPage="`user`"
        :active="activeCheck"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "../Admin/Menu/Pagination.vue";
import { mapGetters } from "vuex";
import pdfMake from "pdfmake";
import pdfFonts from "../../assets/custom-fonts.js";

export default {
  data() {
    return {
      keyword: "",
      sort: "name",
      perPage: 25,
      currentPage: "user",
      activeCheck: false,
    };
  },
  components: {
    Pagination,
  },
  mounted() {
    this.keyword = this.userSearch;
    this.$store.dispatch("admin/updateUserSort", this.sort);
  },
  computed: {
    ...mapGetters({
      userList: "admin/getUserList",
      userInfo: "admin/getUserSelect",
      userSearch: "admin/getUserSearch",
      userListLength: "admin/getUserListLength",
    }),
  },
  watch: {
    keyword: function () {
      this.$store.dispatch("admin/updateUserSearch", this.keyword);
    },
    sort: function () {
      this.$store.dispatch("admin/updateUserSort", this.sort);
    },
    perPage: function () {
      this.activeCheck = !this.activeCheck;
      if (this.perPage == "all") {
        if (this.currentPage == "user") {
          this.$store.dispatch(
            "admin/updateUserPageLimit",
            this.userListLength
          );
        }
      } else {
        if (this.currentPage == "user") {
          this.$store.dispatch("admin/updateUserPageLimit", this.perPage);
          this.page = 1;
          this.$store.dispatch("admin/updateUserSelectPage", 1);
        }
      }
    },
  },
  methods: {
    clickDasboard() {
      if (this.$route.path != "/dashboard") {
        this.keyword = "";
        this.$router.push("/dashboard");
      }
    },
    async viewDoc(user_id) {
      await this.$store.dispatch("admin/getUserInfo", user_id);

      if (this.userInfo.isWorkInterest == false) {
        this.userInfo.isWorkInterest = "ไม่สนใจ";
      } else {
        this.userInfo.isWorkInterest = "สนใจ";
      }

      if (!this.userInfo.interestField) {
        this.userInfo.interestField = "ไม่สนใจ";
      }

      if (this.userInfo.hasProgSkill == false) {
        this.userInfo.progSkillLevel = "ไม่มี";
        this.userInfo.progSkillList = "ไม่มี";
      }

      if (this.userInfo.hasChemSkill == false) {
        this.userInfo.chemSkillLevel = "ไม่มี";
        this.userInfo.chemSkillList = "ไม่มี";
      }

      if (this.userInfo.hasMachineLSkill == false) {
        this.userInfo.machineLSkillLevel = "ไม่มี";
        this.userInfo.machineLSkillList = "ไม่มี";
      }

      if (this.userInfo.hasOtherSkill == false) {
        this.userInfo.otherSkillList = "ไม่มี";
      }

      pdfMake.vfs = pdfFonts.pdfMake.vfs; // 2. set vfs pdf font
      pdfMake.fonts = {
        // Kanit Font
        Sarabun: {
          // 3. set Kanit font
          normal: "Sarabun-Regular.ttf",
          bold: "Sarabun-Medium.ttf",
        },
      };
      const docDefinition = {
        info: {
          title:
            "ใบสมัคร - " +
            this.userInfo.titleName +
            " " +
            this.userInfo.firstName +
            " " +
            this.userInfo.lastName +
            " (" +
            this.userInfo.displayName +
            ")",
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
              { text: this.userInfo.titleName, decoration: "underline" },
              { text: "              ชื่อ : " },
              { text: this.userInfo.firstName, decoration: "underline" },
              { text: "              นามสกุล : " },
              { text: this.userInfo.lastName, decoration: "underline" },
            ],
            width: "*",
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              { text: "ระดับการศึกษาสูงสุด : " },
              { text: this.userInfo.education, decoration: "underline" },
              { text: "             สถานศึกษา : " },
              { text: this.userInfo.institution, decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              { text: "สังกัด : " },
              { text: this.userInfo.organization, decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              { text: "ที่อยู่ : " },
              {
                text: this.userInfo.address,
                decoration: "underline",
              },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              { text: "ประเทศ : " },
              { text: this.userInfo.country, decoration: "underline" },
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
              { text: this.userInfo.phone, decoration: "underline" },
              { text: "             Email : " },
              { text: this.userInfo.email, decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          { text: "ความสนใจ", fontSize: 13, margin: [0, 15, 0, 8], bold: true },
          {
            text: [
              { text: "ผลงานที่เคยทำ : " },
              { text: this.userInfo.works, decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              {
                text: "หากมีข้อเสนอโครงการให้เข้าร่วมทำงาน/ฝึกงานกับบริษัท หรือ องค์กร : ",
              },
              { text: this.userInfo.isWorkInterest, decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              {
                text: "สาขาที่สนใจ : ",
              },
              { text: this.userInfo.interestField, decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
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
              { text: this.userInfo.progSkillLevel, decoration: "underline" },
              {
                text: "    ภาษา : ",
              },
              { text: this.userInfo.progSkillList, decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              {
                text: "Chemistry:     ระดับ : ",
              },
              { text: this.userInfo.chemSkillLevel, decoration: "underline" },
              {
                text: "    เรื่องที่เชี่ยวชาญ : ",
              },
              { text: this.userInfo.chemSkillList, decoration: "underline" },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              {
                text: "Machine learning:     ระดับ : ",
              },
              {
                text: this.userInfo.machineLSkillLevel,
                decoration: "underline",
              },
              {
                text: "    เรื่องที่เชี่ยวชาญ : ",
              },
              {
                text: this.userInfo.machineLSkillList,
                decoration: "underline",
              },
            ],
            fontSize: 11,
            margin: [0, 5, 0, 8],
          },
          {
            text: [
              {
                text: "อื่นๆ (โปรดระบุ):     เรื่องที่เชี่ยวชาญ : ",
              },
              { text: this.userInfo.otherSkillList, decoration: "underline" },
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
          font: "Sarabun",
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
  padding: 80px 60px 30px 60px;
  margin-top: 25px;
  position: relative;
}

.input-box {
  width: 100%;
}

#search-grid {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
  align-items: flex-start;
}

#table-section {
  /* height: 522px; */
  /* overflow-y: auto; */
  padding-right: 10px;
}

#member-table {
  width: 100%;
}

.no-info {
  margin-top: 10px;
  margin-left: 10px;
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

.page-change-left {
  position: absolute;
  top: 35px;
  left: 60px;
  cursor: pointer;
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
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  word-wrap: break-word;
  height: 100%;
  max-width: 100px;
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
    padding: 80px 30px 30px 30px;
  }

  td:nth-child(1),
  th:nth-child(1) {
    border-left: 1px solid #c4c4c4;
  }

  td[data-v-80aeddec]:last-child {
    border-right: 1px solid #c4c4c4;
  }

  .table-info {
    max-width: 100%;
  }

  .page-change-left {
    left: 30px;
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
