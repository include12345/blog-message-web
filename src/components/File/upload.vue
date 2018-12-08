<template>
    <el-upload
        class="upload-demo"
        :action="action"
        :limit="limit"
        :drag="enableDrag"
        :on-success="successInfo"
        :on-error="erroInfo"
        :headers="setHeaders"
        :before-upload="limitCheck"
        :file-list="fileList">
        <i class="el-icon-upload" v-if="enableDrag"></i>
        <div class="el-upload__text" v-if="enableDrag">将文件拖到此处，或<em>点击上传</em></div>
        <el-button v-if="!enableDrag" size="mini" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">{{notice}}</div>
    </el-upload>    
</template>

<script>
  import {getToken} from '@/utils/auth'
  export default {
    props: {
        notice:{
            type:String,
            default:"",
        },
        limit:{
            default:1,
        },
        reUrl:{
            type:String,
            default:"",
        },
        fileType:{
            type:String,
            default:"",
        },
        fileSize:{
            default:10485760,
        },
        clear:{
            default:false,
        },
        enableDrag:{
            default:false,
        },
        showList:{
            default:true,
        },
    },
    name:"VueUpload",
    data() {
      return {
        action: process.env.BASE_API + '/api/sendFileToOss',
        fileLimit: [],
        fileList:[],
        setHeaders:{
           'token': getToken() + '-sendFileToOss',
        }
      };
    },
    watch:{
        clear:function(){
            this.fileList=[];
        },
    },
    methods: {
      successInfo(res,file,fileList) {
          res=res.replace("-internal","");
          this.$emit('getUrl',res);
          this.$emit('getFileName',res,file.name);
          if(this.showList===false)
            this.fileList=[];
      },
      erroInfo(){
          this.$message({
                    message: '页面过期，请刷新页面',
                    type: 'error',
                    duration: 2000
                });
      },
      limitCheck(file){
          var typeCheck = false;
          var testmsg = file.name.substring(file.name.lastIndexOf('.')+1);
          for(var limit in this.fileLimit){
              if(testmsg === this.fileLimit[limit]||this.fileLimit[limit] === 'all')
                typeCheck=true;
          }
          const sizeCheck = file.size < this.fileSize;
          if(!sizeCheck){
              this.$message({
                    message: '文件大小超过限制！',
                    type: 'error',
                    duration: 1000
                });
          }
          if(!typeCheck){
              this.$message({
                    message: '文件类型错误！',
                    type: 'error',
                    duration: 1000
                });
          }
          return sizeCheck && typeCheck;
      },
    },
    created(){
        this.fileLimit = this.fileType.split(' ')
    }
  }
</script>