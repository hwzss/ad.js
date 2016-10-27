/*
     
*/

function FindProxyForURL(url, host){

    /********************************************
    *                                           *
    *            关于 “mode = ” 的说明            *
    *                                           *
    *  0: 不使用代理 (仅屏蔽广告)                  *
    *  1: 使用http代理 (请在下方设置服务器和端口)    *
    *  2: 使用pac规则代理 (使用方法请看文件底部注释)  *
    *                                           *
    ********************************************/

    var mode = 0;

    //【以下http代理设置仅在 “mode = 1” 时有效】
    var domain = "127.0.0.1";
    var port = "8080";

    var hosts = [
//=========域名Start=========
//<ad.js_test>
"sc.cdce.cf",
//<v>
"miaozhen.com",
//<v-youku>
"atm.cp31.ott.cibntv.net",
"atm.youku.com",
"gamex.mobile.youku.com",
//<v-qq>
"aiseet.atianqi.com",
"l.qq.com",
//<v-iqiyi>
"cupid.iqiyi.com",
"cupid.ptqy.gitv.tv",
"cupid.qiyi.com",
//<v-sohu>
"aty.sohu.com",
//<others>
"keydot.net",
"b.cdnny.com"
//=========域名End=========
//【在分界线上面可以追加域名，两边加上双引号，使用逗号分隔。】
    ]
    var ips = [
//=========IP地址Start=========
//<iqiyi>
"101.227.14.80",
"101.227.14.81",
"101.227.14.82",
"101.227.14.83",
"101.227.14.84",
"101.227.14.85",
"101.227.14.86"
//=========IP地址End=========
//【在分界线上面可以追加IP地址，两边加上双引号，使用逗号分隔。】
    ]
    var rules = [
//【iOS 9.3.2 以上的系统由于系统限制，无法享受URL规则功能。】
//=========URL规则Start=========
"*pg.dmclock.com:8011/ec54.html*",
"*cc/js/ads/*",
"*config.mobile.kukuplay.com:8080/MobileConfig*"
//=========URL规则End=========
//【在分界线上面可以追加URL规则，两边加上双引号，使用逗号分隔。】
    ]

    dnsResolve("sc.cdce.cf");
    var IS_AD = "PROXY example.com:443";
    switch (mode){
      case 0:
          IS_NOT_AD = "DIRECT";
          break;
      case 1:
          IS_NOT_AD = "PROXY " + domain + ":" + port;
          break;
      case 2:
          IS_NOT_AD = FindUserProxyForURL(url, host);
          break;
    }
    for (var n = 0; n < hosts.length; n++){
        if (dnsDomainIs(host, hosts[n])){
            return IS_AD;
        }
    }
    for (var n = 0; n < ips.length; n++){
        if (isInNet(host, ips[n], "225.225.225.225")){
            return IS_AD;
        }
    }
    for (var n = 0; n < rules.length; n++){
        if (shExpMatch(url, rules[n])){
            return IS_AD;
        }
    }
    return IS_NOT_AD;
}

/**********************************************
*                                             *
*            使用pac规则代理的方法               *
*                                             *
*  1. 设置“mode = 2”。                         *
*  2. 打开pac文件，将里面的“FindProxyForURL”替换  *
*     为“FindUserProxyForURL“后粘贴在下方即可。  *
*                                             *
**********************************************/
