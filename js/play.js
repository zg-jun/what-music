var Player = function (data) {
    this.data = data ? data.audio : [];
    this.audio = document.createElement("audio");
    this.box = document.createElement("div");
    this.imgBg = document.createElement("div");
    this.ctrlBg = document.createElement("div");
    this.img = document.createElement("img");
    this.play = document.createElement("i");
    this.leftPlay = document.createElement("i");
    this.rightPlay = document.createElement("i");
    this.musicList = document.createElement("i");
    this.musicShow = document.createElement("i");
    this.progressT = document.createElement("div");
    this.progressB = document.createElement("div");
    this.musicName = document.createElement("div");
    this.singerName = document.createElement("div");
    this.progressB = document.createElement("div");
    this.listBox = document.createElement("div");
    this.listTtxt = document.createElement("span");
    this.lrcTxt = document.createElement("div");
    this.mIndex = 0;//当前音乐索引
    this.flag = true;//判断是否播放
    this.timer = null;//定时器
    //初始化调用
    this.init();
}
//初始化
Player.prototype.init = function () {
    document.body.appendChild(this.audio);
    this.createBox();
    this.createImgBg();
    this.createImg();
    this.createCtrlBg();
    this.createPlay();
    this.createTxt();
    this.createProgress();
    this.playPause();//播放
    this.getMusicList();
    this.getMusicInfo();
    this.createLrc();
}
//创建容器
Player.prototype.createBox = function () {
    document.body.appendChild(this.box);
    this.box.style.width = "600px";
    this.box.style.height = "100px";
    this.box.style.position = "absolute";
    this.box.style.bottom = "0";
    this.box.style.left = "50%";
    this.box.style.marginLeft = "-300px";
    this.box.style.zIndex = "999";
    this.box.style.boxShadow = "0 0 20px -5px gray";
}
//创建图片背景容器
Player.prototype.createImgBg = function () {
    this.box.appendChild(this.imgBg);
    this.imgBg.style.width = 1 / 6 * 100 + "%";
    this.imgBg.style.height = "100%";
    this.imgBg.style.cssFloat = "left";
    this.imgBg.style.position = "relative";
    this.imgBg.addEventListener("mouseenter", function () {
        this.play.style.display = "block";
    }.bind(this));
    this.imgBg.addEventListener("mouseleave", function () {
        this.play.style.display = "none";
    }.bind(this));
}
//创建控件容器
Player.prototype.createCtrlBg = function () {
    this.box.appendChild(this.ctrlBg);
    this.ctrlBg.style.width = 5 / 6 * 100 + "%";
    this.ctrlBg.style.height = "100%";
    this.ctrlBg.style.cssFloat = "left";
    this.ctrlBg.style.position = "relative";
    this.ctrlBg.style.background = "#fff";
    this.ctrlBg.addEventListener("mouseenter", function () {
        this.progressB.style.opacity = "1";
    }.bind(this));
    this.ctrlBg.addEventListener("mouseleave", function () {
        this.progressB.style.opacity = "0";
    }.bind(this));
}
//创建图片
Player.prototype.createImg = function () {
    this.imgBg.appendChild(this.img);
    this.img.style.width = "100%";
    this.img.style.height = "100%";
    this.img.style.verticalAlign = "middle";
}
//创建按钮
Player.prototype.createPlay = function () {
    var listFlag = true, lrcFlag = true;
    //播放按钮
    this.imgBg.appendChild(this.play);
    this.play.style.position = "absolute";
    this.play.style.fontSize = "40px";
    this.play.style.color = "#fff";
    this.play.style.top = "50%";
    this.play.style.left = "50%";
    this.play.style.cursor = "pointer";
    this.play.style.marginLeft = "-20px";
    this.play.style.marginTop = "-20px";
    this.play.style.display = "none";
    this.play.style.transition = "color 0.3s linear";
    this.play.className = "fa fa-play-circle-o";
    this.play.setAttribute("aria-hidden", "true");
    //上一曲按钮
    this.ctrlBg.appendChild(this.leftPlay);
    this.leftPlay.style.position = "absolute";
    this.leftPlay.style.fontSize = "20px";
    this.leftPlay.style.color = "gray";
    this.leftPlay.style.top = "50%";
    this.leftPlay.style.right = "100px";
    this.leftPlay.style.color = "gray";
    this.leftPlay.style.cursor = "pointer";
    this.leftPlay.style.marginTop = "-10px";
    this.leftPlay.className = "fa fa-chevron-left";
    this.leftPlay.setAttribute("aria-hidden", "true");
    //下一曲按钮
    this.ctrlBg.appendChild(this.rightPlay);
    this.rightPlay.style.position = "absolute";
    this.rightPlay.style.fontSize = "20px";
    this.rightPlay.style.color = "gray";
    this.rightPlay.style.top = "50%";
    this.rightPlay.style.right = "60px";
    this.rightPlay.style.color = "gray";
    this.rightPlay.style.cursor = "pointer";
    this.rightPlay.style.marginTop = "-10px";
    this.rightPlay.className = "fa fa-chevron-right";
    this.rightPlay.setAttribute("aria-hidden", "true");
    //列表按钮
    this.ctrlBg.appendChild(this.musicList);
    this.musicList.style.position = "absolute";
    this.musicList.style.fontSize = "20px";
    this.musicList.style.color = "gray";
    this.musicList.style.top = "50%";
    this.musicList.style.right = "20px";
    this.musicList.style.color = "gray";
    this.musicList.style.cursor = "pointer";
    this.musicList.style.marginTop = "-10px";
    this.musicList.className = "fa fa-bars";
    this.musicList.setAttribute("aria-hidden", "true");
    //显示/隐藏播放列表
    this.musicList.addEventListener("click", function () {
        if (listFlag) {
            this.listBox.style.height = "300px";
            this.lrcTxt.style.opacity = "0";
            listFlag = false;
            lrcFlag = true;
        } else {
            this.listBox.style.height = "0px";
            listFlag = true;
            lrcFlag = true;
        }
    }.bind(this));
    //音乐展示按钮
    this.ctrlBg.appendChild(this.musicShow);
    this.musicShow.style.position = "absolute";
    this.musicShow.style.fontSize = "20px";
    this.musicShow.style.color = "gray";
    this.musicShow.style.top = "50%";
    this.musicShow.style.right = "140px";
    this.musicShow.style.color = "gray";
    this.musicShow.style.cursor = "pointer";
    this.musicShow.style.marginTop = "-10px";
    this.musicShow.className = "fa fa-headphones";
    this.musicShow.setAttribute("aria-hidden", "true");
    //显示/隐藏歌词
    this.musicShow.addEventListener("click", function () {
        if (lrcFlag) {
            this.lrcTxt.style.opacity = "1";
            this.listBox.style.height = "0px";
            lrcFlag = false;
            listFlag = true;
        } else {
            this.lrcTxt.style.opacity = "0";
            lrcFlag = true;
            listFlag = true;
        }
    }.bind(this));
}
//创建文字
Player.prototype.createTxt = function () {
    //歌曲名
    this.ctrlBg.appendChild(this.musicName);
    this.musicName.style.width = "200px";
    this.musicName.style.position = "absolute";
    this.musicName.style.fontSize = "16px";
    this.musicName.style.top = "30px";
    this.musicName.style.left = "50px";
    this.musicName.style.color = "gray";
    this.musicName.style.fontWeight = "bolder";
    this.musicName.style.overflow = "hidden";
    this.musicName.style.whiteSpace = "nowrap";
    this.musicName.style.textOverflow = "ellipsis";
    //歌手名
    this.ctrlBg.appendChild(this.singerName);
    this.singerName.style.width = "200px";
    this.singerName.style.position = "absolute";
    this.singerName.style.fontSize = "13px";
    this.singerName.style.top = "54px";
    this.singerName.style.left = "50px";
    this.singerName.style.color = "gray";
    this.singerName.style.overflow = "hidden";
    this.singerName.style.whiteSpace = "nowrap";
    this.singerName.style.textOverflow = "ellipsis";
}
//创建进度条
Player.prototype.createProgress = function () {
    this.box.appendChild(this.progressB);
    this.box.appendChild(this.progressT);
    //进度背景
    this.progressB.style.width = 5 / 6 * 100 + "%";
    this.progressB.style.height = "3px";
    this.progressB.style.backgroundColor = "#ccc";
    this.progressB.style.position = "absolute";
    this.progressB.style.top = "0";
    this.progressB.style.left = 1 / 6 * 100 + "%";
    this.progressB.style.opacity = "0";
    this.progressB.style.cursor = "pointer";
    //已经播放进度
    this.progressT.style.width = "0";
    this.progressT.style.height = "3px";
    this.progressT.style.backgroundColor = "#5CD6D6";
    this.progressT.style.position = "absolute";
    this.progressT.style.top = "0";
    this.progressT.style.left = 1 / 6 * 100 + "%";
    this.progressT.style.cursor = "pointer";
    //显示隐藏进度条
    this.progressB.addEventListener("mouseenter", function () {
        this.style.opacity = "1";
    });
    this.progressB.addEventListener("mouseleave", function () {
        this.style.opacity = "0";
    });
    //调整进度
    var that = this;
    this.progressB.addEventListener("click", function (e) {
        that.audio.currentTime = that.audio.duration * e.offsetX / this.offsetWidth;
    });
    this.progressT.addEventListener("click", function (e) {
        that.audio.currentTime = that.audio.duration * e.offsetX / that.progressB.offsetWidth;
    });
}
//按钮事件
Player.prototype.playPause = function () {
    //播放的方法
    var changeListBg = function () {
        var liEle = this.listBox.querySelectorAll("li");
        liEle.forEach(function (item, index) {
            item.style.backgroundColor = "";
        });
        liEle[this.mIndex].style.backgroundColor = "rgba(0,0,0,0.1)";
    }.bind(this);
    var playAction = function () {
        this.audio.play();
        this.showProgress();
        this.play.className = "fa fa-pause-circle-o";
    }.bind(this);
    //播放暂停
    this.play.addEventListener("click", function () {
        if (this.flag) {
            playAction();//播放            
            this.flag = false;
        } else {
            this.audio.pause();
            clearInterval(this.tm);
            this.play.className = "fa fa-play-circle-o";
            this.flag = true;
        }
    }.bind(this));
    //上一曲
    this.leftPlay.addEventListener("click", function () {
        this.mIndex--;
        this.mIndex < 0 && (this.mIndex = this.data.length - 1);
        this.getMusicInfo();//重新获取路径
        this.flag == false && playAction();//播放
        changeListBg();
    }.bind(this));
    //下一曲
    this.rightPlay.addEventListener("click", function () {
        this.mIndex++;
        this.mIndex > this.data.length - 1 && (this.mIndex = 0);
        this.getMusicInfo();//重新获取路径
        this.flag == false && playAction();//播放
        changeListBg();
    }.bind(this));

    //按钮样式
    this.play.addEventListener("mouseenter", function () {
        this.style.color = "#5CD6D6";
    });
    this.play.addEventListener("mouseleave", function () {
        this.style.color = "#fff";
    });
    this.leftPlay.addEventListener("mouseenter", function () {
        this.style.color = "#5CD6D6";
    });
    this.leftPlay.addEventListener("mouseleave", function () {
        this.style.color = "gray";
    });
    this.rightPlay.addEventListener("mouseenter", function () {
        this.style.color = "#5CD6D6";
    });
    this.rightPlay.addEventListener("mouseleave", function () {
        this.style.color = "gray";
    });
    this.musicShow.addEventListener("mouseenter", function () {
        this.style.color = "#5CD6D6";
    });
    this.musicShow.addEventListener("mouseleave", function () {
        this.style.color = "gray";
    });
    this.musicList.addEventListener("mouseenter", function () {
        this.style.color = "#5CD6D6";
    });
    this.musicList.addEventListener("mouseleave", function () {
        this.style.color = "gray";
    });
}
//显示进度
Player.prototype.showProgress = function () {
    //当播放位置发生变化触发
    var prevLrc;//记录上一句歌词
    this.audio.addEventListener("timeupdate", function () {
        //当歌曲结束
        if (this.audio.ended) {
            this.mIndex++;
            this.mIndex > this.data.length - 1 && (this.mIndex = 0);
            this.getMusicInfo();//重新获取路径
            this.audio.play();
        }
        // 当前进度/总进度=当前时长/总时长
        var nowProgress = this.audio.currentTime / this.audio.duration;
        var width = this.progressB.offsetWidth;
        this.progressT.style.width = width * nowProgress + "px";
        //歌词滚动
        var lrcBox = this.lrcTxt.querySelector("ul"), lrcLi = lrcBox.querySelectorAll("li");
        lrcLi.forEach(function (item, index) {
            if (Math.round(this.audio.currentTime) == item.getAttribute("index")) {
                if (prevLrc && prevLrc != item) {
                    prevLrc.style.color = "#fff";
                    prevLrc.style.fontSize = "16px";
                }
                prevLrc = item;
                item.style.transition = "all 0.3s linear";
                item.style.color = "#5CD6D6";
                item.style.fontSize = "20px";
                lrcBox.style.transform = "translateY(" + (-item.offsetTop) + "px)";
            }
        }.bind(this));
    }.bind(this));
}
//获取歌曲信息
Player.prototype.getMusicInfo = function () {
    if (!this.data.length > 0) return false;
    //检测音乐是否损坏
    this.checkMusicError();
}
//生成歌曲列表
Player.prototype.getMusicList = function () {
    if (!this.data) return;
    this.box.appendChild(this.listBox);
    this.listBox.style.position = "absolute";
    this.listBox.style.left = "0";
    this.listBox.style.bottom = "100px";
    this.listBox.style.width = "100%";
    this.listBox.style.height = "0px";
    this.listBox.style.zIndex = "999";
    this.listBox.style.overflow = "hidden";
    this.listBox.style.transition = "all 0.3s linear";
    //列表头
    var listT = document.createElement("div");
    this.listBox.appendChild(listT);
    listT.style.width = "100%";
    listT.style.height = "30px";
    listT.style.lineHeight = "30px";
    listT.style.textAlign = "center";
    listT.style.background = "#5CD6D6";
    listT.innerText = "热歌榜";
    //头部标题
    listT.appendChild(this.listTtxt);
    this.listTtxt.style.fontSize = "12px";
    this.listTtxt.innerText = "(" + this.data.length + "首)";
    //列表内容
    var listB = document.createElement("div");
    this.listBox.appendChild(listB);
    listB.style.width = "100%";
    listB.style.height = "270px";
    listB.style.fontSize = "14px";
    listB.style.overflowY = "auto";
    listB.style.backgroundColor = "rgba(255,255,255,0.5)";
    //遍历列表
    var listEle = "<ul>";
    for (var i = 0; i <= this.data.length - 1; i++) {
        listEle += "<li><span style='float:left'>" + (this.data[i].name ? this.data[i].name : "未知") + "</span><span style='float:right'>" + (this.data[i].artist ? this.data[i].artist : "未知") + "</span></li>";
    }
    listEle += "</ul>";
    listB.innerHTML = listEle;
    var liEle = listB.querySelectorAll("li");
    liEle.forEach(function (item, index) {
        item.index = index;
        item.style.padding = "0 10px";
        item.style.lineHeight = "30px";
        item.style.listStyle = "none";
        item.style.cursor = "pointer";
        item.style.overflow = "hidden";
        //添加列表事件
        var that = this;
        item.addEventListener("click", function () {
            for (var i = 0; i < liEle.length; i++) {
                liEle[i].style.backgroundColor = "";
            }
            this.style.backgroundColor = "rgba(0,0,0,0.1)";
            //点击列表播放播放
            that.mIndex = this.index;
            that.getMusicInfo();//重新获取路径
            if (!that.flag) {
                that.audio.play();
                that.showProgress();
                that.play.className = "fa fa-pause-circle-o";
            }
        });
    }.bind(this));
}
// 生成歌词
Player.prototype.createLrc = function () {
    this.box.appendChild(this.lrcTxt);
    this.lrcTxt.style.position = "absolute";
    this.lrcTxt.style.left = "0";
    this.lrcTxt.style.bottom = "100px";
    this.lrcTxt.style.width = "100%";
    this.lrcTxt.style.height = "300px";
    this.lrcTxt.style.lineHeight = "35px";
    this.lrcTxt.style.opacity = "0";
    this.lrcTxt.style.textAlign = "center";
    this.lrcTxt.style.overflow = "hidden";
    this.lrcTxt.style.transition = "all 0.3s linear";
    this.getLrcInfo(this.data[this.mIndex].lrc);//初始化歌词
}
Player.prototype.updateLrc = function (lrcData) {
    //更新歌词信息
    var lrcEle = "<ul>";
    for (var item in lrcData) {
        lrcEle += "<li index=" + item + " style='list-style:none'>" + lrcData[item] + "</li>";
    }
    lrcEle += "</ul>";
    this.lrcTxt.innerHTML = lrcEle;
    var lrcBg = this.lrcTxt.querySelector("ul");
    lrcBg.style.marginTop = (this.lrcTxt.offsetHeight / 2) + "px";
    lrcBg.style.transition = "all 0.5s linear";
    lrcBg.querySelectorAll("li").forEach(function (item) {
        item.style.color = "#fff";
        item.style.fontFamily = "mFont";
    });
}
Player.prototype.getLrcInfo = function (lrcUrl) {
    //请求歌词数据
    $.ajax({
        url: lrcUrl,
        type: "get",
        dataType: "text",
        async: true,
        success: function (res) {
            this.updateLrc(parseLyric(JSON.parse(res).lrc.lyric));
        }.bind(this),
        error: function (err) {
            this.updateLrc(["糟糕，暂无歌词"]);
        }.bind(this)
    });
    // 解析歌词
    function parseLyric (lrc) {
        if (lrc === '') return '';
        var lyrics = lrc.split("\n");
        var lrcText = {};
        for (var i = 0; i < lyrics.length; i++) {
            var lyric = decodeURIComponent(lyrics[i]);
            var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
            var timeRegExpArr = lyric.match(timeReg);
            if (!timeRegExpArr) continue;
            var clause = lyric.replace(timeReg, '');
            for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                var t = timeRegExpArr[k];
                var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                var time = min * 60 + sec;
                lrcText[time] = clause;
            }
        }
        return lrcText;
    }
}
Player.prototype.getUrl = function (url, callback) {
    $.ajax({
        url,
        type: "get",
        dataType: "json",
        async: true,
        success: function (res) {
            callback(res.data[0].url);
        },
        error: function (err) {
            callback(null);
        }
    });
}
//检查音乐文件是否错误
Player.prototype.checkMusicError = function () {
    //更新
    this.getUrl(this.data[this.mIndex].url, (res) => {
        this.audio.src = res;
    });
    this.img.src = this.data[this.mIndex].cover;
    this.musicName.innerText = this.data[this.mIndex].name || "未知";
    this.singerName.innerText = this.data[this.mIndex].artist || "未知";
    this.getLrcInfo(this.data[this.mIndex].lrc);//更新歌词
    this.changeTitle({
        musicName: this.musicName.innerText,
        singerName: this.singerName.innerText
    });
    document.querySelector(".div").style.background = "url(" + this.data[this.mIndex].cover + ") no-repeat center/100% 100%";
    //更新列表选中状态
    var liEle = this.listBox.querySelectorAll("li");
    for (var i = 0; i < liEle.length; i++) {
        liEle[i].style.backgroundColor = "";
    }
    liEle[this.mIndex].style.backgroundColor = "rgba(0,0,0,0.1)";
}
Player.prototype.changeTitle = function (title) {
    var titleTxt = "-[正在播放]-" + title.singerName + "~" + title.musicName;
    clearInterval(this.timer);
    this.timer = null;
    var newTxt = function () {
        document.title = titleTxt.substring(1, titleTxt.length) + titleTxt.substring(0, 1)
        titleTxt = document.title;
    }
    this.timer = setInterval(newTxt, 500);
}