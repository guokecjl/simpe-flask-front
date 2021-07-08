<template>
    <div>
        <head-top></head-top>
        <div class="table_contain">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                    <!-- <el-table-column
                        type="index"
                        :index="indexMethod">
                    </el-table-column> -->
                    <template slot-scope="props">
                        <el-form>
                            <el-form-item label="店铺名称">
                                <span>{{ props.row.name }}</span> 
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{ props.row.address}}</span>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <span>{{ props.row.phone}}</span>
                            </el-form-item>
                            <el-form-item label="评分">
                                <span> {{ props.row.rating}}</span>
                            </el-form-item>
                            <el-form-item label="销售量">
                                <span>{{ props.row.renct-out}}</span>
                            </el-form-item>
                            <el-form-item label="分类">
                                <span>{{ props.row.category}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="店铺名称" prop="name"></el-table-column>
                <el-table-column label="店铺地址" prop="address"></el-table-column>
                <el-table-column label="店铺介绍" prop="description"></el-table-column>
                <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="success" @click="addFood(scope.$index, scope.row)">添加食品</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" margin-top="10px">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
            
            <el-dialog
            title="修改店铺信息"
            v-model="dialogFormVisible">
            <el-form>
                <el-form-item label="店铺名称">
                    <el-input v-model="selectTable.name" uto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-autocomplete
                    v-model="address.address"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入地址"
                    @select="addressSelect">
                    </el-autocomplete>
                    <span>当前城市：{{ city.name }}</span>
                </el-form-item>
                <el-form-item label="店铺介绍">
                    <el-input v-model="selectTable.description"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="selectTable.phone"></el-input>
                </el-form-item>
                <el-form-item label="店铺分类">
                    <el-cascader
                      :options="categoryOptions"
                      v-model="selectedCategory"
                      change-on-select>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="商铺图片"
                class="avatar-uploader"
                    action="baseUrl + '/v1/addimg/shop'"
                    :show-file-list="false"
                    :on-success="handleServiceAvatarScucess"
                    :before-upload="beforeAvatarUpload">
                    
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getCat3egory,addFood,cityGuess, addShop,deleteResturan,getUserInfo,getAddressById, getResturantsCount,getResturants, searchplace, foodCategory, deleteResturant} from '../api/getData'
    export default{
        data(){
            return{ 
                count: 0,
                city: {},
                address: {},
                currentPage: 1,
                offset: 0,
                limit: 20,
                dialogFormVisible: false,
                tableData: [],
                selectTable: {},
                categoryOptions: [],
                selectedCategory: [],
            }
        },
        components: {
    		headTop,
         },	
        created(){
            this.initData(),
            console.log(1)
        },
        methods: {
            async initData(){
                try {
                    this.city = await cityGuess();
                    const countData = await getResturantsCount();               
                if(countData.status == 1){
                    this.count = countData.count;
                }
                else{
                    throw new error('获取数据失败');
                }
                this.getResturants();    
                }
                catch(err){
                    console.log('获取数据失败');
                }
            },
            //下拉表单数据
            async getResturants(){
                const {latitude, longitude} = this.city;
                const restaurants = await getResturants({latitude, longitude, offset: this.offset, limit: this.limit});
                this.tableData = [];
                restaurants.forEach(item => {
                    const tableData = {};
                    tableData.name = item.name;
                    tableData.address = item.address;
                    tableData.description = item.description;
                    tableData.id = item.id;
                    tableData.phone = item.phone;
                    tableData.rating = item.rating;
                    tableData.recent_order_num = item.recent_order_num;
                    tableData.category = item.category;
                    tableData.image_path = item.image_path;
                    this.tableData.push(tableData);
                })
            },
            //编辑按钮详细地址下拉框
            async querySearchAsync(queryString,cb){
                if(queryString){
                    try{
                        const cityList = await searchplace(this.city.id, queryString);
                        if(cityList instanceof Array){
                            cityList.map(item => {
                                item.value = item.address;
                                return item;
                            })
                            cb(cityList);
                        }
                    }
                    catch(err){
                        console.log(err);
                    }
                }
            },
            //
            async getCategory(){
                try{ 
                    const categories = await foodCategory();
                    categories.forEach(item => {
                        if(item.sub_categories.length){
                            const addnew = {
                                value: item.name,
                                label: item.name,
                                children: [],
                            }
                            item.sub_categories.forEach((subitem, index) => {
                                if (index == 0) {
                                    return
                                }
                                addnew.children.push({
                                    value: subitem.name,
                                    label: subitem.name,
                                })
                            })
                            this.categoryOptions.push(addnew)
                        }
                    })
                }catch(err){
                    console.log('获取商铺种类失败', err);
                }
            },
            //显示当前页码拥有数据条数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //当前页数
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            //点击编辑按钮弹出页面
            handleEdit(index,row){
                this.selectTable = row;
                this.address.address = row.address;
                this.dialogFormVisible = true;
                this.selectedCategory = row.category.split('/')
                if(!this.categoryOptions.length){
                    this.getCategory();
                }
            },
            //添加食品按钮弹出页面
            addFood(index, row){
                this.$router.push({ path: 'addGoods', query: { restaurant_id: row.id }})
            },
            //输出按钮
            async handleDelete(index, row){
                try {
                    const res = await deleteResturant(row, id)
                    if (res.status == 1){
                        this.message ({
                            type: 'success',
                            message: '删除成功',
                        })
                        this.tableData.splice(index, 1);
                    }
                    else{
                        throw new Error(res.message)
                    }
                }
                catch(err){
                    this.$message({
                        type: 'err',
                        message: 'err message',
                    });
                    console.log('删除店铺失败')
                }
            },
            //编辑按钮地址选择下拉菜单
            addressSelect(vale){
                const {address, latitude, longitude} = vale;
                this.address = {address, latitude, longitude};
            },
            //编辑按钮图片上传功能
            beforeAvatarUpload(flie){
                const isRightType = (file.type === '/image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;
                if(!isRightType){
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if(!isLt2M){
                    this.$message.error('上传文件大小不能超过 2M!');
                }
                return isRightType & isLt2M;
            },
            handleServiceAvatarScucess(res,flie){
                if(res.status == 1){
                    this.selectTable.image_path = res.image_path;
                }
                else{
                    this.$message.error('上传图片失败！');
                }
            }
        },
       
    }

</script>
<style lang="less">
    @import '../style/mixin';
    .table_contain{
       padding: 20px;
    }
</style>
