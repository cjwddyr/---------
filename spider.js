var Crawler = require('crawler');
var url = require('url');
var fs = require('fs');

// 通过设置forceUTF8和 incomingEncoding 处理中文编码页面问题。
var c = new Crawler({
    maxConnections: 10,
    forceUTF8: true,
    // @@ -9, 13 +9, 14@@ var c = new Crawler
    incomingEncoding: 'gb2312'
});

var arrBookErTong = [];
getData('http://bang.dangdang.com/books/newhotsales/01.41.00.00.00.00-24hours-0-0-1-', 1);
function getData(url, page) {
    c.queue([{
        // uri: 'http://bang.dangdang.com/books/newhotsales/01.41.00.00.00.00-24hours-0-0-1-1',
        uri: url + page,
        callback: (err, result, $) => {
            console.log(result.uri);
            // console.log($('title').text());
            $('.bang_list li').each((index, li) => {
                console.log($(li).find('.name').text());
                console.log(result.uri);
                // console.log($('title').text());

                var obj = decodeBookData($(li));
                // var obj = [];
                // obj.title = $(li).find('.name').text();
                // obj.img = $(li).find('.pic img').attr('src');
                // obj.author = $(li).find('.publisher_info').eq(0).text();
                // obj.publister = $(li).find('.publisher_info').eq(1).find('a').text();
                // obj.publist_time = $(li).find('.publisher_info').eq(1).find('span').text();
                // obj.link = $(li).find('.pic a').attr('href');
                // obj.price = $(li).find('.price .price_n').text();
                
                console.log('--------');
                arrBookErTong.push(obj);
                // console.log(arrBookErTong);
            });
            if (page > 5) {
                fs.writeFileSync('./data/book_ertong.json', JSON.stringify(arrBookErTong));
                console.log('获取数据成功');
                console.log(arrBookErTong);
            }
            else {
                getData(url, page + 1);
            }
        }
    }])
}

function decodeBookData($item) {
    var obj = [];
    obj.title = $(li).find('.name').text();
    obj.img = $(li).find('.pic img').attr('src');
    obj.author = $(li).find('.publisher_info').eq(0).text();
    obj.publister = $(li).find('.publisher_info').eq(1).find('a').text();
    obj.publist_time = $(li).find('.publisher_info').eq(1).find('span').text();
    obj.link = $(li).find('.pic a').attr('href');
    obj.price = $(li).find('.price .price_n').text();
    return obj;
}