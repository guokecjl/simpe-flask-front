<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <header class="form_header">选择食品种类</header>
	  			<el-form :model="categoryForm" ref="categoryForm" label-width="110px" class="form">
                    <el-row calss="selectAdd">
                        <el-form-item label="食品种类">
                            <el-select v-model="categoryForm.categorySelect" :placeholder="selectValue.label" style="width:100%;">
                                <el-option
							      	v-for="item in categoryForm.categoryList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
                        <div class="add_category">
                            <el-form-item label="食品种类" prop="name">
                                <el-input v-model="categoryForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="种类描述" prop="description">
                                <el-input v-model="categoryForm.description"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('categoryForm')">提交</el-button>
                            </el-form-item>
                        </div>
                    </el-row>
                    <el-row>
                        <div class="addFoods" @click="selectAdd">
                            <i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
                            <i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
                            <span>添加食品种类</span>
                        </div>
                    </el-row>
                </el-form>
                <!-- 添加食品表单 -->
                <header calss="form_header">添加食品</header>
                <el-form calss="form" :model="foodForm" :rules="foodrules" ref="foodForm">
                    <el-form-item label="食品名称" prop="name"></el-form-item>
                    <el-form-item label="食品活动" prop="active"></el-form-item>
                    <el-form-item label="食品详情" prop="description"></el-form-item>
                    <el-form-item label="上传食品图片">
                        <el-upload
                        calss="picture"
                        :action="baseUrl + '/v1/addimg/food'"
                        :show-file-list="false"
						:on-success="uploadImg"
						:before-upload="beforeImgUpload">
                        <img v-if="foodForm.image_path"  :src="baseImgPath + foodForm.image_path" class="avatar">
                        <i v-else  class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="食品特点">
                        <el-select v-model="foodForm.attributes" multiple placeholder="请选择">
                            <el-option
                            v-for="item in attributes"
                            :key="item.value"
						    :label="item.label"
						    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="食品规格">
                        <el-radio v-model="foodSpecs" label="one">单规格</el-radio>
                        <el-radio v-model="foodSpecs" label="more">多规格</el-radio>
                    </el-form-item>
                    <el-row v-if="foodSpecs == 'one'" >
                        <el-form-item label="包装费">
                            <el-input-number v-model="foodForm.specs[0].packing_fee" :min="0" :max="100"></el-input-number>
                        </el-form-item>
                        <el-form-item label="价格">
                            <el-input-number v-model="foodForm.specs[0].price" :min="0" :max="100000"></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row v-else style="overflow: auto; text-align: center;">
                        <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 10px;">
                            添加规格</el-button>
                    </el-row>
                    <el-row v-if="foodSpecs == 'more'">
                        <el-table 
                        :data="foodForm.specs"
                         style="margin-bottom: 20px;"
					    :row-class-name="tableRowClassName">
                            <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 10px;">添加规格</el-button>
                            <el-table-column label="规格" prop="specs"></el-table-column>
                            <el-table-column label="包装费" prop="packing_fee"></el-table-column>
                            <el-table-column label="价格" prop="price"></el-table-column>
                            <el-table-column label="操作">
                                <el-button size="small" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="addFood('foodForm')">确认添加食品</el-button>
                    </el-form-item>
                </el-form>
                <el-dialog title="添加规格" v-model="dialogFormVisible">
                    <el-form :rules="specsFormrules" :model="specsForm">
                        <el-form-item lable="规格">
                            <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="包装费">
                            <el-input  v-model="specsForm.packing_fee" :min="0" :max="100"></el-input>
                        </el-form-item>
                        <el-form-item label="价格">
                            <el-input v-model="specsForm.price" :min="0"></el-input>
                        </el-form-item>
                    </el-form>
                    <!-- <div>
                        <el-button @click="ok" type="primary">确认</el-button>
                        <el-button @click="no = false">取消</el-button>
                    </div> -->
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import headTop from '../components/headTop.vue'
import {getCategory, addCategory, addFood} from '../api/getData'
import {baseUrl, baseImgPath} from '@/config/env'
export default{
    data(){
       return{
           baseUrl,
           baseImgPath,
           restaurant_id: 1,
           categoryForm: {
    			categoryList: [],
    			categorySelect: '',
    			name: '',
    			description: '',
    		},
            showAddCategory: false,
            foodForm: {
                name: '',
    			description: '',
    			image_path: '',
    			activity: '',
    			attributes: [],
    			specs: [{
    				specs: '默认',
			        packing_fee: 0,
			        price: 20,
    			}],
            },
            foodrules:{
                name:[{required: true, message: '请输入食品名称', trigger: 'blur'}]
            },
            attributes:[{
                value: '新',
                lable: '新品',
            },
            {
                value: '招牌',
                lable: '招牌',
            }],
            foodSpecs: 'one',
            dialogFormVisible: false,
            specsForm:{
                specs: '',
                packing_fee: 0,
                price: 20,
            },
            specsFormrules: {
		        specs: [{ required: true, message: '请输入规格', trigger: 'blur'}],
		    },
       }
    },
    components: {
        headTop
    },
    created(){
        if(this.$route.query.restaurant_id){
            this.restaurant_id = this.$route.query.restaurant_id;
        }
        else{
            this,restaurant_id = Math.ceil(Math.random()*10);
        }
        this.$msgbox({
            title:'提示',
            message: '添加食品需要选择一个商铺，现在就去选择一个商铺吗？',
            showCancelButton: true,
		    confirmButtonText: '确定',
		    ancelButtonText: '取消',
            beforClose: (action, instance, done) => {
                if(action === 'confirm'){
                    this.$route.push('/shopList');
                    done();
                }
                else{
                    this.$message({
				        type: 'info',
				        message: '取消'
				    });
                    done();
                }
            }
        })
        this.initData();
    },
    computed:{
        selectValue(){
            return this.categoryForm.categoryList[this.categoryForm.categorySelect]||{}
        }
    },
    methods:{
        async initData(){
            try{
                const result = await getCategory(this.restaurant_id)
                if(result.status = 1){
                    result.category_list.map((item,index) => {
                    item.value = index;
                    item.lable =item.name;    
                    })
                    this.categoryForm.categoryList = result.category_list;
                    console.log(this.categoryForm.categoryList)
                }
                else{
                    console.log(result)
                }
            }
            catch(err){
                console.log('获取数据失败')
            }
        },
        selectAdd(){
            this.showAddCategory = !this.showAddCategory;
        },
        submitForm(){
            this.$refs[categoryForm].validate(async (valid) =>{
                if(valid){
                    const params ={
						name: this.categoryForm.name,
						description: this.categoryForm.description,
						restaurant_id: this.restaurant_id,
					}
                    try{
						const result = await addCategory(params);
						if (result.status == 1) {
							this.initData();
							this.categoryForm.name = '';
							this.categoryForm.description = '';
							this.showAddCategory = false;
							this.$message({
					        	type: 'success',
					            message: '添加成功'
					        });
						}
						}
                    catch(err){
							console.log(err)
					}
                }
                else {
					this.$notify.error({
						title: '错误',
						message: '请检查输入是否正确',
						offset: 100
					});
					return false;
				}
			});            
        },
        uploadImg(res, file){
            if(res.status = 1){
                this.foodForm.image_path = res.image_path;
            }
            else{
               this.$message.error('上传图片失败')
            }
        },
        beforeImgUpload(file){
            const isRightType =  (file.type === 'image/jpeg') || (file.type === 'image/png');
            const isLt2M = file.size === 1024/1024<2;
            if(!isRightType){
                console.log('上传图片是能是jpeg和png格式！')
            }
            if(!isLt2M){
                console.log('上传的图片大小不能超过2M!')
            }
            return isRightType && isLt2M;
        },
        addSpecs(){
            this.foodForm.specs.push({...this.specsForm});
            this.specsForm.specs = '';
            this.specsForm.packing_fee = 0;
            this.specsForm.price = 20;
            this.dialogFormVisible = false;
        },
        handleDelete(){
            this.foodForm.specs.splice(index, 1)
        },
        async addFood(foodForm){
            this.$refs[foodForm].validate(async (valid) => {
                if(valid){
                    const params = {
                        ...this.foodForm,
                        category_id: this.selectValue.id,
                        restaurant_id: this.restaurant_id,    
                    }
                    try{
                        const result = await addFood(params);
                        if(result.status = 1){
                            this.$message({
					            type: 'success',
					            message: '添加成功'
					        });
                            this.foodForm = {
				    			name: '',
				    			description: '',
				    			image_path: '',
				    			activity: '',
				    			attributes: [],
				    			specs: [{
				    				specs: '默认',
							        packing_fee: 0,
							        price: 20,
				    			}],
				    		}
                        }
                        else{
                            this.$message({
                                type: 'err',
                                message: result.message
                            })
                        }
                    }
                    catch(err){
                        console.log(err)
                    }
                }
                else{
                    this.$notify.error({
                        itle: '错误',
						message: '请检查输入是否正确',
						offset: 100
                    })
                }
                return false
            })
        },
    }

}
</script>
<style lang="less">
    @import '../style/mixin';
    .form{
        min-width: 400px;
		margin-bottom: 30px;
        &:hover{
            box-shadow: 0 0 8px 0 rgba(232,237,250,.6)  0 2px 4px 0 rgba(232,237,250,.5);
            border-radius: 6px;
            transform: all 400ms;
        }
    }
    .form_header{
        text-align: center;
		margin-bottom: 10px;
    }
    .selectAdd{
        border: 1px solid #eaeefb;
        padding: 10px 30px 10px 10px;
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
    }
    .addFoods{
        text-align: center;
        line-height: 40px;
        border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #eaeefb;
		border-top: none;
		transition: all 400ms;
		&:hover{
			background: #f9fafc;
			span, .edit_icon{
				color: #20a0ff;
            }
		}
    }
    span{
        .sc(14px, #999);
		transition: all 400ms;
    }
    .edit_icon{
		color: #ccc;
		transition: all 400ms;
	}
    .add_category_row{
        height: 0;
		overflow: hidden;
		transition: all 400ms;
		background: #f9fafc;
    }
    .add_category{
        background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
		border-top: none;
    }
    .showEdit{
        height: 185px;
    }
</style>