// twitterlib.js (c) 2009 Remy Sharp
// Licensed under the terms of the MIT license.
(function(f,l){function C(b){var a='<li><div class="tweet">';a+='<div class="vcard"><a href="http://twitter.com/'+b.user.screen_name+'" class="url"><img style="height: 48px; width: 48px;" alt="'+b.user.name+'" class="photo fn" height="48" src="'+b.user.profile_image_url+'" width="48" /></a></div>';a+='<div class="hentry"><strong><a href="http://twitter.com/';a+=b.user.screen_name+'" ';a+='title="'+b.user.name+'">'+b.user.screen_name+"</a></strong> ";a+='<span class="entry-content">';a+=l[f].ify.clean(b.text);
a+='</span> <span class="meta entry-meta"><a href="http://twitter.com/'+b.user.screen_name;a+="/status/"+b.id+'" class="entry-date" rel="bookmark"><span class="published" title="';a+=b.created_at+'">'+l[f].time.datetime(b.created_at)+"</span></a>";if(b.source)a+=" <span>from "+b.source+"</span>";a+="</span></div></div></li>";return a}function u(b){s.getElementById(f+b)&&x.removeChild(s.getElementById(f+b));delete t[f+b];m[f+b]=n;try{delete m[f+b]}catch(a){}}function y(b,a,d){var c=s.createElement("script"),
e=null;if(a==n)a={};o++;t[f+o]=true;m[f+o]=function(k,h){return function(g){var i=0,p=[];if(g.results){g=g.results;for(i=g.length;i--;){g[i].user={id:g[i].from_user_id,screen_name:g[i].from_user,profile_image_url:g[i].profile_image_url};g[i].source=l[f].ify.entities(g[i].source);p=g[i].created_at.split(" ");g[i].created_at=[p[0],p[2],p[1],p[4],p[5],p[3]].join(" ").replace(/,/,"")}}else if(g.length&&g[0].sender)for(i=g.length;i--;){g[i].user=g[i].sender;g[i].originalText=g[i].text;g[i].text="@"+g[i].recipient_screen_name+
" "+g[i].text}h.originalTweets=g;if(h.filter)g=z.matchTweets(g,h.filter);if(q&&h.page>1){sessionStorage.setItem(f+".page"+h.page,"true");sessionStorage.setItem(f+".page"+h.page+".tweets",JSON.stringify(g));sessionStorage.setItem(f+".page"+h.page+".originalTweets",JSON.stringify(h.originalTweets))}h.cached=false;d.call(l[f],g,h);u(k)}}(o,a);e=b.match(/callback=(.*)/);if(e!=null&&e.length>1)m[e[1]]=m[f+o];else b+="&callback="+f+o;if(!q||a.page<=1||q&&sessionStorage.getItem(f+".page"+a.page)==null){c.src=
b;c.id=f+o;x.appendChild(c)}else if(q){u(o);a.cached=true;a.originalTweets=JSON.parse(sessionStorage.getItem(f+".page"+a.page+".originalTweets"));d.call(l[f],JSON.parse(sessionStorage.getItem(f+".page"+a.page+".tweets")),a)}}function A(b,a){return r[b].replace(/(\b.*?)%(.*?)(\|.*?)?%/g,function(d,c,e,k){if(k&&k.substr(1)=="remove"&&a[e]==n)return"";return c+(a[e]===n?k.substr(1):a[e])})}function v(b,a){if(typeof b=="function"){a=b;b={}}if(b===n)b={};b.page=b.page||1;b.callback=a;b.limit===0&&delete b.limit;
return b}function w(b,a,d){j={method:b,arg:a,options:d,callback:d.callback,page:d.page||1};if(q){b=JSON.parse(sessionStorage.getItem(f+".last_request")||"{}");if(j.method!=b.method||j.arg!=b.arg){D();sessionStorage.setItem(f+".last_request",JSON.stringify(j))}}}function D(){for(var b=sessionStorage.length;b--;)sessionStorage.key(b).substr(0,f.length)==f&&sessionStorage.removeItem(sessionStorage.key(b))}function E(b,a){if(a&&r[b]==n)r[b]=a;if(this[b]==n)this[b]=function(d,c,e){if(typeof d=="function"){e=
d;d=""}else if(d.toString()=="[Object object]"){e=c;c=d;d=""}c=v(c,e);w(b,d,c);c[b]=c.user=d;c.search=encodeURIComponent(d);c.callback&&y(A(b,c),c,c.callback);return this};return this[b]}var o=+new Date,m=this,s=m.document,x=s.getElementsByTagName("head")[0],j={},t={},F={"&quot;":'"',"&lt;":"<","&gt;":">"},B={search:"http://search.twitter.com/search.json?q=%search%&page=%page|1%&rpp=%limit|100%&since_id=%since|remove%",timeline:"http://twitter.com/statuses/user_timeline/%user%.json?count=%limit|200%&page=%page|1%&since_id=%since|remove%",
list:"http://api.twitter.com/1/%user%/lists/%list%/statuses.json?page=%page|1%&per_page=%limit|200%&since_id=%since|remove%",favs:"http://twitter.com/favorites/%user%.json?page=%page|1%"},r=B,n,q=false,G=function(){return{entities:function(b){return b.replace(/(&[a-z0-9]+;)/g,function(a){return F[a]})},link:function(b){return b.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_:~\+#%&\?\/.=]+[^:\.,\)\s*$]/ig,function(a){return'<a href="'+a+'">'+(a.length>25?a.substr(0,24)+"...":a)+"</a>"})},at:function(b){return b.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15}(\/[a-zA-Z0-9-_]+)*)/g,
function(a,d,c){return d+'@<a href="http://twitter.com/'+c+'">'+c+"</a>"})},hash:function(b){return b.replace(/(^|[^&\w'"]+)\#([a-zA-Z0-9_]+)/g,function(a,d,c){return d+'#<a href="http://search.twitter.com/search?q=%23'+c+'">'+c+"</a>"})},clean:function(b){return this.hash(this.at(this.link(b)))}}}(),H=function(){var b=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return{time:function(a){var d=a.getHours();a=a.getMinutes()+"";var c="AM";if(d==0)d=12;else if(d==12)c="PM";
else if(d>12){d-=12;c="PM"}if(a.length==1)a="0"+a;return d+":"+a+" "+c},date:function(a){a.toDateString().split(/ /);var d=b[a.getMonth()],c=a.getDate()+"",e=~~c;a=a.getFullYear();var k=(new Date).getFullYear(),h="th";if(e%10==1&&c.substr(0,1)!="1")h="st";else if(e%10==2&&c.substr(0,1)!="1")h="nd";else if(e%10==3&&c.substr(0,1)!="1")h="rd";if(c.substr(0,1)=="0")c=c.substr(1);return d+" "+c+h+(k!=a?", "+a:"")},datetime:function(a){a=a.split(" ");a=new Date(Date.parse(a[1]+" "+a[2]+", "+a[5]+" "+a[3]));
return this.time(a)+" "+this.date(a)},relative:function(a){var d=a.split(" "),c=Date.parse(d[1]+" "+d[2]+", "+d[5]+" "+d[3]);d=new Date(c);var e=arguments.length>1?arguments[1]:new Date;c=~~((e.getTime()-c)/1E3);var k="";c+=e.getTimezoneOffset()*60;return k=c<5?"less than 5 seconds ago":c<30?"half a minute ago":c<60?"less than a minute ago":c<120?"1 minute ago":c<2700?(~~(c/60)).toString()+" minutes ago":c<10800?"about 1 hour ago":c<86400?"about "+(~~(c/3600)).toString()+" hours ago":c<172800?this.time(d)+
" yesterday":this.time(d)+" "+this.date(d)}}}(),z=function(){return{match:function(b,a){var d=0,c="",e=b.text.toLowerCase();if(typeof a=="string")a=this.format(a);if(a.not.length){for(d=0;d<a.not.length;d++)if(e.indexOf(a.not[d])!==-1)return false;if(!a.and.length&&!a.or.length)return true}if(a.and.length)for(d=0;d<a.and.length;d++){c=a.and[d];if(c.substr(0,3)==="to:"){if(!RegExp("^@"+c.substr(3)).test(e))return false}else if(c.substr(0,5)=="from:"){if(b.user.screen_name!==c.substr(5))return false}else if(e.indexOf(c)===
-1)return false}if(a.or.length)for(d=0;d<a.or.length;d++){c=a.or[d];if(c.substr(0,3)==="to:"){if(RegExp("^@"+c.substr(3)).test(e))return true}else if(c.substr(0,5)=="from:"){if(b.user.screen_name===c.substr(5))return true}else if(e.indexOf(a.or[d])!==-1)return true}else if(a.and.length)return true;return false},format:function(b){var a=[],d=[],c=[],e=0,k=[];b.replace(/(-?["'](.*?)["']|\S+\b)/g,function(h){var g=false;if(h.substr(0,1)=="-")g=true;h=h.replace(/["']+|["']+$/g,"");g?k.push(h.substr(1).toLowerCase()):
a.push(h)});for(e=0;e<a.length;e++)if(a[e]=="OR"&&a[e+1]){d.push(a[e-1].toLowerCase());d.push(a[e+1].toLowerCase());e++;c.pop()}else c.push(a[e].toLowerCase());return{or:d,and:c,not:k}},matchTweets:function(b,a,d){var c=[],e=0;if(typeof a=="string")a=this.format(a);for(e=0;e<b.length;e++)this.match(b[e],a,d)&&c.push(b[e]);return c}}}();l[f]={custom:E,status:function(b,a,d){a=v(a,d);a.limit=1;w("status",b,a);return this.timeline(b,a,a.callback)},list:function(b,a,d){var c=b.split("/");a=v(a,d);w("list",
b,a);a.user=c[0];a.list=c[1];a.callback&&y(A("list",a),a,a.callback);return this},next:function(){if(j.method){j.page++;j.options.page=j.page;this[j.method](j.arg,j.options,j.callback)}return this},time:H,ify:G,filter:z,cancel:function(){for(var b in t)m[b]=function(){return function(a){u(a)}}(b.replace(f,""));t={};return this},reset:function(){r=B;j.method=""},render:C,debug:function(b){for(var a in b)r[a]=b[a];return this},cache:function(b){q=b==n?true:b;if(!m.JSON||!m.sessionStorage)q=false}};
l[f].custom("search");l[f].custom("timeline");l[f].custom("favs")})("twitterlib",this);