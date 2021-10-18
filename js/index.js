$(function () {
    /*加载播放器*/
    var player = new Player({
        audio: getAplayerList(getMusicInfo())
    });
    /*获取歌曲的信息*/
    function getMusicInfo () {
        var musicInfo = [];
        $.ajax({
            url: 'https://whatblog.cn/mapi/playlist/detail',
            method: 'get',
            contentType: 'application/json;charset=utf-8',
            //  以Payload方式提交
            data: {
                id:3778678
            },
            dataType: "json",
            async: false,
            success: function (res) {
                musicInfo = res.playlist.tracks;
            },
            error: function (res) {
                console.log(res);
            }
        });
        return musicInfo;
    }
    /*处理APlayer所需数据*/
    function getAplayerList (data) {
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            var obj = {};
            obj.name = data[i].name;
            obj.artist = data[i].ar[0].name;
            obj.url = `https://whatblog.cn/mapi/song/url?id=${data[i].id}`;
            obj.cover = data[i].al.picUrl;
            obj.lrc = `https://whatblog.cn/mapi/lyric?id=${data[i].id}`;
            arr[i] = obj;
        }
        return arr;
    }
});