<<template>
  <el-container>
      <el-upload ref="upload" 
      drag
      :action="actions"
      :data="data"
      :headers="setHeaders"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="uploadSuccess"
      :on-error="uploadFail"
      :file-list="fileList"
      :before-upload="beforeAvatarUpload"
      :auto-upload="false"
      :multiple="false"
      :limit=1>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
      <div slot="tip" class="el-upload__tip">只能上传.xlsx文件，且不超过1MB</div>
      </el-upload>
       <div><el-button style="margin-left:50px" size="small" type="success" @click="submitUpload">执行</el-button></div>
  </el-container>
</template>


<script>
export default {
  name: 'UploadLayout',
  data() {
    return{
         actions:this.action,
         fileList: [],
         setHeaders:{
           'token':this.token
        }
    } 
  },
  props:['action','token', 'data'],
 
  methods: {
      submitUpload() {
         
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file.response);
      },
      uploadSuccess(res,file,fileList){
        console.log(this.actions);
        console.log(this.setHeaders);
          console.log(res);
          console.log(file);
          console.log(fileList);
        // if(file.response!=""){
          this.$emit('listenToChildEvent',res)
        // } 
     },
     uploadFail(res,file,fileList){
            console.log(res);
     },
     beforeAvatarUpload(file) {
         console.log(file)
         if((file===null) ||(file.name.indexOf(".xlsx")<1)){
           this.$message({
            message: '文件格式有问题或文件为空',
            type: 'warning',
            duration: 3000
            })
            return;
         }
      }
  }
      
}
</script>
