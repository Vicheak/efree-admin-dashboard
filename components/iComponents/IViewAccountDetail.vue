<template>
  <div class="modal fade" id="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content bg-body-tertiary">
        <div class="modal-header">
          <h4 class="modal-title text-main">{{ $t("view_account_detail") }}</h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="row">
            <!-- account_info -->
            <div class="col-7">
              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="text-main py-1">
                        {{ $t("account_info") }}
                      </h5>
                      <div class="row">
                        <div class="col-6 my-2">
                          <div class="form-group">
                            <label class="label-style">{{
                              $t("full_name")
                            }}</label>
                            <div class="data-account">
                              {{ accountInfo.full_name }}
                            </div>
                          </div>
                        </div>
                        <div class="col-6 my-2">
                          <div class="form-group">
                            <label class="label-style">{{
                              $t("password")
                            }}</label>
                            <div class="data-account">
                              {{ accountInfo.password }}
                            </div>
                          </div>
                        </div>
                        <div class="col-6 my-2">
                          <div class="form-group">
                            <label class="label-style">{{
                              $t("account_code")
                            }}</label>
                            <div class="data-account">
                              {{ accountInfo.acc_code }}
                            </div>
                          </div>
                        </div>
                        <div class="col-6 my-2">
                          <div class="form-group">
                            <label class="label-style">{{
                              $t("nick_name")
                            }}</label>
                            <div class="data-account">
                              {{ accountInfo.nick_name }}
                            </div>
                          </div>
                        </div>
                        <div class="col-6 my-2">
                          <div class="form-group">
                            <label class="label-style">{{
                              $t("gender")
                            }}</label>
                            <div class="data-account">
                              {{ $t(genderEnum.getKey(accountInfo.gender)) }}
                            </div>
                          </div>
                        </div>
                        <div class="col-6 my-2">
                          <div class="form-group">
                            <label class="label-style">{{ $t("phone") }}</label>
                            <div class="data-account">
                              {{ phoneFormat(accountInfo.phone) }}
                            </div>
                          </div>
                        </div>
                        <div class="col-6 my-2">
                          <div class="form-group">
                            <label class="label-style">{{ $t("email") }}</label>
                            <div v-if="accountInfo.email" class="data-account">
                              {{ accountInfo.email }}
                            </div>
                            <div v-else class="data-account">N/A</div>
                          </div>
                        </div>

                        <div class="col-6 my-2">
                          <div class="form-group">
                            <label class="label-style">{{
                              $t("source_link")
                            }}</label>
                            <div
                              v-if="accountInfo.source_link"
                              class="data-account"
                            >
                              {{ accountInfo.source_link }}
                            </div>
                            <div v-else class="data-account">N/A</div>
                          </div>
                        </div>
                        <div class="col-6 my-2">
                          <div class="form-group">
                            <label class="label-style">{{
                              $t("account_level")
                            }}</label>
                            <div class="data-account">
                              {{
                                $t(
                                  accountLevelEnum.getKey(
                                    accountInfo.account_level_id
                                  )
                                )
                              }}
                            </div>
                          </div>
                        </div>
                        <div class="col-6 my-2">
                          <div class="form-group">
                            <label class="label-style">{{
                              $t("source")
                            }}</label>
                            <div v-if="accountInfo.source" class="data-account">
                              {{ accountInfo.source }}
                            </div>
                            <div v-else class="data-account">N/A</div>
                          </div>
                        </div>
                        <div class="col-12 my-2">
                          <div class="form-group">
                            <label class="label-style">{{ $t("note") }}</label>
                            <div class="data-account">
                              {{ accountInfo.note }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- bank_info -->
                <div class="col-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="text-main">
                        {{ $t("bank_info") }}
                      </h5>
                      <div class="row product_table">
                        <IFormTable
                          :tableHeader="BankAccountInfoTableHeader"
                          :tableData="bankInfo"
                          :showPagination="false"
                          :showBorder="true"
                          ref="formTable"
                        >
                          <template #bank_name="{ bank_name }">
                            <span style="white-space: nowrap">{{
                              bank_name
                            }}</span>
                          </template>
                        </IFormTable>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- product_account -->
            <div class="col-5">
              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="text-main py-1 px-3">
                        {{ $t("product_account") }}
                      </h5>
                      <div class="row product_table">
                        <IFormTable
                          :tableHeader="productAccountTableHeader"
                          :tableData="productAccount"
                          :showPagination="false"
                          :showBorder="true"
                          ref="formTable"
                        >
                          <template #username="row">
                            {{ row.username }} <br />
                            {{ row.password }}
                          </template>
                        </IFormTable>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- summary report -->
                <div class="col-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="text-main py-1 px-3">
                        {{ $t("summary_report") }}
                      </h5>
                      <table class="table">
                        <tr>
                          <th>Registration Date:</th>
                          <th>{{ dateTimeFormat(accountInfo.created_at) }}</th>
                        </tr>
                        <tr>
                          <th>Last Transaction:</th>
                          <th>
                            {{ dateTimeFormat(accountInfo.last_transaction) }}
                          </th>
                        </tr>
                        <tr>
                          <th>Total Deposit:</th>
                          <th>{{ currency(accountInfo.total_deposit) }}</th>
                        </tr>
                        <tr>
                          <th>Total Withdraw:</th>
                          <th>{{ currency(accountInfo.total_withdraw) }}</th>
                        </tr>
                        <tr>
                          <th>Total Promotion:</th>
                          <th>{{ currency(accountInfo.total_promotion) }}</th>
                        </tr>
                        <tr>
                          <th>Total Rebate:</th>
                          <th>{{ currency(accountInfo.total_rebate) }}</th>
                        </tr>
                        <tr>
                          <th>Total Credit Correction:</th>
                          <th>
                            {{ currency(accountInfo.total_credit_correction) }}
                          </th>
                        </tr>
                        <tr>
                          <th>Total Win/Lose:</th>
                          <th>{{ currency(accountInfo.total_win_lose) }}</th>
                        </tr>
                        <tr>
                          <th>Total Transfer Credit:</th>
                          <th>
                            {{ currency(accountInfo.total_transfer_credit) }}
                          </th>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button data-bs-dismiss="modal" class="btn btn-secondary">
              <Icon name="ri:close-large-fill" size="15"></Icon>
              {{ $t("close") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { accountApi } from "~/constants/api";
  const state = reactive({
    modal: null,
  });

  let productAccountTableHeader = ref([
    {
      label: "product",
      key: "product_name",
      sort: false,
      textAlign: "center",
      headerClasses: " text-center",
      width: "100px",
    },
    {
      label: "user_casino",
      key: "username",
      sort: false,
      textAlign: "center",
      headerClasses: "",
      width: "100px",
    },
    {
      label: "credit",
      key: "credit",
      sort: false,
      width: "100px",
      textAlign: "center",
      classes: "",
      headerClasses: "",
    },
  ]);

  let BankAccountInfoTableHeader = ref([
    {
      label: "bank",
      key: "bank_name",
      sort: false,
      textAlign: "center",
      headerClasses: "name-class",
      classes: "name-class",
    },
    {
      label: "acc_name",
      key: "acc_name",
      sort: false,
      textAlign: "center",
      headerClasses: "name-col",
      classes: "name-col",
    },
    {
      label: "acc_no",
      key: "acc_no",
      sort: false,
      textAlign: "center",
      classes: "name-col",
    },
  ]);

  const productAccount = ref([]);
  const bankInfo = ref([]);
  const accountInfo = ref([]);

  onMounted(() => {
    const bootstrap = useNuxtApp().$bootstrap;
    state.modal = new bootstrap.Modal("#modal");
  });

  const showModal = async (item) => {
    const input = { account_id: item };
    const data = await ifetch(accountApi.getViewAccountDetails, input);
    setInput(data);
    state.modal.show();
  };

  const setInput = (data) => {
    productAccount.value = data.product_list;
    bankInfo.value = data.bank_list;
    accountInfo.value = data;
  };

  defineExpose({
    showModal,
  });
</script>
<style scoped>
  .label-style {
    font-size: 14px !important;
    color: gray !important;
  }

  .data-account {
    font-size: 14px !important;
    font-weight: bold !important;
  }
  tr > th {
    border-bottom: none !important;
  }
</style>
