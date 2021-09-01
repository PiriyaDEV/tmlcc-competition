<template>
  <div id="pagination">
    <div id="show-text">
      <h1 class="text-normal">
        <span v-if="pagination.resultLength >= this.pagination.perPage"
          >แสดงผล {{ beforePage }} ถึง {{ afterPage }} จาก
          {{ pagination.resultLength }} ข้อมูล</span
        >
        <span v-else-if="pagination.resultLength < this.pagination.perPage"
          >แสดงผล {{ beforePage }} ถึง {{ pagination.resultLength }} จาก
          {{ pagination.resultLength }} ข้อมูล</span
        >
      </h1>
      <!-- <h1 class="text-normal">
        <span v-if="currentPage == 'staff' && pagination.resultLength >= 25"
          >แสดงผล {{ beforePage }} ถึง {{ afterPage }} จาก
          {{ staffListLength }} ข้อมูล</span
        >
        <span v-else-if="currentPage == 'staff' && staffListLength < 25"
          >แสดงผล {{ beforePage }} ถึง {{ staffListLength }} จาก
          {{ staffListLength }} ข้อมูล</span
        >
      </h1> -->
    </div>
    <div id="pagination-section">
      <div class="section">
        <!-- <div class="pagenum-box addon-btn" @click="setPage(1)">
          <h1 class="text-normal">หน้าแรก</h1>
        </div> -->
        <div class="pagenum-box previous-page" @click="previousPage">
          <h1 class="text-normal">ก่อนหน้า</h1>
        </div>
      </div>

      <div v-for="(page, i) in pagination.pages" :key="i">
        <div
          class="pagenum-box-clicked page-box"
          v-if="page == pagination.page"
        >
          <h1 class="text-normal">{{ page }}</h1>
        </div>

        <div
          v-if="
            ((page >= pagination.page && page <= pagination.page + 2) ||
              (pagination.page - 2 <= page && pagination.page >= page)) &&
            page != pagination.page
          "
          class="pagenum-box page-box"
          @click="setPage(page)"
        >
          <h1 class="text-normal">{{ page }}</h1>
        </div>
      </div>

      <div v-if="pagination.pages.length - page >= 4">
        <h1 class="text-normal">...</h1>
      </div>
      <div>
        <div
          class="pagenum-box page-box"
          v-if="pagination.pages.length - page >= 3"
          @click="setPage(pagination.pages.length)"
        >
          <h1 class="text-normal">{{ pagination.pages.length }}</h1>
        </div>
        <div
          class="pagenum-box-clicked page-box"
          v-if="pagination.pages.length <= 0"
          @click="setPage(pagination.pages.length)"
        >
          <h1 class="text-normal">1</h1>
        </div>
      </div>
      <div class="section">
        <div class="pagenum-box next-page" @click="nextPage">
          <h1 class="text-normal">หน้าถัดไป</h1>
        </div>

        <!-- <div>
          <select
            v-model="perPage"
            name="show"
            id="show"
            class="pagenum-box text-normal"
          >
            <option value="1">1 รายการ</option>
            <option value="5">5 รายการ</option>
            <option value="25">25 รายการ</option>
            <option
              value="50"
              v-if="userListLength > 25 || staffListLength > 25"
            >
              50 รายการ
            </option>
            <option
              value="100"
              v-if="userListLength > 50 || staffListLength > 50"
            >
              100 รายการ
            </option>
            <option
              value="200"
              v-if="userListLength > 100 || staffListLength > 100"
            >
              200 รายการ
            </option>
            <option
              value="500"
              v-if="userListLength > 200 || staffListLength > 200"
            >
              500 รายการ
            </option>
            <option value="all">ทั้งหมด</option>
          </select>
        </div> -->
        <!-- <div
          class="pagenum-box next-page"
          @click="setPage(pagination.pages.length)"
        >
          <h1 class="text-normal">หน้าสุดท้าย</h1>
        </div> -->
        <!-- <h1>{{ pageNum }}</h1> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      page: 1,
      perPage: 25,
      pagesLimit: 5,
      beforePage: 0,
      afterPage: 0,
      window: {
        width: 0,
        height: 0,
      },
    };
  },
  props: ["currentPage", "keywordClear", "active"],
  computed: {
    ...mapGetters({
      pagination: "admin/getPagination",
      userListLength: "admin/getUserListLength",
      staffListLength: "admin/getStaffListLength",
    }),
  },
  watch: {
    page: function () {
      if (this.currentPage == "user") {
        this.$store.dispatch("admin/updateUserSelectPage", this.page);
      } else if (this.currentPage == "staff") {
        this.$store.dispatch("admin/updateStaffSelectPage", this.page);
      }
      this.getNumberPage();
    },
    active: function () {
      this.beforePage = 0;
      this.afterPage = 0;
      this.page = 1;
      this.perPage = this.pagination.perPage;
      this.getNumberPage();
    },
    keywordClear: function () {
      if (this.pagination.resultLength == 0) {
        this.beforePage = 0;
        this.afterPage = 0;
      } else {
        this.getNumberPage();
      }
      this.page = 1;
    },
    perPage: function () {
      if (this.perPage == "all") {
        if (this.currentPage == "user") {
          this.$store.dispatch(
            "admin/updateUserPageLimit",
            this.userListLength
          );
        } else if (this.currentPage == "staff") {
          this.$store.dispatch(
            "admin/updateStaffPageLimit",
            this.staffListLength
          );
        }
      } else {
        if (this.currentPage == "user") {
          this.$store.dispatch("admin/updateUserPageLimit", this.perPage);
          this.page = 1;
          this.$store.dispatch("admin/updateUserSelectPage", 1);
        } else if (this.currentPage == "staff") {
          this.$store.dispatch("admin/updateStaffPageLimit", this.perPage);
          this.page = 1;
          this.$store.dispatch("admin/updateStaffSelectPage", 1);
        }
      }
      this.getNumberPage();
    },
  },
  created() {
    this.$store.dispatch("admin/setCurrentPage", this.currentPage);
    window.addEventListener("resize", this.detectScreenChange);
    this.detectScreenChange();

    if (this.currentPage == "user") {
      this.$store.dispatch("admin/updateUserPageLimit", this.perPage);
      this.$store.dispatch("admin/updateUserSelectPage", this.page);
    } else if (this.currentPage == "staff") {
      this.$store.dispatch("admin/updateStaffPageLimit", this.perPage);
      this.$store.dispatch("admin/updateStaffSelectPage", this.page);
    }
    this.getNumberPage();
  },
  destroyed() {
    window.removeEventListener("resize", this.detectScreenChange);
  },
  methods: {
    setPage(page) {
      this.page = page;
    },
    nextPage() {
      if (this.page < this.pagination.pages.length) {
        this.page = this.page + 1;
      }
    },
    previousPage() {
      if (this.page > 1) {
        this.page = this.page - 1;
      }
    },
    detectScreenChange() {
      this.window = window.innerWidth;

      if (this.window < 800) {
        this.pagesLimit = 5;
        this.perPage = 5;
      } else {
        this.pagesLimit = 7;
        this.perPage = 25;
      }
    },
    getNumberPage() {
      if (
        this.pagination.page * this.pagination.perPage >=
        this.pagination.resultLength
      ) {
        this.afterPage = this.pagination.resultLength;
      } else {
        this.afterPage = this.pagination.page * this.pagination.perPage;
      }
      this.beforePage =
        this.pagination.page * this.pagination.perPage -
        (this.pagination.perPage - 1);
    },
  },
};
</script>

<style scoped>
#pagination {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#show-text {
  right: 0px;
}

.text-normal {
  font-size: 2em;
}

#pagination-section {
  display: flex;
  text-align: center;
}

select,
option {
  background-color: transparent;
}

.pagenum-box {
  border: 1px solid #c4c4c4;
  border-radius: 6px;
  padding: 3px 10px;
  cursor: pointer;
}

.pagenum-box > h1 {
  color: #303030;
}

.pagenum-box:hover {
  background-color: #e2e2e2;
  border: 1px solid #c4c4c4;
}

.pagenum-box-clicked {
  background-color: #764a97;
  border: 1px solid #764a97;
  padding: 3px 10px;
  cursor: pointer;
  border-radius: 6px;
}

.next-page {
  margin-right: 10px;
}

.previous-page {
  margin-left: 10px;
}

.pagenum-box-clicked > h1 {
  color: #ffffff;
}

.page-box {
  margin: 0px 5px;
}

#pagination-section > div:first-child {
  margin-right: 20px;
}

#pagination-section > div:last-child {
  margin-left: 20px;
}

@media screen and (max-width: 1024px) {
  #pagination-section > div:first-child {
    margin-right: 10px;
  }

  #pagination-section {
    justify-content: center;
  }

  #pagination {
    margin-top: 15px;
    display: flex;
    flex-direction: column-reverse;
  }

  #show-text {
    margin-top: 20px;
    justify-content: center;
    display: flex;
  }

  .text-normal {
    font-size: 1.75em;
  }

  #pagination-section > div:last-child {
    margin-left: 10px;
  }

  .next-page {
    margin-right: 5px;
  }

  .previous-page {
    margin-left: 5px;
  }

  .pagenum-box,
  .pagenum-box-clicked {
    padding: 3px 5px;
  }
}

@media screen and (max-width: 800px) {
  #pagination-section > div:first-child {
    margin-right: 5px;
  }

  .addon-btn {
    display: none;
  }

  #pagination-section > div:last-child {
    margin-left: 5px;
  }

  .pagenum-box,
  .pagenum-box-clicked {
    padding: 3px 5px;
  }
}
</style>
