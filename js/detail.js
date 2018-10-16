var  shopList = (function(){

  return {
      init: function() {
          this.$version = document.querySelector(".choose-1");
          this.$arr1 = this.$version.querySelectorAll("li");
          this.$theme = document.querySelector(".choose-2");
          this.$arr2 = this.$theme.querySelectorAll("li");

            this.$pro_main = document.querySelector(".pro-main");
            this.$tip = document.querySelector(".tip");
            this.$btn = document.querySelector(".btn-wrap");
            this.$add = this.$btn.querySelectorAll("li");
        //   console.log(this.$btn,this.$pro_main,this.$tip,this.$arr2);
        // 轮播图
        this.container1 = document.querySelector(".color1");

        console.log(this.container1);
        this.container2 = document.querySelector(".color2");
          this.version;
          this.theme;
          this.getShopListData();
          this.event();
      },
      event: function() {
          var _this = this;
        //   传手机内存类型
          this.$version.addEventListener('click', function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName === 'A') {
                // 改变this.version
                _this.version = target.getAttribute('version');
                $(target.parentElement).css({'border-color':'#ff6700'});
                $(target.parentElement).siblings().css({'border-color':'#e0e0e0'});              
              }
          }, false);
        //   传手机主题颜色
          this.$theme.addEventListener('click', function(e) {
            e = e || window.event;
              var target = e.target || e.srcElement;
              if (target.nodeName === 'A') {
                  // 没有改变this.theme
                  theme = target.getAttribute('theme');
                  $(target.parentElement).css({ 'border-color': '#ff6700' });
                  $(target.parentElement).siblings().css({ 'border-color': '#e0e0e0' });
                //   console.log(theme);
              }
              if (target.nodeName === 'A' && $(target).attr('theme') == 1) {
                // console.log(_this.container1);
                  _this.container1.style.display = 'block';
                  _this.container2.style.display = 'none';
              }
              if (target.nodeName === 'A' && $(target).attr('theme') == 2) {
                  _this.container2.style.display = 'block';
                  _this.container1.style.display = 'none';
              }
          }, false);
        //   点击加入购物车按钮获取商品信息
          this.$btn.addEventListener('click', function(e) {
              e = e || window.event;
              var target = e.target || e.srcElement;
              if(target.nodeName === 'A' && target.className === 'add') {
                  // 获取商品version,theme,商品数量
                  // var count = target.parentNode.querySelector('.shop-count').value;
                  // _this.addCar(id, count);
                  console.log(_this.version,theme);
                  _this.addCar(_this.version,theme);
              }
          }, false);

        //   提示隐藏
          this.$tip.addEventListener('click', function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName === 'A') {
                _this.$tip.style.display = 'none';
            }
        }, false);
      },
      // 获取商品数据
      getShopListData: function(){
          var _this = this;
          var params = {
              success: function(data) {
                  // console.log(data);
                  data = JSON.parse(data);
                  _this.insertShopList(data.data);
              }
          }
          sendAjax('json/detail.json', params);
      },
      // 把商品数据渲染到页面中
      insertShopList: function(data) {
          var arr = [];
          var arr1 = [];
          var arr2 = [];
          for(var i = 0; i < data.length; i++) {
              arr.push(`<a version=${data[i].version}>
                          <span class="name">${data[i].neicun}</span>
                          <span class="price">${data[i].price}</span>
                        </a>`);
              this.$arr1[i].innerHTML = arr[i];
              arr1.push(`<a theme=${data[i].theme}>
                        <img src="${data[i].image}">${data[i].color}
                        </a>`);
              this.$arr2[i].innerHTML = arr1[i];   

              arr2.push(`<a class="add" href="cart.html"}>加入购物车</a>`);   
              this.$add[0].innerHTML = arr2[i]; 
          }
      },
      // 添加商品
      addCar(version,theme) {
          // 把商品信息保存到本地数据库
          // 把所有添加的商品数据放到一个字段中, shopList
          // 添加第一个商品时,本地存储没有shopList
          // 本地存储数据格式一定是字符串格式
          var shopList = localStorage.shopList || '[]';
          shopList = JSON.parse(shopList);
          for(var i = 0; i < shopList.length; i++) {
              if(shopList[i].version === version && shopList[i].theme === theme) {
                  // 商品已经存在
                  // shopList[i].count = Number(shopList[i].count) + Number(count);
                  
                  break;
              }
          }
          if(i === shopList.length) {
              // 商品不存在
              shopList.push({version: version,theme: theme});
          }
          localStorage.shopList = JSON.stringify(shopList);
      }
  }
}())