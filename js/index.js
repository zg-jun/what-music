$(function () {
    /*加载播放器*/
    var player = new Player({
        audio: getAplayerList(getMusicInfo())
    });
    /*获取歌曲的信息*/
    function getMusicInfo(id = 3778678) {
        var musicInfo = [];
        $.ajax({
            url: 'https://www.dodoblog.cn/api/musics/songList',
            method: 'get',
            contentType: 'application/json;charset=utf-8',
            //  以Payload方式提交s
            data: {
                "pageSize": "20",
                "id": id,
                "format":1
            },
            dataType: "json",
            async: false,
            success: function (res) {
                // console.log(res.data);
                musicInfo = res.data;
            },
            error: function (res) {
                console.log(res);
            }
        });
        return musicInfo;
    }
    /*处理APlayer所需数据*/
    function getAplayerList(data) {
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            var obj = {};
            obj.name = data[i].name;
            obj.artist = data[i].singer;
            obj.url = data[i].url;
            obj.cover = data[i].pic;
            obj.lrc = data[i].lrc;
            arr[i] = obj;
        }
        return arr;
    }
    //获取随机歌单
    function getMusicMenu(callback){
        $.ajax({
            url:"https://api.itooi.cn/music/tencent/hotSongList",
            type:"get",
            data:{
                key:579621905,
                categoryId:10000000,
                sortId:2,
                limit:60
            },
            dataType:"json",
            success:function(res){
                callback&&callback(res);
            }
        });
    }
    //获取自定义区间的随机数
    function getRandomNum(min,max){
        return Math.floor(Math.random()*(max-min)+min);
    }
});