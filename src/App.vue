<template>
    <div id="app">
        <mt-header fixed title="硬件功能测试"></mt-header>
        <mt-button @click.native="startHacking" type="default" size="large" class="mt">弹出框</mt-button>
        <mt-button @click.native="takeCarmera" type="primary" size="large" class="mt">照相</mt-button>
        <mt-button @click.native="scanBarCode" type="primary" size="large" class="mt">扫一扫</mt-button>
        <div id="cameraRes" v-if="takePic">
            <img :src="picUrl" ref="takeImg" class="mt" style="width: 100%;">
        </div>
        <div id="scanRes" v-if="scanCode" v-text="codeResult"></div>
        <div v-text="errCode"></div>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                takePic:false,
                scanCode:false,
                picUrl:'',
                codeResult:'',
                errCode:''
            }
        },
        methods: {
            startHacking () {
                this.$toast('It Works!')
            },
            takeCarmera(){
              var that=this;

                Vue.cordova.camera.getPicture(function (imageData) {
//                    var image = document.getElementById('takeImg');
//
//                    alert(image);
//
//                    var imgObj=that.$refs.takeImg;
//                    alert(imgObj);
//                    imgObj.src = "data:image/jpeg;base64," + imageData;
                    that.takePic=true;
                    that.picUrl="data:image/jpeg;base64," + imageData;
                }, function (err) {
                    that.errCode=err;
                }, {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 800,
                    targetHeight: 800,
                });
            },
            scanBarCode(){
                var that=this;

                Vue.cordova.barcodeScanner.scan(
                    function (result) {
                        that.scanCode=true;
                        var resContext='result.text:'+result.text+'\n'+'result.format:'+result.format+'\n'+'Cancelled:'+result.cancelled;
//                        alert("We got a barcode\n" +
//                            "Result: " + result.text + "\n" +
//                            "Format: " + result.format + "\n" +
//                            "Cancelled: " + result.cancelled);
                        that.codeResult=resContext;

                    },
                    function (err) {
                        //alert("Scanning failed: " + error);
                        that.errCode=err;
                    }
                );
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
    .mt{
        margin-top: 10px;
    }
</style>
