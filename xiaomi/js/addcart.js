var shopCar = (function () {
    return {
        init: function (ele) {
            this.$ele = document.querySelector(ele);
            this.$empty = document.querySelector(".cart-empty");
            this.$goods = document.querySelector(".cart-goods");
            this.$body = document.querySelector(".list-body");
            
            // console.log(this.$body);
            this.event();
            this.getShopListData();
        },
        event: function () {
            var _this = this;
        },
        // 获取所有商品信息
        getShopListData: function () {
            var _this = this;
            var params = {
                success: function (data) {
                    data = JSON.parse(data);
                    _this.shopList = data.data;
                    _this.getCarList();
                    // _this.insertShopList(data.data);
                }
            }
            sendAjax('json/detail.json', params);
        },
        // 获取加入购物车的商品信息
        getCarList: function () {
            // console.log(this.shopList);
            this.carList = JSON.parse(localStorage.shopList);
            for(var i = 0; i <  this.shopList.length; i++) {
                for(var j = 0; j < this.carList.length; j++) {
                    if(this.shopList[i].version == this.carList[j].version && this.shopList[i].theme == this.carList[j].theme) {
                        this.$empty.style.display = "none";
                        this.$goods.style.display = "block";
                        Object.assign(this.carList[j], this.shopList[i]);//浅拷贝，两个数组融合到cart
                        break;
                    }
                }
            }
            // console.log(this.carList);
            this.insertCarList(this.carList);
        },
        // 把购物车数据渲染到页面中
        insertCarList: function (data) {
            var arr = [];   
            for (var i = 0; i < data.length; i++) {
                arr.push(
                  `<div class="item-box">
                     <div class="item-table">
                       <div class="item-row">
                        <div class="col col-check"><i id="check-box" class="iconfont icon-check icon-checkbox-selected">√</i></div>
                        <div class="col col-img"><img src="${data[i].image}" alt=""></div>
                        <h3 class="col col-name">
                          <a href="">${data[i].name}&nbsp;${data[i].neicun}&nbsp;${data[i].color}</a>
                        </h3>
                        <div class="col col-price">${data[i].price}</div>
                        <div class="col col-num">
                          <div class="change-num">
                            <a class="minus">-</a>
                            <input type="text" class="goods-num" value="1">
                            <a class="plus">+</a>
                          </div>
                        </div>
                        <div class="col col-total">${data[i].price}</div>
                        <div class="col col-action"><a class="del"><i>×</i></a></div>
                      </div>
                    </div>
                   </div>`);
            }
            this.$body.innerHTML = arr.join('');
            var $check_box = document.querySelectorAll("#check-box");  //全部的单选框
            var $check = document.querySelector(".icon-check");  //全选框
            var $total = document.querySelectorAll(".col-total");  //所有的总金额
            var $checkAll = document.querySelectorAll(".icon-check");  //所有的单选框

            var $item = document.querySelectorAll(".item-box");  //每条数据的DOM盒子
            var item = $item.length;
            

            //购物车初始化（全选）
            var sum=0;
            for(var i=1;i<$total.length;i++){   
                sum += parseInt($total[i].innerHTML);
            }document.querySelector("#J_cartTotalPrice").innerHTML =sum;


            var localStr = JSON.parse(localStorage.shopList); //localstorage数据转对象
            // console.log(localStr);
            // 删除当前数据
            var $del = this.$body.querySelectorAll(".col-action");
            for(let i=0;i<$del.length;i++){
                $del[i].addEventListener('click',function(e){
                    var e = e || window.event;
                    var target = e.target || e.srcElement;
                    if(target.nodeName === 'A' || target.nodeName === 'I'){
                        $item[i].remove();  //删除DOM元素，item
                        // console.log(data[i]);  // 购物车里的商品数据
                        // localStorage.removeItem('shopList');
                        localStr.splice(i,1);
                        localStorage.shopList = JSON.stringify(localStr);
                    }
                },false);
            }
            document.querySelector("#J_cartTotalNum").innerHTML =  item;  //共有几件
            document.querySelector("#J_selTotalNum").innerHTML =  item;  //已选
            this.$body.addEventListener('click',function(e){
                var e = e || window.event;
                var target = e.target || e.srcElement;
                var sum1,sum2;
                // 数量 减、加
                if(target.nodeName === 'A' && target.className === 'minus'){
                    var num = target.nextElementSibling.value;
                    num = parseInt(num);
                    var price = target.parentElement.parentElement.previousElementSibling.innerHTML;
                    console.log("减");
                    if(num>1){
                        num --;
                        target.nextElementSibling.value = num;
                        sum1 = price*num;// 总金额  数量*单价
                        target.parentElement.parentElement.nextElementSibling.innerHTML = sum1;
                    }
                }
                if(target.nodeName === 'A' && target.className === 'plus'){
                    var num = target.previousElementSibling.value;
                    num = parseInt(num);
                    var price = target.parentElement.parentElement.previousElementSibling.innerHTML;
                    console.log("加");
                    num ++ ;
                    target.previousElementSibling.value = num;
                    sum2 = price*num;
                    target.parentElement.parentElement.nextElementSibling.innerHTML = sum2;    
                }
                // 将每个商品数量num存到json数据里，或者localstorage里

                // 单选择框
                if(target.nodeName === 'I'&&target.id === 'check-box'){
                    $(target).toggleClass("icon-checkbox-selected");
                }
            },false);
            
            //点击单选框,小计的价格到合计
            for(let i=1;i<$total.length;i++){
                $check_box[i-1].addEventListener('click',function(){
                    var sum2 = parseInt(document.querySelector("#J_cartTotalPrice").innerHTML);
                    var sum = parseInt($total[i].innerHTML);
                    if($check_box[i-1].className == "iconfont icon-check"){
                        document.querySelector("#J_cartTotalPrice").innerHTML = sum + sum2;
                    }else{
                        document.querySelector("#J_cartTotalPrice").innerHTML = sum2 -sum;
                    }
                },false)
            }

            // 全选框
            $check.addEventListener('click',function(){
               var sum = 0;
               $(".icon-check").toggleClass("icon-checkbox-selected");
               // 全选合计
               for(var i=1;i<$total.length;i++){
                    // console.log($checkAll[i]);
                    if($check.className == "iconfont icon-check icon-checkbox-selected"){
                        sum += parseInt($total[i].innerHTML);
                        document.querySelector("#J_cartTotalPrice").innerHTML = sum;
                    }else{
                        document.querySelector("#J_cartTotalPrice").innerHTML = 0;
                    }
                } 
            },false)
            
        },
    }
}())