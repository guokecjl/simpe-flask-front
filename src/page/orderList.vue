<template>
    <div>
        <head-top></head-top>
        <div class="table">
            <el-table 
            :data="tableData" 
            style="width: 100%" 
            @expend="expand" 
            :row-key="row=> row.index" 
            :expand-row-keys="expandRow">
                <el-table-column type="expand">
                    <template v-slot="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="用户名">
                            <span>{{ props.row.user_name }}</span>
                        </el-form-item>
                        <el-form-item label="店铺名称">
                            <span>{{ props.row.restaurants_name }}</span>
                        </el-form-item>
                        <el-form-item label="收货地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="店铺id">
                            <span>{{ props.row.restaurant_id }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                            <span>{{ props.row.restaurant_address }}</span>
                        </el-form-item>
                    </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="订单id" prop="id"></el-table-column>
                <el-table-column label="总价格" prop="total_amount"></el-table-column>
                <el-table-column label="订单状态" prop="status"></el-table-column>
            </el-table>
            <div class="pagination" style="margin-top:10px">
                <el-pagination
                @size-change="handleSizeChange"
                @current-page="handleCurrentPage"
                :current-page="currentPage"
                :page-size="20"
                layout="total,prev,pager,next"
                :total="count"></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import headTop from '../components/headTop'
import {getOrderList, getOrderCount,getResturantDetail, getUserInfo, getAddressById} from '@/api/getData.js'
export default{
    data(){
        return {
            tableData: [],
            count: 0,
            offset: 0,
            limit: 20,
            currentPage: 1,
            restaurant_id: null,
            expandRow: [],
        }
    },
    
    components:{
        headTop
    },
    created(){
        this.restaurant_id = this.$route.query.restaurant_id;
        this.initData()
    },
    methods:{
        async initData(){
            try {
                const countData = await getOrderCount({
                    restaurant_id : this.restaurant_id
                });
                if(countData.status == 1){
                    this.count = countData.count;
                }
                else {throw new err('获取数据失败')};
                this.getOrders();
            }
            catch(err){ '获取数据失败' }
        },
        handleSizeChange(val){
            console.log(`每页 ${val} 条`);
        },
        handleCurrentPage(val){
            this.currentPage = val;
            this.offset = (val - 1)*this.limit;
            this.getOrders();
        },
        async getOrders(){
            const Orders = await getOrderList({offset:this.offset, limit:this.limit, restaurant_id: this.restaurant_id})
            this.tableData = [];
            Orders.forEach((item,index) => {
                const tableData = {};
                tableData.id = item.id;
                tableData.total_amount = item.total_amount;
                tableData.status = item.status_bar.title;
                tableData.user_id = item.user_id;
 				tableData.restaurant_id = item.restaurant_id;
 				tableData.address_id = item.address_id;
                tableData.index = index;
                this.tableData.push(tableData);
            });
        },
        async expand(row, status){
            if(status){
                const restaurant = await getResturantDetail(row.restaurant_id);
                const userInfo = await getUserInfo(row.user_id);
                const addressInfo = await getAddressById(row.address);
                this.tableData.splice(row.index,1, {... row, ...{
                    restaurant_name: restaurant.name, restaurant_address: restaurant.address, address: addressInfo.address, user_name: userInfo.username}}) 
                this.$nextTick(() =>{
                    this.expandRow.push(row.index);
                })
            }
            else{
                const index = this.expandRow.indexOf(row.index);
                this.expandRow.splice(index,1);
            }
        },
    }
}
</script>
<style lang="less">
    @import '../style/mixin';
    .table{
        padding: 20px;
    }
    .demo_table_expand{
        margin-right: 0;
	    margin-bottom: 0;
	    width: 50%;
    }
</style>