"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function e(e,t){return e(t={exports:{}},t.exports),t.exports}var t=e((function(e,t){var n;e.exports=(n=n||function(e,t){var n=Object.create||function(){function e(){}return function(t){var n;return e.prototype=t,n=new e,e.prototype=null,n}}(),s={},i=s.lib={},r=i.Base={extend:function(e){var t=n(this);return e&&t.mixIn(e),t.hasOwnProperty("init")&&this.init!==t.init||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}},o=i.WordArray=r.extend({init:function(e,t){e=this.words=e||[],this.sigBytes=null!=t?t:4*e.length},toString:function(e){return(e||c).stringify(this)},concat:function(e){var t=this.words,n=e.words,s=this.sigBytes,i=e.sigBytes;if(this.clamp(),s%4)for(var r=0;r<i;r++){var o=n[r>>>2]>>>24-r%4*8&255;t[s+r>>>2]|=o<<24-(s+r)%4*8}else for(r=0;r<i;r+=4)t[s+r>>>2]=n[r>>>2];return this.sigBytes+=i,this},clamp:function(){var t=this.words,n=this.sigBytes;t[n>>>2]&=4294967295<<32-n%4*8,t.length=e.ceil(n/4)},clone:function(){var e=r.clone.call(this);return e.words=this.words.slice(0),e},random:function(t){for(var n,s=[],i=function(t){t=t;var n=987654321,s=4294967295;return function(){var i=((n=36969*(65535&n)+(n>>16)&s)<<16)+(t=18e3*(65535&t)+(t>>16)&s)&s;return i/=4294967296,(i+=.5)*(e.random()>.5?1:-1)}},r=0;r<t;r+=4){var a=i(4294967296*(n||e.random()));n=987654071*a(),s.push(4294967296*a()|0)}return new o.init(s,t)}}),a=s.enc={},c=a.Hex={stringify:function(e){for(var t=e.words,n=e.sigBytes,s=[],i=0;i<n;i++){var r=t[i>>>2]>>>24-i%4*8&255;s.push((r>>>4).toString(16)),s.push((15&r).toString(16))}return s.join("")},parse:function(e){for(var t=e.length,n=[],s=0;s<t;s+=2)n[s>>>3]|=parseInt(e.substr(s,2),16)<<24-s%8*4;return new o.init(n,t/2)}},u=a.Latin1={stringify:function(e){for(var t=e.words,n=e.sigBytes,s=[],i=0;i<n;i++){var r=t[i>>>2]>>>24-i%4*8&255;s.push(String.fromCharCode(r))}return s.join("")},parse:function(e){for(var t=e.length,n=[],s=0;s<t;s++)n[s>>>2]|=(255&e.charCodeAt(s))<<24-s%4*8;return new o.init(n,t)}},l=a.Utf8={stringify:function(e){try{return decodeURIComponent(escape(u.stringify(e)))}catch(e){throw new Error("Malformed UTF-8 data")}},parse:function(e){return u.parse(unescape(encodeURIComponent(e)))}},h=i.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new o.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=l.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(t){var n=this._data,s=n.words,i=n.sigBytes,r=this.blockSize,a=i/(4*r),c=(a=t?e.ceil(a):e.max((0|a)-this._minBufferSize,0))*r,u=e.min(4*c,i);if(c){for(var l=0;l<c;l+=r)this._doProcessBlock(s,l);var h=s.splice(0,c);n.sigBytes-=u}return new o.init(h,u)},clone:function(){var e=r.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0}),p=(i.Hasher=h.extend({cfg:r.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){h.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function(e){return function(t,n){return new e.init(n).finalize(t)}},_createHmacHelper:function(e){return function(t,n){return new p.HMAC.init(e,n).finalize(t)}}}),s.algo={});return s}(Math),n)})),n=(e((function(e,n){var s;e.exports=(s=t,function(e){var t=s,n=t.lib,i=n.WordArray,r=n.Hasher,o=t.algo,a=[];!function(){for(var t=0;t<64;t++)a[t]=4294967296*e.abs(e.sin(t+1))|0}();var c=o.MD5=r.extend({_doReset:function(){this._hash=new i.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,t){for(var n=0;n<16;n++){var s=t+n,i=e[s];e[s]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8)}var r=this._hash.words,o=e[t+0],c=e[t+1],f=e[t+2],d=e[t+3],g=e[t+4],m=e[t+5],y=e[t+6],v=e[t+7],_=e[t+8],S=e[t+9],w=e[t+10],T=e[t+11],P=e[t+12],O=e[t+13],I=e[t+14],q=e[t+15],k=r[0],A=r[1],b=r[2],E=r[3];k=u(k,A,b,E,o,7,a[0]),E=u(E,k,A,b,c,12,a[1]),b=u(b,E,k,A,f,17,a[2]),A=u(A,b,E,k,d,22,a[3]),k=u(k,A,b,E,g,7,a[4]),E=u(E,k,A,b,m,12,a[5]),b=u(b,E,k,A,y,17,a[6]),A=u(A,b,E,k,v,22,a[7]),k=u(k,A,b,E,_,7,a[8]),E=u(E,k,A,b,S,12,a[9]),b=u(b,E,k,A,w,17,a[10]),A=u(A,b,E,k,T,22,a[11]),k=u(k,A,b,E,P,7,a[12]),E=u(E,k,A,b,O,12,a[13]),b=u(b,E,k,A,I,17,a[14]),k=l(k,A=u(A,b,E,k,q,22,a[15]),b,E,c,5,a[16]),E=l(E,k,A,b,y,9,a[17]),b=l(b,E,k,A,T,14,a[18]),A=l(A,b,E,k,o,20,a[19]),k=l(k,A,b,E,m,5,a[20]),E=l(E,k,A,b,w,9,a[21]),b=l(b,E,k,A,q,14,a[22]),A=l(A,b,E,k,g,20,a[23]),k=l(k,A,b,E,S,5,a[24]),E=l(E,k,A,b,I,9,a[25]),b=l(b,E,k,A,d,14,a[26]),A=l(A,b,E,k,_,20,a[27]),k=l(k,A,b,E,O,5,a[28]),E=l(E,k,A,b,f,9,a[29]),b=l(b,E,k,A,v,14,a[30]),k=h(k,A=l(A,b,E,k,P,20,a[31]),b,E,m,4,a[32]),E=h(E,k,A,b,_,11,a[33]),b=h(b,E,k,A,T,16,a[34]),A=h(A,b,E,k,I,23,a[35]),k=h(k,A,b,E,c,4,a[36]),E=h(E,k,A,b,g,11,a[37]),b=h(b,E,k,A,v,16,a[38]),A=h(A,b,E,k,w,23,a[39]),k=h(k,A,b,E,O,4,a[40]),E=h(E,k,A,b,o,11,a[41]),b=h(b,E,k,A,d,16,a[42]),A=h(A,b,E,k,y,23,a[43]),k=h(k,A,b,E,S,4,a[44]),E=h(E,k,A,b,P,11,a[45]),b=h(b,E,k,A,q,16,a[46]),k=p(k,A=h(A,b,E,k,f,23,a[47]),b,E,o,6,a[48]),E=p(E,k,A,b,v,10,a[49]),b=p(b,E,k,A,I,15,a[50]),A=p(A,b,E,k,m,21,a[51]),k=p(k,A,b,E,P,6,a[52]),E=p(E,k,A,b,d,10,a[53]),b=p(b,E,k,A,w,15,a[54]),A=p(A,b,E,k,c,21,a[55]),k=p(k,A,b,E,_,6,a[56]),E=p(E,k,A,b,q,10,a[57]),b=p(b,E,k,A,y,15,a[58]),A=p(A,b,E,k,O,21,a[59]),k=p(k,A,b,E,g,6,a[60]),E=p(E,k,A,b,T,10,a[61]),b=p(b,E,k,A,f,15,a[62]),A=p(A,b,E,k,S,21,a[63]),r[0]=r[0]+k|0,r[1]=r[1]+A|0,r[2]=r[2]+b|0,r[3]=r[3]+E|0},_doFinalize:function(){var t=this._data,n=t.words,s=8*this._nDataBytes,i=8*t.sigBytes;n[i>>>5]|=128<<24-i%32;var r=e.floor(s/4294967296),o=s;n[15+(i+64>>>9<<4)]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8),n[14+(i+64>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),t.sigBytes=4*(n.length+1),this._process();for(var a=this._hash,c=a.words,u=0;u<4;u++){var l=c[u];c[u]=16711935&(l<<8|l>>>24)|4278255360&(l<<24|l>>>8)}return a},clone:function(){var e=r.clone.call(this);return e._hash=this._hash.clone(),e}});function u(e,t,n,s,i,r,o){var a=e+(t&n|~t&s)+i+o;return(a<<r|a>>>32-r)+t}function l(e,t,n,s,i,r,o){var a=e+(t&s|n&~s)+i+o;return(a<<r|a>>>32-r)+t}function h(e,t,n,s,i,r,o){var a=e+(t^n^s)+i+o;return(a<<r|a>>>32-r)+t}function p(e,t,n,s,i,r,o){var a=e+(n^(t|~s))+i+o;return(a<<r|a>>>32-r)+t}t.MD5=r._createHelper(c),t.HmacMD5=r._createHmacHelper(c)}(Math),s.MD5)})),e((function(e,n){var s,i,r;e.exports=(i=(s=t).lib.Base,r=s.enc.Utf8,void(s.algo.HMAC=i.extend({init:function(e,t){e=this._hasher=new e.init,"string"==typeof t&&(t=r.parse(t));var n=e.blockSize,s=4*n;t.sigBytes>s&&(t=e.finalize(t)),t.clamp();for(var i=this._oKey=t.clone(),o=this._iKey=t.clone(),a=i.words,c=o.words,u=0;u<n;u++)a[u]^=1549556828,c[u]^=909522486;i.sigBytes=o.sigBytes=s,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var t=this._hasher,n=t.finalize(e);return t.reset(),t.finalize(this._oKey.clone().concat(n))}})))})),e((function(e,n){e.exports=t.HmacMD5})));class s extends Error{constructor(e){super(e.message),this.errMsg=e.message||"",Object.defineProperties(this,{code:{get:()=>e.code},requestId:{get:()=>e.requestId},message:{get(){return`errCode: ${e.code||""} | errMsg: `+this.errMsg},set(e){this.errMsg=e}}})}}var i={sign:function(e,t){let s="";return Object.keys(e).sort().forEach((function(t){e[t]&&(s=s+"&"+t+"="+e[t])})),s=s.slice(1),n(s,t).toString()},wrappedRequest:function(e){return new Promise((t,n)=>{uni.request(Object.assign(e,{complete(e){e||(e={});const i=e.header&&e.header["request-id"];if(!e.statusCode||e.statusCode>=400)return n(new s({code:"SYS_ERR",message:e.errMsg||"Request Error",requestId:i}));const r=e.data;if(r.error)return n(new s({code:r.error.code,message:r.error.message,requestId:i}));r.result=r.data,r.requestId=i,delete r.data,t(r)}}))})}};const r={jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",gif:"image/gif",webp:"image/webp",svg:"image/svg+xml",mp3:"audio/mpeg",mp4:"video/mp4",ogg:"audio/ogg",webm:"video/webm"};function o(e){return r[e.toLowerCase()]}class a{constructor(e){["spaceId","clientSecret"].forEach(t=>{if(!Object.prototype.hasOwnProperty.call(e,t))throw new Error(`缺少参数${t}`)}),this.config=Object.assign({},{endpoint:"https://api.bspapp.com"},e),this.config.provider="aliyun",this.config.requestUrl=this.config.endpoint+"/client",this.config.envType=this.config.envType||"public",this.config.accessTokenKey="access_token_"+this.config.spaceId,this.setAccessToken(uni.getStorageSync(this.config.accessTokenKey)||"")}get hasAccessToken(){return!!this.accessToken}setAccessToken(e){uni.setStorageSync(this.config.accessTokenKey,e),this.accessToken=e}requestAuth(e){return i.wrappedRequest(e)}request(e,t){return this.hasAccessToken?t?i.wrappedRequest(e):i.wrappedRequest(e).catch(t=>new Promise((e,n)=>{!t||"GATEWAY_INVALID_TOKEN"!==t.code&&"InvalidParameter.InvalidToken"!==t.code?n(t):e()}).then(()=>this.getAccessToken()).then(()=>{const t=this.rebuildRequest(e);return this.request(t,!0)})):this.getAccessToken().then(()=>{const t=this.rebuildRequest(e);return this.request(t,!0)})}rebuildRequest(e){const t=Object.assign({},e);return t.data.token=this.accessToken,t.header["x-basement-token"]=this.accessToken,t.header["x-serverless-sign"]=i.sign(t.data,this.config.clientSecret),t}setupRequest(e,t){const n=Object.assign({},e,{spaceId:this.config.spaceId,timestamp:Date.now()}),s={"Content-Type":"application/json"};return"auth"!==t&&(n.token=this.accessToken,s["x-basement-token"]=this.accessToken),s["x-serverless-sign"]=i.sign(n,this.config.clientSecret),{url:this.config.requestUrl,method:"POST",data:n,dataType:"json",header:s}}getAccessToken(){return this.requestAuth(this.setupRequest({method:"serverless.auth.user.anonymousAuthorize",params:"{}"},"auth")).then(e=>new Promise((t,n)=>{e.result&&e.result.accessToken?(this.setAccessToken(e.result.accessToken),t(this.accessToken)):n(new s({code:"AUTH_FAILED",message:"获取accessToken失败"}))}))}authorize(){this.getAccessToken()}callFunction(e){const t={method:"serverless.function.runtime.invoke",params:JSON.stringify({functionTarget:e.name,functionArgs:e.data||{}})};return this.request(this.setupRequest(t))}getOSSUploadOptionsFromPath(e){const t={method:"serverless.file.resource.generateProximalSign",params:JSON.stringify(e)};return this.request(this.setupRequest(t))}uploadFileToOSS({url:e,formData:t,fileName:n,name:i,filePath:r,fileType:o,contentType:a}){return new Promise((a,c)=>{uni.uploadFile({url:e,formData:t,fileName:n,name:i,filePath:r,fileType:o,header:{"X-OSS-server-side-encrpytion":"AES256"},success(e){e&&e.statusCode<400?a(e):c(new s({code:"UPLOAD_FAILED",message:"文件上传失败"}))},fail(e){c(e)}})})}reportOSSUpload(e){const t={method:"serverless.file.resource.report",params:JSON.stringify(e)};return this.request(this.setupRequest(t))}uploadFile({filePath:e,config:t}){const n=t&&t.envType||this.config.envType;let i,a,c,u,l,h=e.split("/").pop();return(i="h5"===process.env.VUE_APP_PLATFORM?new Promise((t,n)=>{var i=new XMLHttpRequest;i.open("GET",e,!0),i.responseType="blob",i.onload=function(){(a=function(e){let t;return Object.keys(r).forEach(n=>{r[n]===e&&(t=n)}),t}(this.response.type))||n(new s({code:"UNSUPPORTED_FILE_TYPE",message:"不支持的文件类型"})),h+="."+a,t()},i.send()}):o(a=e.split(".").pop())?Promise.resolve():Promise.reject(new s({code:"UNSUPPORTED_FILE_TYPE",message:"不支持的文件类型"}))).then(()=>this.getOSSUploadOptionsFromPath({env:n,filename:h})).then(t=>{const n=t.result;c=o(a),u=n.id,l="https://"+n.host+"/"+n.ossPath;const s={url:"https://"+n.host,formData:{"Cache-Control":"max-age=2592000","Content-Disposition":"attachment",OSSAccessKeyId:n.accessKeyId,Signature:n.signature,host:n.host,id:u,key:n.ossPath,policy:n.policy,success_action_status:200},fileName:"file",name:"file",filePath:e,fileType:"image",contentType:c};return this.uploadFileToOSS(s)}).then(()=>this.reportOSSUpload({id:u,contentType:c})).then(t=>new Promise((n,i)=>{t.success?n({success:!0,filePath:e,fileID:l}):i(new s({code:"UPLOAD_FAILED",message:"文件上传失败"}))}))}deleteFile({fileList:e}){const t={method:"serverless.file.resource.delete",params:JSON.stringify({id:e[0]})};return this.request(this.setupRequest(t))}}const c=require("uni-stat-config").default||require("uni-stat-config"),u="__DC_STAT_UUID",l="__DC_UUID_VALUE",h="https://ide.dcloud.net.cn/serverless/function/invoke";function p(){let e="";if("n"===f()){try{e=plus.runtime.getDCloudId()}catch(t){e=""}return e}try{e=uni.getStorageSync(u)}catch(t){e=l}if(!e){e=Date.now()+""+Math.floor(1e7*Math.random());try{uni.setStorageSync(u,e)}catch(e){uni.setStorageSync(u,l)}}return e}function f(){return{"app-plus":"n",h5:"h5","mp-weixin":"wx","mp-alipay":"ali","mp-baidu":"bd","mp-toutiao":"tt","mp-qq":"qq"}[process.env.VUE_APP_PLATFORM]}function d(e){return function(t){if(!((t=t||{}).success||t.fail||t.complete))return e.call(this,t);e.call(this,t).then(e=>{t.success&&t.success(e),t.complete&&t.complete(e)}).catch(e=>{t.fail&&t.fail(e),t.complete&&t.complete(e)})}}const g={init(e){const t=new a(e);t.authorize();return["callFunction","uploadFile","deleteFile"].forEach(e=>{t[e]=d(t[e]).bind(t)}),t}};let m,y;function v(e){const t=JSON.parse(JSON.stringify(e.data||{})),n=e.name,s=this.config.spaceId,i=Object.assign({},y,{fn:n,sid:s});return Object.assign(t,{clientInfo:m,uniCloudClientInfo:encodeURIComponent(JSON.stringify(i))}),e.data=t,e}function _(e){const t=v.call(this,e),n={tencent:"tcb",aliyun:"aliyun"}[this.config.provider],s=y.ak,i=this.config.spaceId,r=JSON.stringify(t.data),o=t.name,a=JSON.stringify({body:{provider:n,appid:s,spaceId:i,functionName:o,run_params:r},header:{token:process.env.HBX_USER_TOKEN}});return new Promise((e,t)=>{uni.request({url:h,method:"POST",data:{param:a},complete(n){n||(n={});const s=n.data&&n.data.body;if(!s)return void t(new Error(`[FUNCTIONS_EXECUTE_FAIL] Request Fail: [${o}]`));if(console.log(`[uniCloud]${s.log}[/uniCloud]`),0!==s.invokeResult&&"0"!==s.invokeResult)return void t(new Error(s.errorMsg));const i=s.requestId;let r={};try{r=JSON.parse(s.result)}catch(e){r=s.result}e({requestId:i,result:r})}})})}const S={init(e){m=function(){const e=uni.getSystemInfoSync();return{PLATFORM:process.env.VUE_APP_PLATFORM,OS:e.platform,APPID:c.appid}}(),y=function(){const e=uni.getSystemInfoSync();return{ak:c.appid,p:"android"===e.platform?"a":"i",ut:f(),uuid:p()}}();let t={};switch(e.provider){case"aliyun":t=g.init(e);break;default:throw new Error("未提供正确的provider参数")}const n=!1!==e.debugFunction&&"development"===process.env.NODE_ENV&&("app-plus"===process.env.VUE_APP_PLATFORM||"h5"===process.env.VUE_APP_PLATFORM)&&process.env.HBX_USER_TOKEN;if(n&&"tencent"===e.provider)t.callFunction=function(e){return d(_).call(this,e)};else if(n&&"aliyun"===e.provider){const n=t.callFunction;t.callFunction=function(t){const s=v.call(this,t);return n.call(this,s).then(t=>{if(t&&t.requestId){const n=JSON.stringify({spaceId:e.spaceId,functionName:s.name,requestId:t.requestId});console.log(`[aliyun-request]${n}[/aliyun-request]`)}return Promise.resolve(t)}).catch(t=>{if(t&&t.requestId){const n=JSON.stringify({spaceId:e.spaceId,functionName:s.name,requestId:t.requestId});console.log(`[aliyun-request]${n}[/aliyun-request]`)}return Promise.reject(t)})}}else{const e=t.callFunction;t.callFunction=function(t){const n=v.call(this,t);return e.call(this,n)}}return t.init=this.init,t}};let w=S;try{w=S.init(process.env.UNI_CLOUD_PROVIDER)}catch(e){["auth","callFunction","uploadFile","deleteFile","getTempFileURL","downloadFile"].forEach(e=>{w[e]=function(){return console.error("请先执行uniCloud.init指明所用的服务空间"),Promise.reject(new s({code:"SYS_ERR",message:"请先执行uniCloud.init指明所用的服务空间"}))}})}var T=w;export default T;