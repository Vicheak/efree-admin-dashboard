<template>
     <div>
          <IFormHeader
               :title="props.title"
               :titleIcon="props.titleIcon"
               :buttonRefresh="props.buttonRefresh"
               :buttonAdd="props.buttonAdd"
               :buttonExcel="props.buttonExcel"
               :buttonPrint="props.buttonPrint"
               :enableFilter="props.enableFilter"
               :enableSort="props.enableSort"
               :sortBy="props.sortBy"
               :sortType="props.sortType"
               @refreshClick="emit('refreshClick')"
               @addClick="emit('addClick')" 
               @paginationClick="emit('paginationClick')" 
               @sortChange="emit('sortChange')" 
               @resetFilterClick="emit('resetFilterClick')"
               @filterClick="emit('filterClick')"
               @searchInput="emit('searchInput')"
               @excelClick="emit('excelClick')"
               @printClick="emit('printClick')"
          ></IFormHeader>
          <IFormTable
               :tableHeader="props.tableHeader"
               :tableData="props.tableData"
          >
               <!-- <template v-for="slot in props.tableHeader" v-slot:[slot]="row">
                    <slot :name="slot.key" v-bind="row"></slot>
               </template> -->
               <slot name="code"></slot>
          </IFormTable>    
     </div>
</template>

<script setup>
     import IFormHeader from '~/components/iComponents/IFormHeader'
     import IFormTable from '~/components/iComponents/IFormTable'
     
     const emit = defineEmits([
          'refreshClick', 
          'addClick', 
          'paginationClick', 
          'sortChange', 
          'resetFilterClick',
          'filterClick',
          'searchInput',
          'excelClick',
          'printClick'
     ])

     const props = defineProps({
          title: {
               type: String,
               default: 'Header'
          },
          titleIcon: {
               type: String,
               default: '',
          },
          buttonRefresh: {
               type: Boolean,
               default: true,
          },
          buttonAdd: {
               type: Boolean,
               default: false,
          },
          buttonExcel: {
               type: Boolean,
               default: false,
          },
          buttonPrint: {
               type: Boolean,
               default: false,
          },
          enableFilter: {
               type: Boolean,
               default: false,
          },
          enableSort: {
               type: Boolean,
               default: false,
          },
          filter: {
               type: Object,
               default() {
                    return {
                         txt_src: null,
                    }
               },
          },
          sortBy: {
               type: String,
               default: null,
          },
          sortType: {
               type: String,
               default: 'desc',
          },
          tableHeader: {
               type: Array,
               default: () => {
                    return []
               },
          },
          tableData: {
               type: Array,
               default: [],
          },
     })

</script>
