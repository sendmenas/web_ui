(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	com.dukascopy.api.visualController.DocumentController.preload(["view/main.html"],function(error) {
		haxe.Log.trace("--> LOADED",{ fileName : "Main.hx", lineNumber : 16, className : "Main", methodName : "main"});
		var authScreen = new controllers.AuthScreenController();
		authScreen.setParent(window.document.body);
	});
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
var com = {};
com.dukascopy = {};
com.dukascopy.api = {};
com.dukascopy.api.Dcc = function() { };
com.dukascopy.api.Dcc.__name__ = true;
com.dukascopy.api.Dcc.getByID = function(id) {
	return window.document.getElementById(id);
};
com.dukascopy.api.Dcc.iterator = function(arr,callback) {
	if(callback == null) return;
	if(arr == null) return;
	for(var n in arr){ if(!callback(n,arr[n]))break;}
};
com.dukascopy.api.Dcc.foreach = function(arr,callback) {
	if(callback == null) return;
	if(arr == null) return;
	for(var n=0;n<arr.length;n++){ if(!callback(n,arr[n]))break;}
};
com.dukascopy.api.Dcc.loop = function(start,end,step,callback) {
	if(callback == null) return;
	for(var n=start;n<end;n+=step){ if(!callback(n))break;}
};
com.dukascopy.api.Dcc.getDiv = function() {
	var _this = window.document;
	return _this.createElement("div");
};
com.dukascopy.api.Dcc.getStyle = function() {
	var _this = window.document;
	return _this.createElement("style");
};
com.dukascopy.api.Dcc.clearElement = function(view) {
	if(view == null) return;
	while(view.firstChild != null) view.removeChild(view.firstChild);
};
com.dukascopy.api.Dcc["int"] = function(param) {
	return parseInt(param);
};
com.dukascopy.api.Dcc.setInterval = function(callBack,time) {
	setInterval(callBack,time);
};
com.dukascopy.api.Dcc.inArray = function(array,field,value) {
	if(array == null) return null;
	var found = null;
	com.dukascopy.api.Dcc.foreach(array,function(i,obj) {
		if(field == null) {
			if(obj == value) {
				found = obj;
				return false;
			}
			return true;
		}
		if(field in obj && obj[field]==value) {
			found = obj;
			return false;
		}
		return true;
	});
	return found;
};
com.dukascopy.api.Dcc.getValue = function(data,name) {
	return data[name];
};
com.dukascopy.api.Dcc.setValue = function(obj,i,value) {
	if(obj == null) return;
	if(i == null) return;
	obj[i]=value;
};
com.dukascopy.api.Dcc.removeFromArray = function(array,value) {
	var res = false;
	com.dukascopy.api.Dcc.foreach(array,function(i,value1) {
		if(array == value1) {
			array.splice(i,1);
			res = true;
			return false;
		}
		return true;
	});
	return res;
};
com.dukascopy.api.Dcc.getTimestamp = function() {
	return +new Date();
};
com.dukascopy.api.ServerConfig = function() { };
com.dukascopy.api.ServerConfig.__name__ = true;
com.dukascopy.api.crypter = {};
com.dukascopy.api.crypter.Crypter = function() { };
com.dukascopy.api.crypter.Crypter.__name__ = true;
com.dukascopy.api.crypter.Crypter.parseImageKey = function(securityKey) {
	if(securityKey == null) return null;
	if(securityKey.length % 3 != 0) return null;
	var tiles = [];
	var rpl = new EReg("\\.","g");
	var n = 0;
	while(n < securityKey.length) {
		tiles.push(com.dukascopy.api.crypter.Crypter.getNumberByBase(rpl.replace(HxOverrides.substr(securityKey,n,3),"")));
		n += 3;
	}
	return tiles;
};
com.dukascopy.api.crypter.Crypter.decryptRawImage = function(source,key) {
	var img;
	var _this = window.document;
	img = _this.createElement("img");
	img.src = source;
	var src;
	var _this1 = window.document;
	src = _this1.createElement("canvas");
	src.width = img.width;
	src.height = img.height;
	src.getContext("2d").drawImage(img,0,0);
	var res;
	var _this2 = window.document;
	res = _this2.createElement("canvas");
	res.width = src.width;
	res.height = src.height;
	var tilesRow = Math.floor(Math.sqrt(key.length));
	var tileW = Math.floor(src.width / tilesRow);
	var tileH = Math.floor(src.height / tilesRow);
	var inRow = Math.floor(src.width / tileW);
	var ctx = res.getContext("2d");
	var z = key.length;
	var n = 0;
	var py = 0;
	var px = 0;
	var srcY = 0;
	var srcX = 0;
	while(n < z) {
		srcX = Math.floor(n % inRow * tileW);
		srcY = Math.floor(n / inRow) * tileH;
		px = Math.floor(key[n] % inRow * tileW);
		py = Math.floor(key[n] / inRow) * tileH;
		ctx.drawImage(src,px,py,tileW,tileH,srcX,srcY,tileW,tileH);
		n++;
	}
	return res.toDataURL("image/png");
};
com.dukascopy.api.crypter.Crypter.decryptImage = function(url,key,callBack) {
	var img;
	var _this = window.document;
	img = _this.createElement("img");
	if(HxOverrides.substr(url,0,6) != "https:") url = "https:" + url;
	var __onLoaded = function(e) {
		var src;
		var _this1 = window.document;
		src = _this1.createElement("canvas");
		src.width = img.width;
		src.height = img.height;
		src.getContext("2d").drawImage(img,0,0);
		var res;
		var _this2 = window.document;
		res = _this2.createElement("canvas");
		res.width = src.width;
		res.height = src.height;
		var tilesRow = Math.floor(Math.sqrt(key.length));
		var tileW = Math.floor(src.width / tilesRow);
		var tileH = Math.floor(src.height / tilesRow);
		var inRow = Math.floor(src.width / tileW);
		var ctx = res.getContext("2d");
		var z = key.length;
		var n = 0;
		var py = 0;
		var px = 0;
		var srcY = 0;
		var srcX = 0;
		while(n < z) {
			srcX = Math.floor(n % inRow * tileW);
			srcY = Math.floor(n / inRow) * tileH;
			px = Math.floor(key[n] % inRow * tileW);
			py = Math.floor(key[n] / inRow) * tileH;
			ctx.drawImage(src,px,py,tileW,tileH,srcX,srcY,tileW,tileH);
			n++;
		}
		callBack(res.toDataURL("image/png"));
	};
	img.crossOrigin = "Anonymous";
	img.onload = __onLoaded;
	if(window.airgui) {
		var il = window.imageLoader;
		il(url,function(base) {
			if(base == null) return;
			img.src = base;
		});
		return;
	} else img.src = url;
};
com.dukascopy.api.crypter.Crypter.cryptImage = function(img,key,maxW,maxH,prevW,prevH) {
	if(prevH == null) prevH = 320;
	if(prevW == null) prevW = 320;
	if(maxH == null) maxH = 1080;
	if(maxW == null) maxW = 1920;
	var minW = 140;
	var minH = 140;
	if(key == null) return null;
	if(img == null) return null;
	if((function($this) {
		var $r;
		var aNeg = minW < 0;
		var bNeg = maxW < 0;
		$r = aNeg != bNeg?aNeg:minW > maxW;
		return $r;
	}(this))) maxW = minW;
	if((function($this) {
		var $r;
		var aNeg1 = minH < 0;
		var bNeg1 = maxH < 0;
		$r = aNeg1 != bNeg1?aNeg1:minH > maxH;
		return $r;
	}(this))) maxH = minH;
	var src;
	var _this = window.document;
	src = _this.createElement("canvas");
	var targetW = img.width;
	var targetH = img.height;
	if(img.width > minW && img.height > minH) {
		if((function($this) {
			var $r;
			var a = img.width;
			var aNeg2 = a < 0;
			var bNeg2 = maxW < 0;
			$r = aNeg2 != bNeg2?aNeg2:a > maxW;
			return $r;
		}(this)) || (function($this) {
			var $r;
			var a1 = img.height;
			var aNeg3 = a1 < 0;
			var bNeg3 = maxH < 0;
			$r = aNeg3 != bNeg3?aNeg3:a1 > maxH;
			return $r;
		}(this))) {
			targetW = maxW;
			targetH = Math.ceil((function($this) {
				var $r;
				var $int = img.height * maxW;
				$r = $int < 0?4294967296.0 + $int:$int + 0.0;
				return $r;
			}(this)) / (function($this) {
				var $r;
				var int1 = img.width;
				$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
				return $r;
			}(this)));
			if((function($this) {
				var $r;
				var aNeg4 = targetH < 0;
				var bNeg4 = maxH < 0;
				$r = aNeg4 != bNeg4?aNeg4:targetH > maxH;
				return $r;
			}(this))) {
				targetW = Math.ceil((function($this) {
					var $r;
					var int2 = img.width * maxH;
					$r = int2 < 0?4294967296.0 + int2:int2 + 0.0;
					return $r;
				}(this)) / (function($this) {
					var $r;
					var int3 = img.height;
					$r = int3 < 0?4294967296.0 + int3:int3 + 0.0;
					return $r;
				}(this)));
				targetH = maxH;
			}
		}
	}
	if(img.width < minW || img.height < minH) {
		targetW = minW;
		targetH = Math.ceil(img.height * minW / img.width);
		if(targetH > minH) {
			targetW = Math.ceil(img.width * minH / img.height);
			targetH = minH;
		}
		if((function($this) {
			var $r;
			var aNeg5 = targetW < 0;
			var bNeg5 = maxW < 0;
			$r = aNeg5 != bNeg5?aNeg5:targetW > maxW;
			return $r;
		}(this))) targetW = maxW;
		if((function($this) {
			var $r;
			var aNeg6 = targetH < 0;
			var bNeg6 = maxH < 0;
			$r = aNeg6 != bNeg6?aNeg6:targetH > maxH;
			return $r;
		}(this))) targetH = maxH;
	}
	var tilesRow = Math.floor(Math.sqrt(key.length));
	var tw = Math.floor(targetW / tilesRow) * tilesRow;
	var th = Math.floor(targetH / tilesRow) * tilesRow;
	src.width = tw;
	src.height = th;
	var tx = Math.round((targetW - tw) * .5);
	var ty = Math.round((targetH - th) * .5);
	src.getContext("2d").drawImage(img,0,0,img.width,img.height,-tx,-ty,targetW,targetH);
	var tileW = Math.floor(src.width / tilesRow);
	var tileH = Math.floor(src.height / tilesRow);
	var inRow = Math.floor(src.width / tileW);
	var canvas;
	var _this1 = window.document;
	canvas = _this1.createElement("canvas");
	canvas.width = tw;
	canvas.height = th;
	var ctx = canvas.getContext("2d");
	var z = key.length;
	var n = 0;
	var py = 0;
	var px = 0;
	var srcY = 0;
	var srcX = 0;
	while(n < z) {
		srcX = Math.floor(n % inRow * tileW);
		srcY = Math.floor(n / inRow) * tileH;
		px = Math.floor(key[n] % inRow * tileW);
		py = Math.floor(key[n] / inRow) * tileH;
		ctx.drawImage(src,srcX,srcY,tileW,tileH,px,py,tileW,tileH);
		n++;
	}
	return [canvas];
};
com.dukascopy.api.crypter.Crypter.getBaseNumber = function(sourceNumber) {
	var r = sourceNumber % 62;
	var result = "";
	if(sourceNumber - r == 0) result = com.dukascopy.api.crypter.Crypter.base.charAt(r); else result = com.dukascopy.api.crypter.Crypter.getBaseNumber((sourceNumber - r) / 62) + "" + com.dukascopy.api.crypter.Crypter.base.charAt(r);
	return result;
};
com.dukascopy.api.crypter.Crypter.decrypt = function(str,key) {
	if(key == null) return str;
	if(str == null) return null;
	var keyLen = key.length;
	var strLen = str.length;
	if(strLen % 2 != 0) return str;
	var m = 0;
	var n = 0;
	var decoded = "";
	while(m < strLen) {
		var code;
		var i = "";
		var mStep = 2;
		if(str.charAt(m) == "-") {
			i = str.charAt(m + 1) + "" + str.charAt(m + 2) + "" + str.charAt(m + 3);
			code = com.dukascopy.api.crypter.Crypter.getNumberByBase(i);
			mStep = 4;
		} else {
			i = str.charAt(m) + "" + str.charAt(m + 1);
			if(str.charAt(m) == ".") i = str.charAt(m + 1);
			code = com.dukascopy.api.crypter.Crypter.getNumberByBase(i);
		}
		code -= HxOverrides.cca(key,n);
		decoded += String.fromCharCode(code);
		n++;
		if(n == keyLen) n = 0;
		m += mStep;
	}
	return decoded;
};
com.dukascopy.api.crypter.Crypter.crypt = function(str,key) {
	var keyLen = key.length;
	var encoded = "";
	var m = 0;
	var n = 0;
	while(n < str.length) {
		var chr = com.dukascopy.api.crypter.Crypter.getBaseNumber((function($this) {
			var $r;
			var index = n++;
			$r = HxOverrides.cca(str,index);
			return $r;
		}(this)) + HxOverrides.cca(key,m));
		if(chr.length == 1) chr = "." + chr;
		if(chr.length == 3) encoded += "-" + chr; else encoded += chr;
		m++;
		if(m == keyLen) m = 0;
	}
	return encoded;
};
com.dukascopy.api.crypter.Crypter.getNumberByBase = function(baseString) {
	var m = baseString.length - 1;
	var res = 0;
	var pow = 0;
	while(m > -1) res += com.dukascopy.api.crypter.Crypter.base.indexOf(baseString.charAt(m--)) * Math.pow(62,pow++);
	return res;
};
com.dukascopy.api.php = {};
com.dukascopy.api.php.PHPRespond = function(error,errorMsg,data) {
	this.data = null;
	this.errorMsg = "";
	this.error = false;
	this.data = data;
	this.errorMsg = errorMsg;
	this.error = error;
};
com.dukascopy.api.php.PHPRespond.__name__ = true;
com.dukascopy.api.php.PHPRespond.prototype = {
	getData: function() {
		return this.data;
	}
	,getErrorMsg: function() {
		return this.errorMsg;
	}
	,getError: function() {
		return this.error;
	}
	,__class__: com.dukascopy.api.php.PHPRespond
};
com.dukascopy.api.php.Php = function(url) {
	this.key = null;
	this.coreURL = null;
	this.coreURL = url;
};
com.dukascopy.api.php.Php.__name__ = true;
com.dukascopy.api.php.Php.prototype = {
	setAuthKey: function(key) {
		this.key = key;
	}
	,auth_ldap: function(login,pass,devID,appVersion,callback) {
		var data = { login : login, pass : pass, deviceName : "911 admin", devID : devID, appVersion : appVersion, createUser : true};
		this.call("auth.ldap",data,callback);
	}
	,auth_getCurrentUser: function(callback) {
		this.call("auth.getCurrentUser",{ },callback);
	}
	,call: function(method,data,callBack,url,rawRespond,requestMethod,crypt,preloader,dataType) {
		if(crypt == null) crypt = true;
		if(requestMethod == null) requestMethod = "POST";
		if(rawRespond == null) rawRespond = false;
		if(method == null && data == null && rawRespond == false) {
			callBack(new com.dukascopy.api.php.PHPRespond(true,com.dukascopy.api.php.Php.ERROR_NOTHING_TO_LOAD,null));
			return;
		}
		if(url == null) url = this.coreURL;
		if(url == null) {
			callBack(new com.dukascopy.api.php.PHPRespond(true,com.dukascopy.api.php.Php.ERROR_NO_URL,null));
			return;
		}
		var postData = [];
		if(method != null) postData.push({ name : "method", value : method});
		if(this.key != null) postData.push({ name : "key", value : this.key});
		if(data != null) {
			if(crypt == false) {
				var vars = this.createURLVars(data);
				com.dukascopy.api.Dcc.foreach(vars,function(i,obj) {
					postData.push(obj);
					return true;
				});
			} else com.dukascopy.api.Dcc.iterator(data,function(i1,obj1) {
				postData.push({ name : i1, value : obj1});
				return true;
			});
		}
		if(requestMethod == "GET") {
			url += "?";
			com.dukascopy.api.Dcc.foreach(postData,function(i2,obj2) {
				if(i2 > 0) url += "&";
				url += Std.string(obj2.name) + "=" + Std.string(obj2.value);
				return true;
			});
			postData = null;
		}
		var loader = new com.dukascopy.api.php.PhpLoader();
		loader.load(callBack,this.key,url,requestMethod,postData,crypt,rawRespond);
	}
	,createURLVars: function(data) {
		var endres = [];
		var _loop = null;
		_loop = function(d,name) {
			var _g = 0;
			while(_g < d.length) {
				var n = d[_g];
				++_g;
				var val = n.value;
				var type = typeof(val);
				type = type.toLowerCase();
				if(type == "object") {
					var f = Reflect.fields(n.value);
					var inner = [];
					var _g1 = 0;
					while(_g1 < f.length) {
						var m = f[_g1];
						++_g1;
						inner.push({ name : m, value : Reflect.getProperty(n.value,m)});
					}
					if(inner.length > 0) _loop(inner,n.name); else endres.push({ name : name.length < 1?n.name:name + "[" + n.name + "]", value : null});
				} else endres.push({ name : name.length < 1?n.name:name + "[" + n.name + "]", value : n.value});
			}
		};
		var temp = [];
		if(data != null) {
			var f1 = Reflect.fields(data);
			var _g2 = 0;
			while(_g2 < f1.length) {
				var n1 = f1[_g2];
				++_g2;
				temp.push({ name : n1, value : Reflect.field(data,n1)});
			}
		}
		_loop(temp,"");
		return endres;
	}
	,__class__: com.dukascopy.api.php.Php
};
com.dukascopy.api.php.PhpLoader = function() {
	this.loader = null;
	this.loader = new XMLHttpRequest();
	this.loader.onload = $bind(this,this.onLoadEnd);
	this.loader.onerror = $bind(this,this.onError);
	this.loader.onabort = $bind(this,this.onAbort);
};
com.dukascopy.api.php.PhpLoader.__name__ = true;
com.dukascopy.api.php.PhpLoader.fireCallback = function(loader,callBack) {
	var rData = null;
	try {
		rData = JSON.parse(loader.response);
	} catch( err ) {
		if( js.Boot.__instanceof(err,Error) ) {
			if(callBack != null) callBack(new com.dukascopy.api.php.PHPRespond(true,"http..03 Json error",loader.response));
			return;
		} else throw(err);
	}
	var status = rData.status;
	if(!status) {
		if(callBack != null) callBack(new com.dukascopy.api.php.PHPRespond(true,"http..04 No status object",loader.response));
		return;
	}
	if(!Object.prototype.hasOwnProperty.call(rData.status,"error")) {
		if(callBack != null) callBack(new com.dukascopy.api.php.PHPRespond(true,"http..05 No error field in status",rData));
		return;
	}
	if(rData.status.error == true) {
		if(callBack != null) {
			if(Object.prototype.hasOwnProperty.call(rData.status,"errorMsg")) callBack(new com.dukascopy.api.php.PHPRespond(true,rData.status.errorMsg,rData)); else callBack(new com.dukascopy.api.php.PHPRespond(true,rData.status.message,rData));
		}
		return;
	}
	if(!Object.prototype.hasOwnProperty.call(rData,"data")) {
		if(callBack != null) callBack(new com.dukascopy.api.php.PHPRespond(true,"http..06 No data object",rData));
		return;
	}
	if(callBack != null) callBack(new com.dukascopy.api.php.PHPRespond(false,"",rData.data));
};
com.dukascopy.api.php.PhpLoader.prototype = {
	load: function(callBack,key,url,method,data,crypt,rawRespond) {
		if(rawRespond == null) rawRespond = false;
		if(crypt == null) crypt = true;
		if(method == null) method = "POST";
		this.callBack = callBack;
		this.rawRespond = rawRespond;
		this.requestUrl = url;
		var cdata = null;
		if(crypt == true) {
			method = "POST";
			var k = com.dukascopy.api.crypter.Crypter.crypt(haxe.crypto.Md5.encode(key + " " + new Date().getTime()),key).substring(0,32);
			var ddata = { };
			com.dukascopy.api.Dcc.foreach(data,function(i,val) {
				ddata[val.name]=val.value;
				return true;
			});
			var json = JSON.stringify(ddata);
			var tmp = k + "" + com.dukascopy.api.crypter.Crypter.crypt(json,k);
			cdata = tmp;
		}
		this.loader.open(method,this.requestUrl,true);
		if(method == "POST") {
			var form = new FormData();
			if(cdata != null) form.append("cdata",cdata); else com.dukascopy.api.Dcc.foreach(data,function(i1,obj) {
				form.append(obj.name,obj.value);
				return true;
			});
			this.loader.send(form);
		} else this.loader.send();
	}
	,onLoadEnd: function(e) {
		this.finish(false,null);
	}
	,onError: function(e) {
		this.finish(true,"http..01 " + this.loader.statusText);
	}
	,onAbort: function(e) {
		this.finish(true,"http..02 Abort");
	}
	,finish: function(error,errorMessage) {
		if(error == true) {
			if(this.callBack != null) this.callBack(new com.dukascopy.api.php.PHPRespond(error,errorMessage,null));
			return;
		}
		if(this.rawRespond == true) {
			this.callBack(new com.dukascopy.api.php.PHPRespond(false,null,this.loader.response));
			return;
		}
		com.dukascopy.api.php.PhpLoader.fireCallback(this.loader,this.callBack);
	}
	,__class__: com.dukascopy.api.php.PhpLoader
};
com.dukascopy.api.signal = {};
com.dukascopy.api.signal.Signal = function(name) {
	this.needRemoveAll = false;
	this.isInvoking = false;
	this.disabled = false;
	this.methods = [];
	this.delayedAdd = [];
	this.delayedRemove = [];
};
com.dukascopy.api.signal.Signal.__name__ = true;
com.dukascopy.api.signal.Signal.prototype = {
	removeAll: function() {
		if(this.isInvoking) {
			this.needRemoveAll = true;
			return;
		}
		this.methods = [];
	}
	,disable: function(val) {
		this.disabled = val;
	}
	,dispose: function() {
		this.needRemoveAll = false;
		this.methods = [];
		this.delayedAdd = [];
		this.delayedRemove = [];
		this.methods = null;
		this.delayedAdd = null;
		this.delayedRemove = null;
	}
	,add: function(method,source) {
		if(source == null) source = "unknown";
		if(this.methods == null) return;
		if(com.dukascopy.api.Dcc.inArray(this.methods,"method",method) != null) return;
		if(!this.isInvoking) this.methods.push({ method : method, source : source}); else this.delayedAdd.push({ method : method, source : source});
	}
	,invoke: function(args) {
		if(this.methods == null) return;
		if(this.disabled) return;
		this.isInvoking = true;
		var _g = 0;
		var _g1 = this.methods;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			if(m.method != null) {
				if(args != null) m.method(args); else m.method();
			}
		}
		this.isInvoking = false;
		if(this.needRemoveAll) {
			this.needRemoveAll = false;
			this.removeAll();
		}
		if(this.delayedAdd.length > 0) {
			var _g2 = 0;
			var _g11 = this.delayedAdd;
			while(_g2 < _g11.length) {
				var d = _g11[_g2];
				++_g2;
				this.add(d.method,d.source);
			}
			this.delayedAdd = [];
		}
		if(this.delayedRemove.length > 0) {
			var _g3 = 0;
			var _g12 = this.delayedRemove;
			while(_g3 < _g12.length) {
				var d1 = _g12[_g3];
				++_g3;
				this.remove(d1);
			}
			this.delayedRemove = [];
		}
	}
	,remove: function(method) {
		if(this.methods == null) return;
		if(this.isInvoking == true) {
			this.delayedRemove.push(method);
			return;
		}
		var _g = 0;
		var _g1 = this.methods;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			if(m.method == method) {
				HxOverrides.remove(this.methods,m);
				return;
			}
		}
	}
	,__class__: com.dukascopy.api.signal.Signal
};
com.dukascopy.api.visualController = {};
com.dukascopy.api.visualController.DocumentController = function(file,controller,html) {
	this.isReady = false;
	this.root = false;
	this.nodes = [];
	var _g = this;
	if(file == null && controller == null && html == null) return;
	this.file = file;
	this.controller = controller;
	if(file != null) {
		com.dukascopy.api.visualController.DocumentController.loadFile(file,$bind(this,this.onFileLoaded));
		return;
	}
	this.root = true;
	var holder = window.document.body;
	if(file == null && html != null) holder = html;
	com.dukascopy.api.Dcc.foreach(holder.childNodes,function(i,node) {
		var n = node;
		if(n.nodeType == 1) _g.nodes.push(node);
		return true;
	});
	com.dukascopy.api.visualController.DocumentController.attachControllers(this);
};
com.dukascopy.api.visualController.DocumentController.__name__ = true;
com.dukascopy.api.visualController.DocumentController.remove = function(controllers) {
	com.dukascopy.api.Dcc.foreach(controllers,function(i,obj) {
		obj.setParent(null);
		return true;
	});
};
com.dukascopy.api.visualController.DocumentController.preload = function(files,callback) {
	var loaded = 0;
	var __onFileLoaded = function(r) {
		if(r.getError()) {
			callback(true);
			return;
		}
		loaded++;
		if(loaded == files.length) callback(false);
	};
	com.dukascopy.api.Dcc.foreach(files,function(i,file) {
		com.dukascopy.api.visualController.DocumentController.loadFile(file,__onFileLoaded);
		return true;
	});
};
com.dukascopy.api.visualController.DocumentController.loadFile = function(file,callback) {
	if(file == null) {
		haxe.Log.trace("No file to load",{ fileName : "DocumentController.hx", lineNumber : 259, className : "com.dukascopy.api.visualController.DocumentController", methodName : "loadFile"});
		return;
	}
	var cached = com.dukascopy.api.Dcc.inArray(com.dukascopy.api.visualController.DocumentController.cache,"name",file);
	if(cached != null) {
		callback(new com.dukascopy.api.php.PHPRespond(false,null,cached.file));
		return;
	}
	var qItem = com.dukascopy.api.Dcc.inArray(com.dukascopy.api.visualController.DocumentController.queue,"file",file);
	if(qItem != null) {
		haxe.Log.trace("Already loading: " + file,{ fileName : "DocumentController.hx", lineNumber : 277, className : "com.dukascopy.api.visualController.DocumentController", methodName : "loadFile"});
		var found = false;
		if(qItem.callbacks == null) qItem.callbacks = [];
		com.dukascopy.api.Dcc.foreach(qItem.callbacks,function(i,cb) {
			if(cb == callback) {
				found = true;
				return false;
			}
			return true;
		});
		if(found == true) {
			haxe.Log.trace("Callback already added",{ fileName : "DocumentController.hx", lineNumber : 289, className : "com.dukascopy.api.visualController.DocumentController", methodName : "loadFile"});
			return;
		}
		qItem.callbacks.push(callback);
		return;
	} else {
		haxe.Log.trace("First time load: " + file,{ fileName : "DocumentController.hx", lineNumber : 296, className : "com.dukascopy.api.visualController.DocumentController", methodName : "loadFile"});
		qItem = { file : file, callbacks : [callback]};
		com.dukascopy.api.visualController.DocumentController.queue.push(qItem);
	}
	var _callback = function(r) {
		if(com.dukascopy.api.Dcc.inArray(com.dukascopy.api.visualController.DocumentController.cache,"name",file) == null) com.dukascopy.api.visualController.DocumentController.cache.push({ name : file, file : r.getData()});
		var qItem1 = com.dukascopy.api.Dcc.inArray(com.dukascopy.api.visualController.DocumentController.queue,"file",file);
		if(qItem1.callbacks != null) com.dukascopy.api.Dcc.foreach(qItem1.callbacks,function(i1,cb1) {
			if(cb1 != null) cb1(r);
			return true;
		});
	};
	if(com.dukascopy.api.visualController.DocumentController.php == null) com.dukascopy.api.visualController.DocumentController.php = new com.dukascopy.api.php.Php(null);
	com.dukascopy.api.visualController.DocumentController.php.call(null,null,_callback,file,true,"GET",false,null);
};
com.dukascopy.api.visualController.DocumentController.attachControllers = function(doc) {
	var fields = Reflect.fields(doc.controller);
	var attacher = null;
	attacher = function(node) {
		if(node.nodeType != 1) return;
		var element = node;
		var name = element.getAttribute("name");
		var component = element.getAttribute("component");
		var componentClass = null;
		var view = element.getAttribute("view");
		if(component != null) componentClass = eval(component);
		if(name != null) com.dukascopy.api.Dcc.foreach(fields,function(i,f) {
			if(componentClass != null) {
				var componentInstance = new componentClass(element);
				doc.controller['_'+name]=componentInstance;
				element.removeAttribute("component");
				componentClass = null;
				return true;
			}
			if(f == "_" + name) {
				if(doc.controller['_'+name]==null) {
					doc.controller['_'+name]=element;
				}
				return false;
			}
			return true;
		});
		if(view != null) {
			element.removeAttribute("view");
			return;
		}
		if(element.childNodes.length > 0) com.dukascopy.api.Dcc.foreach(element.childNodes,function(i1,nde) {
			attacher(nde);
			return true;
		});
	};
	com.dukascopy.api.Dcc.foreach(doc.nodes,function(i2,element1) {
		attacher(element1);
		return true;
	});
	doc.isReady = true;
	doc.ready();
	if(doc.onReadyCallback != null) doc.onReadyCallback();
};
com.dukascopy.api.visualController.DocumentController.analyzeFile = function(html,doc) {
	var body = html.match(/<body[\s\S]*>([\s\S]*)<\/body>/gi)[0];
	body = com.dukascopy.api.visualController.DocumentController.trimTag(body,"body");
	var holder;
	var _this = window.document;
	holder = _this.createElement("div");
	holder.innerHTML = body;
	while(holder.firstElementChild != null) doc.nodes.push(holder.removeChild(holder.firstElementChild));
	var head = html.match(/<head[\s\S]*>([\s\S]*)<\/head>/gi)[0];
	head = com.dukascopy.api.visualController.DocumentController.trimTag(head,"head");
};
com.dukascopy.api.visualController.DocumentController.trimTag = function(html,tag) {
	var pos = html.indexOf(">",0) + 1;
	html = HxOverrides.substr(html,pos,html.length - tag.length - 3);
	html = html.replace(/[\n\t]*/gi,'');
	return html;
};
com.dukascopy.api.visualController.DocumentController.prototype = {
	parseVariables: function(data) {
		var _g = this;
		var lvl = 0;
		var __parse = null;
		__parse = function(node) {
			lvl++;
			if(node.nodeType == 1) {
				var e = node;
				if(lvl > 1 && e.getAttribute("view") != null) return;
				com.dukascopy.api.Dcc.foreach(node.childNodes,function(i,nde) {
					if(nde.nodeType != 1) {
						var txt = nde.textContent;
						txt = _g.replaceVars(txt,data);
						nde.textContent = txt;
					}
					return true;
				});
				com.dukascopy.api.Dcc.foreach(e.attributes,function(i1,obj) {
					e.setAttribute(obj.name,_g.replaceVars(obj.value,data));
					return true;
				});
				if(node.childNodes.length > 0) com.dukascopy.api.Dcc.foreach(node.childNodes,function(i2,nde1) {
					__parse(nde1);
					return true;
				});
			} else {
				var txt1 = node.textContent;
				txt1 = _g.replaceVars(txt1,data);
				node.textContent = txt1;
			}
		};
		com.dukascopy.api.Dcc.foreach(this.nodes,function(i3,obj1) {
			__parse(obj1);
			return true;
		});
	}
	,replaceVars: function(txt,data) {
		var regex = /(%[^0-9][a-zA-Z\.\_0-9]+%)/g;
		var arr = txt.match(regex);
		if(arr == null || arr.length == 0) return txt;
		com.dukascopy.api.Dcc.foreach(arr,function(i,found) {
			var foundKey = found.substr(1,found.length-2);
			if(foundKey == null) return true;
			if(foundKey.indexOf('.')==-1) {
				if(foundKey in data) {
					txt = txt.replace(found,data[foundKey]);
					return true;
				}
			}
			var tmp = foundKey.split('.');
			var lastLevel = data;
			com.dukascopy.api.Dcc.foreach(tmp,function(i1,obj) {
				if(obj == null || lastLevel == null) return false;
				if(i1 == tmp.length - 1) {
					if(obj in lastLevel) txt = txt.replace(found,lastLevel[obj]);
					return true;
				}
				if(obj in lastLevel) {
					lastLevel = lastLevel[obj];
					return true;
				}
				return false;
			});
			return true;
		});
		return txt;
	}
	,getFirstNode: function() {
		if(this.nodes == null || this.nodes.length == 0) return null;
		if(this.parent == null) return null;
		return this.nodes[0];
	}
	,onFileLoaded: function(r) {
		if(r.getError()) return;
		com.dukascopy.api.visualController.DocumentController.analyzeFile(r.getData(),this);
		if(this.parent != null) this.setParent(this.parent);
		com.dukascopy.api.visualController.DocumentController.attachControllers(this);
	}
	,ready: function() {
	}
	,setParent: function(value,before) {
		if(this.root) return;
		this.parent = value;
		if(value == null) {
			com.dukascopy.api.Dcc.foreach(this.nodes,function(i,element) {
				if(element.parentNode != null) element.remove();
				return true;
			});
			return;
		}
		com.dukascopy.api.Dcc.foreach(this.nodes,function(i1,element1) {
			if(before != null) value.insertBefore(element1,before); else value.appendChild(element1);
			return true;
		});
	}
	,onReady: function(callback) {
		this.onReadyCallback = callback;
	}
	,dispose: function() {
		this.setParent(null);
		this.nodes = null;
		this.controller = null;
		this.onReadyCallback = null;
		this.file = null;
	}
	,__class__: com.dukascopy.api.visualController.DocumentController
};
com.dukascopy.api.visualController.ListItemController = function(file,controller) {
	this.readyFired = false;
	this.wasReady = false;
	this.previous = null;
	this.data = null;
	com.dukascopy.api.visualController.DocumentController.call(this,file,controller);
	this.file = file;
};
com.dukascopy.api.visualController.ListItemController.__name__ = true;
com.dukascopy.api.visualController.ListItemController.__super__ = com.dukascopy.api.visualController.DocumentController;
com.dukascopy.api.visualController.ListItemController.prototype = $extend(com.dukascopy.api.visualController.DocumentController.prototype,{
	ready: function() {
		this.wasReady = true;
		if(this.data == null) return;
		this.itemReady();
	}
	,itemReady: function() {
	}
	,setData: function(data,previous) {
		this.data = data;
		this.previous = previous;
		if(this.wasReady == false) return;
		this.parseVariables(data);
		if(this.readyFired == false) {
			this.readyFired = true;
			this.ready();
		}
	}
	,dispose: function() {
		com.dukascopy.api.visualController.DocumentController.prototype.dispose.call(this);
		this.data = null;
		this.previous = null;
	}
	,setPrevious: function(previous) {
		this.previous = previous;
	}
	,__class__: com.dukascopy.api.visualController.ListItemController
});
com.dukascopy.components = {};
com.dukascopy.components.Component = function(view,controller) {
	com.dukascopy.components.Component.initCss();
	if(view != null) this.view = view;
	com.dukascopy.api.visualController.DocumentController.call(this,null,controller,view);
};
com.dukascopy.components.Component.__name__ = true;
com.dukascopy.components.Component.initCss = function() {
	if(com.dukascopy.components.Component.cssInited == true) return;
	com.dukascopy.components.Component.cssInited = true;
	var link;
	var _this = window.document;
	link = _this.createElement("link");
	link.rel = "stylesheet";
	link.href = "data:text/css;base64, " + com.dukascopy.components.Component.components_css;
	var links = window.document.head.getElementsByTagName("link");
	if(links.length == 0) window.document.head.appendChild(link); else window.document.head.insertBefore(link,links[0]);
};
com.dukascopy.components.Component.__super__ = com.dukascopy.api.visualController.DocumentController;
com.dukascopy.components.Component.prototype = $extend(com.dukascopy.api.visualController.DocumentController.prototype,{
	startWatching: function() {
		window.addEventListener("mousedown",$bind(this,this.onDocumentClicked));
	}
	,stopWatching: function() {
		window.removeEventListener("mousedown",$bind(this,this.onDocumentClicked));
	}
	,onDocumentClicked: function(e) {
		var p = e.target;
		if(p == this.view) return;
		if(p == null) {
			this.close();
			return;
		}
		p = p.parentElement;
		while(p != null) {
			if(p == this.view) return;
			p = p.parentElement;
		}
		this.close();
	}
	,close: function() {
		if(this.view.parentElement != null) {
			this.stopWatching();
			this.view.parentElement.removeChild(this.view);
		}
	}
	,__class__: com.dukascopy.components.Component
});
com.dukascopy.components.Dropbox = function(view) {
	this.value = null;
	this.onChange = null;
	this.selected = null;
	this._dropboxValues = null;
	this._dropboxSelection = null;
	com.dukascopy.components.Component.call(this,view,this);
};
com.dukascopy.components.Dropbox.__name__ = true;
com.dukascopy.components.Dropbox.setCSS = function() {
	if(com.dukascopy.components.Dropbox.css != null) return;
	var _this = window.document;
	com.dukascopy.components.Dropbox.css = _this.createElement("style");
};
com.dukascopy.components.Dropbox.__super__ = com.dukascopy.components.Component;
com.dukascopy.components.Dropbox.prototype = $extend(com.dukascopy.components.Component.prototype,{
	ready: function() {
		var _g = this;
		com.dukascopy.components.Component.prototype.ready.call(this);
		this.view.classList.add("DCComponent");
		this.view.classList.add("DCDropBox");
		this._dropboxSelection.onclick = function(e) {
			if(_g._dropboxValues.style.display != null && _g._dropboxValues.style.display == "block") {
				_g.view.removeAttribute("closed");
				_g._dropboxValues.style.removeProperty("display");
				_g.stopWatching();
			} else {
				_g.view.setAttribute("closed","1");
				_g._dropboxValues.style.display = "block";
				_g.startWatching();
			}
		};
		com.dukascopy.api.Dcc.loop(0,this._dropboxValues.childNodes.length,1,function(i) {
			var node = _g._dropboxValues.childNodes.item(i);
			if(node == null || node.nodeType != 1) return true;
			var el = node;
			el.onclick = function(e1) {
				_g.setSelection(el);
				_g.close();
			};
			if(el.getAttribute("selected") != null) _g.setSelection(el);
			return true;
		});
		com.dukascopy.components.Dropbox.setCSS();
	}
	,setSelection: function(el,fireCallback) {
		if(fireCallback == null) fireCallback = true;
		if(this.selected != null) this.selected.removeAttribute("selected");
		this.selected = el;
		this._dropboxSelection.innerHTML = this.selected.innerHTML;
		this.value = this.selected.getAttribute("value");
		el.setAttribute("selected","1");
		if(this.onChange != null && fireCallback) this.onChange(this.value);
	}
	,close: function() {
		this.stopWatching();
		this.view.removeAttribute("closed");
		this._dropboxValues.style.removeProperty("display");
	}
	,setValue: function(val,fireCallback) {
		if(fireCallback == null) fireCallback = false;
		var _g = this;
		if(this.selected != null) this.selected.removeAttribute("selected");
		if(val == null) {
			this.selected = null;
			this.value = null;
		}
		com.dukascopy.api.Dcc.loop(0,this._dropboxValues.childNodes.length,1,function(i) {
			var node = _g._dropboxValues.childNodes.item(i);
			if(node == null || node.nodeType != 1) return true;
			var el = node;
			if(el.getAttribute("value") == val) _g.setSelection(el,fireCallback);
			return true;
		});
	}
	,__class__: com.dukascopy.components.Dropbox
});
var controllers = {};
controllers.AuthScreenController = function() {
	this.tellID = "testPhoneID";
	this.php = null;
	this.password = null;
	this.digitCode = null;
	this.phoneNumber = null;
	this._password = null;
	this._codePin = null;
	this._phoneNumber = null;
	this._cancel = null;
	this._login = null;
	this._requestSmsCode = null;
	this._requestCodeBlock = null;
	this._verifyCodeBlock = null;
	com.dukascopy.api.visualController.DocumentController.call(this,"view/main.html",this);
};
controllers.AuthScreenController.__name__ = true;
controllers.AuthScreenController.__super__ = com.dukascopy.api.visualController.DocumentController;
controllers.AuthScreenController.prototype = $extend(com.dukascopy.api.visualController.DocumentController.prototype,{
	ready: function() {
		com.dukascopy.api.visualController.DocumentController.prototype.ready.call(this);
		haxe.Log.trace("--> READY",{ fileName : "AuthScreenController.hx", lineNumber : 48, className : "controllers.AuthScreenController", methodName : "ready"});
		net.PayManager.getSystemOptions();
		this._requestSmsCode.onclick = $bind(this,this.requestCode);
		this._login.onclick = $bind(this,this.login);
		this._cancel.onclick = $bind(this,this.cancelClick);
	}
	,requestCode: function(evt) {
		var _g = this;
		this.phoneNumber = this._phoneNumber.value;
		if(this.phoneNumber.length > 0) {
			this.php = new com.dukascopy.api.php.Php(com.dukascopy.api.ServerConfig.coreURL);
			this.php.setAuthKey("web");
			this.php.call("auth.requestCode",{ phone : this.phoneNumber, devID : this.tellID},function(r) {
				if(r.getError() == true) return;
				haxe.Log.trace(r.getData(),{ fileName : "AuthScreenController.hx", lineNumber : 69, className : "controllers.AuthScreenController", methodName : "requestCode"});
				_g._verifyCodeBlock.style.display = "flex";
				_g._phoneNumber.value = "";
			});
		}
	}
	,login: function(evt) {
		var _g = this;
		this.digitCode = StringTools.trim(this._codePin.value);
		this.password = this._password.value;
		if(this.digitCode.length > 0) this.php.call("auth.checkCode",{ phone : this.phoneNumber, devID : this.tellID, code : this.digitCode, appVersion : "2", deviceName : "test device"},function(r) {
			if(r.getError() == true) return;
			controllers.AuthScreenController.authKey = r.getData().authKey;
			haxe.Log.trace(_g.phoneNumber,{ fileName : "AuthScreenController.hx", lineNumber : 89, className : "controllers.AuthScreenController", methodName : "login", customParams : [_g.digitCode,_g.password]});
			net.PayManager.callLogin(_g.phoneNumber,_g.digitCode,_g.password);
		});
	}
	,cancelClick: function(evt) {
		this._requestCodeBlock.style.display = "flex";
		this._verifyCodeBlock.style.display = "none";
	}
	,__class__: controllers.AuthScreenController
});
var haxe = {};
haxe.Log = function() { };
haxe.Log.__name__ = true;
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.crypto = {};
haxe.crypto.Md5 = function() {
};
haxe.crypto.Md5.__name__ = true;
haxe.crypto.Md5.encode = function(s) {
	var m = new haxe.crypto.Md5();
	var h = m.doEncode(haxe.crypto.Md5.str2blks(s));
	return m.hex(h);
};
haxe.crypto.Md5.str2blks = function(str) {
	var nblk = (str.length + 8 >> 6) + 1;
	var blks = new Array();
	var blksSize = nblk * 16;
	var _g = 0;
	while(_g < blksSize) {
		var i = _g++;
		blks[i] = 0;
	}
	var i1 = 0;
	while(i1 < str.length) {
		blks[i1 >> 2] |= HxOverrides.cca(str,i1) << (str.length * 8 + i1) % 4 * 8;
		i1++;
	}
	blks[i1 >> 2] |= 128 << (str.length * 8 + i1) % 4 * 8;
	var l = str.length * 8;
	var k = nblk * 16 - 2;
	blks[k] = l & 255;
	blks[k] |= (l >>> 8 & 255) << 8;
	blks[k] |= (l >>> 16 & 255) << 16;
	blks[k] |= (l >>> 24 & 255) << 24;
	return blks;
};
haxe.crypto.Md5.prototype = {
	bitOR: function(a,b) {
		var lsb = a & 1 | b & 1;
		var msb31 = a >>> 1 | b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitXOR: function(a,b) {
		var lsb = a & 1 ^ b & 1;
		var msb31 = a >>> 1 ^ b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitAND: function(a,b) {
		var lsb = a & 1 & (b & 1);
		var msb31 = a >>> 1 & b >>> 1;
		return msb31 << 1 | lsb;
	}
	,addme: function(x,y) {
		var lsw = (x & 65535) + (y & 65535);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return msw << 16 | lsw & 65535;
	}
	,hex: function(a) {
		var str = "";
		var hex_chr = "0123456789abcdef";
		var _g = 0;
		while(_g < a.length) {
			var num = a[_g];
			++_g;
			var _g1 = 0;
			while(_g1 < 4) {
				var j = _g1++;
				str += hex_chr.charAt(num >> j * 8 + 4 & 15) + hex_chr.charAt(num >> j * 8 & 15);
			}
		}
		return str;
	}
	,rol: function(num,cnt) {
		return num << cnt | num >>> 32 - cnt;
	}
	,cmn: function(q,a,b,x,s,t) {
		return this.addme(this.rol(this.addme(this.addme(a,q),this.addme(x,t)),s),b);
	}
	,ff: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,c),this.bitAND(~b,d)),a,b,x,s,t);
	}
	,gg: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,d),this.bitAND(c,~d)),a,b,x,s,t);
	}
	,hh: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(this.bitXOR(b,c),d),a,b,x,s,t);
	}
	,ii: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(c,this.bitOR(b,~d)),a,b,x,s,t);
	}
	,doEncode: function(x) {
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		var step;
		var i = 0;
		while(i < x.length) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			step = 0;
			a = this.ff(a,b,c,d,x[i],7,-680876936);
			d = this.ff(d,a,b,c,x[i + 1],12,-389564586);
			c = this.ff(c,d,a,b,x[i + 2],17,606105819);
			b = this.ff(b,c,d,a,x[i + 3],22,-1044525330);
			a = this.ff(a,b,c,d,x[i + 4],7,-176418897);
			d = this.ff(d,a,b,c,x[i + 5],12,1200080426);
			c = this.ff(c,d,a,b,x[i + 6],17,-1473231341);
			b = this.ff(b,c,d,a,x[i + 7],22,-45705983);
			a = this.ff(a,b,c,d,x[i + 8],7,1770035416);
			d = this.ff(d,a,b,c,x[i + 9],12,-1958414417);
			c = this.ff(c,d,a,b,x[i + 10],17,-42063);
			b = this.ff(b,c,d,a,x[i + 11],22,-1990404162);
			a = this.ff(a,b,c,d,x[i + 12],7,1804603682);
			d = this.ff(d,a,b,c,x[i + 13],12,-40341101);
			c = this.ff(c,d,a,b,x[i + 14],17,-1502002290);
			b = this.ff(b,c,d,a,x[i + 15],22,1236535329);
			a = this.gg(a,b,c,d,x[i + 1],5,-165796510);
			d = this.gg(d,a,b,c,x[i + 6],9,-1069501632);
			c = this.gg(c,d,a,b,x[i + 11],14,643717713);
			b = this.gg(b,c,d,a,x[i],20,-373897302);
			a = this.gg(a,b,c,d,x[i + 5],5,-701558691);
			d = this.gg(d,a,b,c,x[i + 10],9,38016083);
			c = this.gg(c,d,a,b,x[i + 15],14,-660478335);
			b = this.gg(b,c,d,a,x[i + 4],20,-405537848);
			a = this.gg(a,b,c,d,x[i + 9],5,568446438);
			d = this.gg(d,a,b,c,x[i + 14],9,-1019803690);
			c = this.gg(c,d,a,b,x[i + 3],14,-187363961);
			b = this.gg(b,c,d,a,x[i + 8],20,1163531501);
			a = this.gg(a,b,c,d,x[i + 13],5,-1444681467);
			d = this.gg(d,a,b,c,x[i + 2],9,-51403784);
			c = this.gg(c,d,a,b,x[i + 7],14,1735328473);
			b = this.gg(b,c,d,a,x[i + 12],20,-1926607734);
			a = this.hh(a,b,c,d,x[i + 5],4,-378558);
			d = this.hh(d,a,b,c,x[i + 8],11,-2022574463);
			c = this.hh(c,d,a,b,x[i + 11],16,1839030562);
			b = this.hh(b,c,d,a,x[i + 14],23,-35309556);
			a = this.hh(a,b,c,d,x[i + 1],4,-1530992060);
			d = this.hh(d,a,b,c,x[i + 4],11,1272893353);
			c = this.hh(c,d,a,b,x[i + 7],16,-155497632);
			b = this.hh(b,c,d,a,x[i + 10],23,-1094730640);
			a = this.hh(a,b,c,d,x[i + 13],4,681279174);
			d = this.hh(d,a,b,c,x[i],11,-358537222);
			c = this.hh(c,d,a,b,x[i + 3],16,-722521979);
			b = this.hh(b,c,d,a,x[i + 6],23,76029189);
			a = this.hh(a,b,c,d,x[i + 9],4,-640364487);
			d = this.hh(d,a,b,c,x[i + 12],11,-421815835);
			c = this.hh(c,d,a,b,x[i + 15],16,530742520);
			b = this.hh(b,c,d,a,x[i + 2],23,-995338651);
			a = this.ii(a,b,c,d,x[i],6,-198630844);
			d = this.ii(d,a,b,c,x[i + 7],10,1126891415);
			c = this.ii(c,d,a,b,x[i + 14],15,-1416354905);
			b = this.ii(b,c,d,a,x[i + 5],21,-57434055);
			a = this.ii(a,b,c,d,x[i + 12],6,1700485571);
			d = this.ii(d,a,b,c,x[i + 3],10,-1894986606);
			c = this.ii(c,d,a,b,x[i + 10],15,-1051523);
			b = this.ii(b,c,d,a,x[i + 1],21,-2054922799);
			a = this.ii(a,b,c,d,x[i + 8],6,1873313359);
			d = this.ii(d,a,b,c,x[i + 15],10,-30611744);
			c = this.ii(c,d,a,b,x[i + 6],15,-1560198380);
			b = this.ii(b,c,d,a,x[i + 13],21,1309151649);
			a = this.ii(a,b,c,d,x[i + 4],6,-145523070);
			d = this.ii(d,a,b,c,x[i + 11],10,-1120210379);
			c = this.ii(c,d,a,b,x[i + 2],15,718787259);
			b = this.ii(b,c,d,a,x[i + 9],21,-343485551);
			a = this.addme(a,olda);
			b = this.addme(b,oldb);
			c = this.addme(c,oldc);
			d = this.addme(d,oldd);
			i += 16;
		}
		return [a,b,c,d];
	}
	,__class__: haxe.crypto.Md5
};
haxe.io = {};
haxe.io.Eof = function() { };
haxe.io.Eof.__name__ = true;
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
var net = {};
net.PayConfig = function() { };
net.PayConfig.__name__ = true;
net.PayLoader = function() {
	this.postString = null;
	this.getString = null;
	this.loader = null;
	this.loader = new XMLHttpRequest();
	this.loader.onload = $bind(this,this.onLoadEnd);
	this.loader.onerror = $bind(this,this.onError);
};
net.PayLoader.__name__ = true;
net.PayLoader.sortAlphaNum = function(arrA,arrB) {
	var a = arrA.key;
	var b = arrB.key;
	var aA = net.PayLoader.reA.replace(a,"");
	var bA = net.PayLoader.reA.replace(b,"");
	if(aA == bA) {
		var aN = Std.parseInt(net.PayLoader.reN.replace(a,""));
		var bN = Std.parseInt(net.PayLoader.reN.replace(b,""));
		if(aN == bN) return 0; else if(aN > bN) return 1; else return -1;
	} else if(aA > bA) return 1; else return -1;
};
net.PayLoader.cryptSHA256HMAC = function(base,key) {
	return window.CryptoJS.HmacSHA256(base,key).toString(window.CryptoJS.enc.Base64);
};
net.PayLoader.prototype = {
	onError: function(e) {
	}
	,finish: function(error,errorMessage) {
		this.callBack(new net.PayResponse(false,null,this.loader.response));
		return;
	}
	,onLoadEnd: function(e) {
		this.finish(false,null);
	}
	,addSignature: function(method,data,url,requestMethod) {
		var addonTime = 0;
		var timestamp = new Date().getTime() + addonTime;
		var nonce = haxe.crypto.Md5.encode(new Date().getTime() + "" + Std.string(Math.random()));
		var variables = null;
		if(data == null) variables = { }; else variables = data;
		if(net.PayConfig.PAY_SESSION_ID != "") variables.session_id = net.PayConfig.PAY_SESSION_ID;
		variables._api_client_id = net.PayConfig.PAY_CLIENT_ID;
		Reflect.setField(variables,"_api_timestamp",Math.round(timestamp / 1000));
		variables._api_nonce = nonce;
		var arr = [];
		var _g = 0;
		var _g1 = Reflect.fields(variables);
		while(_g < _g1.length) {
			var value = _g1[_g];
			++_g;
			arr[arr.length] = { key : encodeURIComponent(value), value : StringTools.urlEncode(Reflect.field(variables,value))};
		}
		arr.sort(net.PayLoader.sortAlphaNum);
		var dataString = "";
		var _g11 = 0;
		var _g2 = arr.length;
		while(_g11 < _g2) {
			var i = _g11++;
			if(dataString != "") dataString += "&";
			dataString += arr[i].key;
			dataString += "=";
			dataString += arr[i].value;
		}
		var endpointURL = url;
		if(HxOverrides.substr(endpointURL,-1,null) == "/" && endpointURL.charAt(0) == "/") url = HxOverrides.substr(url,1,null);
		endpointURL += method;
		var signatureBase = requestMethod.toUpperCase() + "&" + encodeURIComponent(endpointURL) + "&" + encodeURIComponent(dataString);
		var signatureKey = encodeURIComponent(net.PayConfig.PAY_CLIENT_SECRET) + "&" + encodeURIComponent(net.PayConfig.PAY_SESSION_ID);
		var sigKey = net.PayLoader.cryptSHA256HMAC(signatureBase,signatureKey);
		this.getString = method + "?" + dataString + "&_api_signature=" + encodeURIComponent(sigKey);
		this.postString = dataString + "&_api_signature=" + encodeURIComponent(sigKey);
		variables._getString = this.getString;
		variables._postString = this.postString;
		return variables;
	}
	,load: function(method,data,url,requestMethod,callBack) {
		this.callBack = callBack;
		var requestObject = this.addSignature(method,data,url,requestMethod);
		if(requestMethod == "GET") this.loader.open(requestMethod,url + Std.string(requestObject._getString),true);
		switch(requestMethod) {
		case "POST":case "PUT":
			this.loader.open(requestMethod,url + method,true);
			this.loader.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			this.loader.send(requestObject._postString);
			break;
		default:
			this.loader.send();
		}
	}
	,__class__: net.PayLoader
};
net.PayManager = function() {
	this.isWaitingForLoggedIn = false;
};
net.PayManager.__name__ = true;
net.PayManager.init = function() {
	if(net.PayManager.isInitialized) return;
	net.PayManager.isInitialized = true;
	net.PayManager.S_SYSTEM_OPTIONS_READY = new com.dukascopy.api.signal.Signal("PayManager.S_SYSTEM_OPTIONS_READY");
};
net.PayManager.getSystemOptions = function() {
	net.PayServer.call_get_system_options(net.PayManager.onGotOptions);
};
net.PayManager.onGotOptions = function(response) {
	if(response.getError()) haxe.Log.trace("On get options error ",{ fileName : "PayManager.hx", lineNumber : 45, className : "net.PayManager", methodName : "onGotOptions"}); else {
		if(net.PayManager.systemOptions == null) net.PayManager.systemOptions = new net.vo.SystemOptionsVO();
		net.PayManager.systemOptions.update(response.getData());
		net.PayManager.systemOptionsReady = true;
		if(net.PayManager.S_SYSTEM_OPTIONS_READY != null) net.PayManager.S_SYSTEM_OPTIONS_READY.invoke();
	}
};
net.PayManager.callLogin = function(phone,code,password) {
	var data = { };
	data.phone = phone;
	data.password = password;
	data.code = code;
	data.login = "";
	net.PayServer.call_login(data,net.PayManager.onGotLogged);
};
net.PayManager.onGotLogged = function(response) {
	haxe.Log.trace(response.getData(),{ fileName : "PayManager.hx", lineNumber : 69, className : "net.PayManager", methodName : "onGotLogged"});
	haxe.Log.trace(response.getErrorMsg(),{ fileName : "PayManager.hx", lineNumber : 70, className : "net.PayManager", methodName : "onGotLogged"});
};
net.PayManager.prototype = {
	__class__: net.PayManager
};
net.PayResponse = function(error,errorMsg,data) {
	this.data = null;
	this.errorMsg = "";
	this.error = false;
	this.errorCode = -1;
	this.data = JSON.parse(data);
	this.errorMsg = errorMsg;
	this.error = error;
};
net.PayResponse.__name__ = true;
net.PayResponse.prototype = {
	getData: function() {
		return this.data;
	}
	,getErrorMsg: function() {
		return this.errorMsg;
	}
	,getError: function() {
		return this.error;
	}
	,__class__: net.PayResponse
};
net.PayServer = function() { };
net.PayServer.__name__ = true;
net.PayServer.call_get_system_options = function(callBack) {
	net.PayServer.call("system/options",null,null,"GET",callBack);
};
net.PayServer.call_login = function(data,callBack) {
	net.PayServer.call("login",data,null,null,callBack);
};
net.PayServer.call = function(method,data,url,requestMethod,callBack) {
	if(requestMethod == null) requestMethod = "POST";
	haxe.Log.trace("CALL DATA " + Std.string(data),{ fileName : "PayServer.hx", lineNumber : 24, className : "net.PayServer", methodName : "call"});
	var reqUrl = null;
	if(url == null) {
		reqUrl = net.PayConfig.PAY_API_URL;
		if(data == null) data = { method : method};
	} else reqUrl = url;
	var request = new net.PayLoader();
	request.load(method,data,reqUrl,requestMethod,callBack);
	return request;
};
net.vo = {};
net.vo.SystemOptionsVO = function() {
};
net.vo.SystemOptionsVO.__name__ = true;
net.vo.SystemOptionsVO.prototype = {
	update: function(data) {
		if(data == null) return;
		if(Object.prototype.hasOwnProperty.call(data,"currency-list")) this.currencyList = Reflect.field(data,"currency-list");
		if(Object.prototype.hasOwnProperty.call(data,"gtc-text")) this.terms = Reflect.field(data,"gtc-text");
		if(Object.prototype.hasOwnProperty.call(data,"ppcards-currency")) this.ppcardsCurrencies = Reflect.field(data,"ppcards-currency");
		if(Object.prototype.hasOwnProperty.call(data,"max_pwp_limit_amount")) this.max_pwp_limit_amount = Reflect.field(data,"max_pwp_limit_amount");
		if(Object.prototype.hasOwnProperty.call(data,"max_pwp_limit_daily")) this.max_pwp_limit_daily = Reflect.field(data,"max_pwp_limit_daily");
	}
	,__class__: net.vo.SystemOptionsVO
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
com.dukascopy.api.ServerConfig.coreURL = "https://wb-dev.telefision.com/dcc/";
com.dukascopy.api.ServerConfig.wssURL = "ws://socket.telefision.com:443";
com.dukascopy.api.ServerConfig.httpMessageURL = "http://socket.telefision.com:443/api/chat/msg/";
com.dukascopy.api.ServerConfig.STICKER_BASE_URL = "https://dccapi.dukascopy.com/?method=stickers.img&key=web";
com.dukascopy.api.ServerConfig.EMOJI_BASE_URL = "https://telefision.com/dcc/?method=img.emj&key=web";
com.dukascopy.api.ServerConfig.deployedVersion = "{::deployedVersion::}";
com.dukascopy.api.ServerConfig.buildNumber = "{::buildNumber::}";
com.dukascopy.api.ServerConfig.PP_API_TOKENLIFE = 48;
com.dukascopy.api.ServerConfig.scheme = "LIVE";
com.dukascopy.api.ServerConfig.woowzaURL = "rtmp://socket.dukascopy.com/recognition";
com.dukascopy.api.crypter.Crypter.base = "qIWDHpg9FCzUAQNJ8XfML0yORZeY5B4PT7anmkjGE1bv6dxoh3lrS2tVwiscKu";
com.dukascopy.api.php.Php.ERROR_NOTHING_TO_LOAD = "local.01 Nothing to load";
com.dukascopy.api.php.Php.ERROR_NO_URL = "local.02 URL is null";
com.dukascopy.api.visualController.DocumentController.cache = [];
com.dukascopy.api.visualController.DocumentController.queue = [];
com.dukascopy.components.Component.components_css = "@EMBED: D:\\Projects\\js api\\com\\dukascopy\\components\\css\\css.min.css";
com.dukascopy.components.Component.cssInited = false;
net.PayConfig.SHOWING_TYPE_COMPANY = "company";
net.PayConfig.SHOWING_TYPE_NOPINDOS = "nopindos";
net.PayConfig.PAY_PHONE_NUMBER = "";
net.PayConfig.PAY_SESSION_ID = "";
net.PayConfig.VERSION = "002";
net.PayConfig.IS_LIVE = false;
net.PayConfig.PAY_CLIENT_SECRET = "5c2c0c3122c6ef44ea9aa1169bbc99ea";
net.PayConfig.PAY_CLIENT_ID = "7dbc48adf2461520aeb7628d0bbd05eb";
net.PayConfig.PAY_API_URL = "https://pp.dukascopy.com/api/";
net.PayConfig.RTO_LINK = "https://www.dukascopy.com/payrto/";
net.PayConfig.TIMESTAMP_API = "https://pp.dukascopy.com/api/time.php?";
net.PayConfig.SHOW_BUTTON_IN_CHAT = "nopindos";
net.PayLoader.reA = new EReg("[^_a-zA-Z]","g");
net.PayLoader.reN = new EReg("[^_0-9]","g");
net.PayManager.configSetted = false;
net.PayManager.systemOptionsReady = false;
net.PayManager.isInitialized = false;
Main.main();
})();
