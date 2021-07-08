<template>
    <div>
        <head-top></head-top>
        <div class="table_contain">
            <el-table
            :data="tableData"
            style="width:100%">
                <el-table-column type="expand">
                    <template v-slot="props">
                        <el-form label-position="left">
                            <el-form-item label="食品名称">
                                <span>{{ props.name }}</span>
                            </el-form-item>
                            <el-form-item label="餐馆名称">
                                <span>{{ props.restaurant_name }}</span>
                            </el-form-item>
                            <el-form-item label="食品ID">
                                <span>{{ props.id}}</span>
                            </el-form-item>
                            <el-form-item label="餐馆ID">
                                <span>{{ props.restaurant_id }}</span>
                            </el-form-item>
                            <el-form-item label="食品介绍">
                                <span>{{ props.description }}</span>
                            </el-form-item>
                            <el-form-item label="餐馆地址">
                                <span>{{ props.address }}</span>
                            </el-form-item>
                            <el-form-item label="食品评分">
                                <span>{{ props.rating }}</span>
                            </el-form-item>
                            <el-form-item label="食品分类"> 
                                <span>{{ props.type }}</span>
                            </el-form-item>
                            <el-form-item label="月销量">
                                <span>{{ props.mouth_sales }}</span>
                            </el-form-item>                        
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="食品名称" prop="name"></el-table-column>
                <el-table-column label="食品介绍" prop="description"></el-table-column>
                <el-table-column label="评分" prop="rating"></el-table-column>
                <el-table-column label="操作">
                    <button size="mini">编辑</button>
                    <button size="mini" type="danger">删除</button>
                </el-table-column>

            </el-table>
            <div class="pagination">
                <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page="currentPage"
                :page-size="20"
                layout="prev, pager, next"
                :total="count">
                </el-pagination>
            </div>
            <el-dialog title="修改页面数据" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="食品名称">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="食品介绍">
                        <el-input v-model="selectTable.decription"></el-input>
                    </el-form-item>
                    <el-form-item label="食品分类">
                        <el-input v-model="selectTable.Index" :placeholder="selectMenu.label" @change="handleSelect">
                             <el-option
						      v-for="item in menuOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.index">
						    </el-option>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="食品图片">
                        <el-upload
                        class="avatar-uploader"
                        :action="baseUrl + '/v1/addimg/food'"
                        show-file-list="false"
                        :on-success="handleServiceAvatarScucess"
                        :before-upload="beforeAvatarUpload">
                            <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <el-row style="overflow: auto; text-align: center">
                    <el-table>
                        <el-table-column prop="specs" label="规格"></el-table-column>
                        <el-table-column prop="packing_fee" label="包装费"></el-table-column>
                        <el-table-column prop="price" label="价格"></el-table-column>
                        <el-table-column label="操作" @click="handleEdit(scope.row)">.
                            <template v-slot="scope">
                                <el-button type="danger" size="mini" @click="deleteSpecs(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" @click="specsFormVisible = true" style="margin-bottom: 10px;">添加规格</el-button>
                </el-row>
                <div slot="footer" class="dialog_footer">
                    <el-button type="primary" @click="updateFood">确定</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </div>
            </el-dialog>
            <!-- 添加规格 -->
            <el-dialog title="添加规格" v-model="specsFormVisible">
                <el-form :rules="specsFormrules" :model="specsForm">
                <el-form-item label="规格" prop="specs">
                    <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="包装费">
                    <el-input-number v-model="specsForm.packing_fee" :min="0" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input-number v-model="specsForm.price" :min="0" :max="10000"></el-input-number>
                </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
			        <el-button @click="specsFormVisible = false">取 消</el-button>
			        <el-button type="primary" @click="addspecs">确 定</el-button>
			    </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import headTop from '../components/headTop'
import {deleteFood, getCategory, getFoods, getMenu, getResturantDetail, updateFood} from '../api/getData.js'
import  {baseUrl, baseImgPath} from '../config/env'
export default {
    data(){
       return{
           baseUrl,
           baseImgPath,
           restaurant_id: null,
           city: {},
           offset: 0,
           limit: 20,
           count: 0,
           tableData: [],
           currentPage: 1,
           selectTable: {},
           dialogFormVisible: false,
           menuOptions: [],
           selectMenu: {},
           selectIndex: null,
           specsForm: {
		        specs: '',
		        packing_fee: 0,
		        price: 20,
		    },
            specsFormrules: {
		        specs: [
					{ required: true, message: '请输入规格', trigger: 'blur' },
				],
		    },
            specsFormVisible: false,
            expendRow: [],
        }
    },
    components: {headTop},
    created(){
        this.restaurant_id = this.$route.query.restaurant_id;
        this.initData();
    },
    computed:{
        specs: function(){
            let specs = [];
            if(this.selectTable.specfoods){
                this.selectTable.specfoods.foreach(item =>{
                    specs.push({
                        specs: item.specs_name,
	        			packing_fee: item.packing_fee,
	        			price: item.price,
                    })
                })
            }
            return specs
        }
    },
    methods: {
        async initData(){
            try{
                const countData = await getFoodsCount({restaurant_id: this.restaurant_id});
                if(countData.status == 1){
                    this.count = countData.count
                }else{
                    throw new error('获取数据失败');
                }
                this.getFoods();
            }
            catch (err){
                console.log('获取数据失败')
            }
        },
        async getMenu(){
            this.menuOptions = [];
            try {
                const menu = await getMenu({restaurant_id: this.selectTable.restaurant_id, allMenu: true})
                    menu.foreach((item,index) => {
                         this.menuOptions.push({
                        	label: item.name,
                        	value: item.id,
                        	index,
                    })
                })
            }
            catch (err){
                console.log('获取数据失败')
            }
      },
        async getFoods(){
            const foods = await getFoods({offset: this.offset, limit: this.limit, restaurant_id: this.restaurant_id});
            this.tableData = [];
            Foods.foreach((index, item) => {
                const tableData = {};
                tableData.name = item.name;
                tableData.id = item.id;
                tableData.description = item.description;
                tableData.address = item.address;
                tableData.rating = item.rating;
                tableData.mouth_sales = item.mouth_sales;
                tableData.restaurant_id = item.restaurant_id;
                tableData.category_id = item.restaurant_id;
                tableData.image_path = item.image_path;
                tableData.specfoods = item.specfoods;
                tableData.index = index;
                this.tableData.push(tableData);
            })
        },
        tableRowClassName(row, index){
            if (index === 1) {
		        return 'info-row';
		    }
            else if (index === 3) {
		        return 'positive-row';
		    }
		    return '';
        },
        handleCurrentChange(val){
            console.log(`每页 ${val} 页`)
        },
        handleSizeChange(val){
            this.currentPage = val;
            this.offset = this.limit*(val - 1);
            this.getFoods();
        },
        addspecs(){
            this.specs.push(...this.specsForm);
            this.specsForm.specs = '';
            this.specsForm.packing_fee = 0;
            this.specsForm.price = 20;
            this.specsFormVisible = false;
        },
        expand(row, status){
            if(status = 1){
                this.getSelectItemData(row)
            }
            else{
                const index = this.expendRow.indexOf(row.index);
                this.expandRow.spalice(index,1)
            }
        },
        handleEdit(row){
            this.getSelectItemData(row, 'eidit');
            this.dialogFormVisible = true;
        },
        async  getSelectItemData(row, type){
            const restaurant = await getResturantDetail(row.restaurant_id);
            const category  = await getCategory(row.category_id);
            this.selectTable = {...row, ...{restaurant_name: restaurant.name, restaurant_address: restaurant.address, category_name: category.name}};

            this.selectMenu = {label: category.name, value: row.category_id}
            this.tableData.splice(row.index, 1, {...this.selectTable});
            this.$nextTick(() => {
                this.expendRow.push(row.index);
            })
            if (type == 'edit' && this.restaurant_id != row.restaurant_id) {
                this.getMenu();
            }   
        },
        handleSelect(index){
            this.selectIndex = index;
            this.selectMenu = this.menuOptions[index];
        },
        async handleDelet(index, row){
            try {
                const res = await deleteFood(row.item_id);
                if(res.status == 1){
                    this.$message({
                        type:'success',
                        message: '删除成功'
                    });
                    this.tableData.spalice(index, 1);
                }
                else {
                    throw new err(res.message)
                }
            }
            catch(err){
                console.log('获取数据失败')
            }
        },
        handleServiceAvatarScucess(res,file){
            if(res.status = 1){
                this.selectTable.image_path = res.image_path
            }
            else{console.log('获取图片失败')}
        },
        beforeAvatarUpload(flie){
            const isRightType = (file.type === 'image/jpeg')||(file.type === 'image/png')
            const isLt2M = file.size/ 1024 / 1024 < 2;
            if (!isRightType){
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if(!isLt2M){
                this.$message.error('上传图片不能超过2M!')
            }
            return isRightType && isLt2M
        },
        async updateFood(){
            this.dialogFormVisible = false;
            try {
                const subData = {new_category_id: this.selectMenu.value, specs:this.specs}
                const postData = {...this.selectTable, ...subData};
                const res = await updateFood(postData)
                if(res.status = 1){
                    this.$message({
                        type:'success',
                        message: '更新食物数据成功'
                    })
                    this.getFoods();
                }
                else{
                     this.$message({
                        type: 'error',
                        message: res.message
                        });
                }
            }
            catch(err){
                console,log('更新餐馆数据失败');
            }
        }
    }
    
}

</script>
<style lang="less">
@import  '../style/mixin';
</style>