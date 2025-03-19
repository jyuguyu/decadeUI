app.import(function (lib, game, ui, get, ai, _status, app) {
	var plugin = {
		name: "character",
		filter: function () {
			return !["chess", "tafang", "stone", "connect"].contains(get.mode());
		},
		content: function (next) {
			app.waitAllFunction(
				[
					function (next) {
						next();
					},

					function (next) {
						lib.init.css(lib.assetURL + "extension/" + app.name + "/" + plugin.name, "main2", next);
					},
				],
				next
			);
		},
		precontent: function () {
			app.reWriteFunction(lib, {
				setIntro: [
					function (args, node) {
						if (get.itemtype(node) === "player") {
							if (lib.config.touchscreen) {
								lib.setLongPress(node, plugin.click.playerIntro);
							} else {
								if (lib.config.right_info) {
									node.oncontextmenu = plugin.click.playerIntro;
								}
							}
							return node;
						}
					},
				],
			});
		},

		click: {
			identity: function (e) {
				e.stopPropagation();
				var player = this.parentNode;
				if (!game.getIdentityList) return;
				if (player.node.guessDialog) {
					player.node.guessDialog.classList.toggle("hidden");
				} else {
					var list = game.getIdentityList(player);
					if (!list) return;
					var guessDialog = ui.create.div(".guessDialog", player);
					var container = ui.create.div(guessDialog);

					lib.setScroll(guessDialog);
					player.node.guessDialog = guessDialog;
				}
			},
			playerIntro: function (e) {
				e.stopPropagation();

				if (plugin.playerDialog) {
					return plugin.playerDialog.show(this);
				}

				var container = ui.create.div(".popup-container.hidden", ui.window, function (e) {
					if (e.target === container) {
						container.hide();
						game.resume2();
					}
				});
				var dialog = ui.create.div(".character-dialog.popped", container);
				var leftPane = ui.create.div(".left", dialog);
				var rightPane = ui.create.div(".right", dialog);

				var xing = ui.create.div(".xing", dialog);
				var biankuangname = ui.create.div(".biankuangname", dialog);
				var mingcheng = ui.create.div(".mingcheng", dialog);
				var dengji = ui.create.div(".dengji", dialog);
				var createButton = function (name, parent) {
					if (!name) return;
					if (!lib.character[name]) return;
					var button = ui.create.button(name, "character", parent, true);
				};
				container.show = function (player) {
					//新加
					var zbdialog = ui.create.div(".zbdialog", dialog);

					var caizhu = ui.create.div(".caizhu", dialog);
					var shanchang = get.config("recentCharacter");
					if (lib.config.extension_十周年UI_ZLLT == true) {
						var leftPane = ui.create.div(".left", dialog);
					} else {
						var leftPane = ui.create.div(".left2", dialog);
					}

					leftPane.style.backgroundImage = player.node.avatar.style.backgroundImage;
					// createButton(name, leftPane.firstChild);
					// createButton(name2, leftPane.firstChild);
					//dialog.classList.add('single');

					(zbdialog.onclick = function () {
						var popuperContainer = ui.create.div(
							".popup-container",
							{
								background: "rgb(0,0,0,0)",
							},
							ui.window
						);
						game.playAudio("../extension/十周年UI/shoushaUI/lbtn/images/SSCD/label.mp3");
						var zbbigdialog = ui.create.div(".zbbigdialog", popuperContainer);

						var guanbi = ui.create.div(".guanbi", popuperContainer, get.translation((innerText = "   ")));
						// 为haoyou3元素添加点击事件监听器，点击时关闭页面
						guanbi.addEventListener("click", function (event) {
							game.playAudio("../extension/十周年UI/shoushaUI/lbtn/images/SSCD/caidan.mp3"); // 可选：播放关闭时的音频
							popuperContainer.delete(200); // 关闭页面或删除对话框容器
							event.stopPropagation(); // 阻止事件冒泡到父元素
						});
					}),
						(caizhu.onclick = function () {
							var popuperContainer = ui.create.div(
								".popup-container",
								{
									background: "rgb(0,0,0,0)",
								},
								ui.window
							);
							game.playAudio("../extension/十周年UI/shoushaUI/lbtn/images/SSCD/label.mp3");

							/* setTimeout(function(){
							     game.playAudio('../extension/十周年UI/shoushaUI/character/SS_ZNQ_wenyang.mp3');
							 },2000)*/

							var bigdialog = ui.create.div(".bigdialog", popuperContainer);

							var kuangkuang1 = ui.create.div(".kuangkuang1", bigdialog);
							var kuangkuang2 = ui.create.div(".kuangkuang2", bigdialog);
							var kuangkuang3 = ui.create.div(".kuangkuang3", bigdialog);
							var kuangkuang4 = ui.create.div(".kuangkuang4", bigdialog);

							var xingbie = ui.create.div(".xingbie", bigdialog);
							var useless = ui.create.div(".useless", bigdialog);
							var nameshutiao = ui.create.div(".nameshutiao", bigdialog);
							nameshutiao.setBackgroundImage("extension/十周年UI/shoushaUI/character/images/" + rarity + ".png");

							var useless2 = ui.create.div(".useless2", bigdialog);
							useless2.setBackgroundImage("extension/十周年UI/shoushaUI/character/images/InfoBg2.png");
							//皮肤框
							var pifuk = ui.create.div(".pifuk", bigdialog);
							pifuk.setBackgroundImage("extension/十周年UI/shoushaUI/character/images/pifuk.png");
							var shutiao2 = ui.create.div(".shutiao2", bigdialog);
							shutiao2.setBackgroundImage("extension/十周年UI/shoushaUI/character/images/shutiao.png");
							/*新增势力*/
							/*    var namegroup = ui.create.div('.namegroup',dialog);
							  namegroup.setBackgroundImage('extension/十周年UI/image/decoration/name_' + group + '.png');
							  */
							//皮肤名
							var pos1 = player.node.avatar.style.backgroundImage.lastIndexOf("/");
							var pos2 = player.node.avatar.style.backgroundImage.lastIndexOf("\\");
							var pos = Math.max(pos1, pos2);
							if (pos < 0) {
								var skinname = player.node.avatar.style.backgroundImage;
							} else {
								var tempPath = player.node.avatar.style.backgroundImage.substring(pos + 1);
								var skinname = tempPath.substring(0, tempPath.lastIndexOf("."));
							}
							if (skinname == player["name"] || skinname == player["name"] + "_shadow" || skinname == player["name"] + "2" || skinname == player["name"] + "3" || skinname == "default_silhouette_male" || skinname == "default_silhouette_female" || skinname == "default_silhouette_double") var pfzwm = "经典形象";
							else var pfzwm = skinname;
							/*var pifuming = ui.create.div('.pifuming', bigdialog, get.translation(innerText = pfzwm+'*'+get.translation(player['name'])));*/
							var pifuming = ui.create.div(".pifuming", bigdialog, get.translation((innerText = pfzwm)));
							var wujiangming = ui.create.div(".wujiangming", bigdialog, get.translation(player["name"]));
							//pifuming.innerHTML=pfzwm+'*'+get.translation(player['name']);
							/*案例 
							'我是昵称' + '<div style="width:16px;height:16px;position:relative;background-image: url(' + lib.assetURL + 'extension/十周年UI/我是图片啦.png); background-size: 100% 100%;"></div>'
							*/
							/*玩家名字*/
							/*原版
							       var wanjiaming = ui.create.div('.wanjiaming', bigdialog, player === game.me ? lib.config.connect_nickname : get.translation(innerText = num = ["氪金抽66", "卡宝真可爱", "蒸蒸日上", "√卡视我如父", "麒麟弓免疫枸杞", "坏可宣（老坏批）", "六千大败而归",
							              "开局酒古锭", "遇事不决刷个乐", "见面两刀喜相逢", "改名出66", "时代的六万五", "韩旭", "司马长衫", "ogx",
							              "狗卡不如无名杀", "王八万", "一拳兀突骨", "开局送神将", "丈八二桃", "装甲车车", "等我喝口酒", "Samuri", "马",
							              "Log-Frunki", "aoe银钱豹", "没有丈八就托管", "无中yyds", "给咸鱼鸽鸽打call", "小零二哟～", "长歌最帅了",
							              "大猫有侠者之风", "布灵布灵❤️", "我爱～摸鱼🐠～", "小寻寻真棒", "呲牙哥超爱笑", "是俺杀哒", "阿七阿七",
							              "祖安·灰晖是龙王", "吃颗桃桃好遗计", "好可宣✓良民", "藏海表锅好", "金乎？木乎？水乎！！", "无法也无天", "西风不识相",
							              "神秘喵酱", "星城在干嘛？", "子鱼今天摸鱼了吗？", "阳光苞里有阳光", "诗笺的小裙裙", "轮回中的消逝", "乱踢jb的云野",
							              "小一是不是...是不是...", "美羊羊爱瑟瑟", "化梦的星辰", "杰哥带你登dua郎", "世中君子人", "叹年华未央", "短咕咕",
							              "洛天依？！", "黄老板是好人～", "来点瑟瑟文和", "鲨鱼配辣椒", "萝卜～好萝卜", "废城君", "E佬细节鬼才",
							              "感到棘手要怀念谁？", "半价小薯片", "JK欧拉欧拉欧拉", "新年快乐", "乔姐带你飞", "12345678？", "缘之空", "小小恐龙", "教主：杀我！", "才思泉涌的司马", "我是好人", "喜怒无常的大宝", "黄赌毒", "阴间杀～秋", "敢于劈瓜的关羽", "暮暮子"].randomGet(1))+'<div style="width:60px;top:2px;height:20px;left:3px;position:relative;background-image: url(' + lib.assetURL + 'extension/十周年UI/shoushaUI/character/images/vip/vip0.png);background-size: 100% 100%;"></div>');   
							              var gonghui = ui.create.div('.gonghui', bigdialog, get.translation(innerText = '公会：' + (num = ['武将美化群', '活动武将群', '萌新代码群', '萌新花园', '无名杀琉璃版', '点草施法小鱼']).randomGet(1))+'<div style="width:40px;top:2px;height:15px;position:relative;left:20px;background-image: url(' + lib.assetURL + 'extension/十周年UI/shoushaUI/character/images/chengyuan.png); background-size: 100% 100%;"></div>');
							   */
							/*修改，感谢猫猫虫的提供的vip代码以及太子之争，素来如此的素材*/
							var wanjiaming = ui.create.div(
								".wanjiaming",
								bigdialog,
								player === game.me
									? lib.config.connect_nickname
									: get.translation(
											(innerText = num =
												[
													"氪金抽66",
													"卡宝真可爱",
													"蒸蒸日上",
													"√卡视我如父",
													"麒麟弓免疫枸杞",
													"坏可宣（老坏批）",
													"六千大败而归",
													"开局酒古锭",
													"遇事不决刷个乐",
													"见面两刀喜相逢",
													"改名出66",
													"时代的六万五",
													"韩旭",
													"司马长衫",
													"ogx",
													"狗卡不如无名杀",
													"王八万",
													"一拳兀突骨",
													"开局送神将",
													"丈八二桃",
													"装甲车车",
													"等我喝口酒",
													"Samuri",
													"马",
													"Log-Frunki",
													"aoe银钱豹",
													"没有丈八就托管",
													"无中yyds",
													"给咸鱼鸽鸽打call",
													"小零二哟～",
													"长歌最帅了",
													"大猫有侠者之风",
													"布灵布灵❤️",
													"我爱～摸鱼🐠～",
													"小寻寻真棒",
													"呲牙哥超爱笑",
													"是俺杀哒",
													"阿七阿七",
													"祖安·灰晖是龙王",
													"吃颗桃桃好遗计",
													"好可宣✓良民",
													"藏海表锅好",
													"金乎？木乎？水乎！！",
													"无法也无天",
													"西风不识相",
													"神秘喵酱",
													"星城在干嘛？",
													"子鱼今天摸鱼了吗？",
													"阳光苞里有阳光",
													"诗笺的小裙裙",
													"轮回中的消逝",
													"乱踢jb的云野",
													"小一是不是...是不是...",
													"美羊羊爱瑟瑟",
													"化梦的星辰",
													"杰哥带你登dua郎",
													"世中君子人",
													"叹年华未央",
													"短咕咕",
													"洛天依？！",
													"黄老板是好人～",
													"来点瑟瑟文和",
													"鲨鱼配辣椒",
													"萝卜～好萝卜",
													"废城君",
													"E佬细节鬼才",
													"感到棘手要怀念谁？",
													"半价小薯片",
													"JK欧拉欧拉欧拉",
													"新年快乐",
													"乔姐带你飞",
													"12345678？",
													"缘之空",
													"小小恐龙",
													"教主：杀我！",
													"才思泉涌的司马",
													"我是好人",
													"喜怒无常的大宝",
													"黄赌毒",
													"阴间杀～秋",
													"敢于劈瓜的关羽",
													"萌新陆逊",
													"猫猫虫",
													"芽衣姐，我不想死---",
													"暮暮子",
												].randomGet(1))
									  )
							);
							var vipimg = document.createElement("div");
							vipimg.id = "vip-img";
							vipimg.style.cssText = `
                width:60px;
                top:2px;
                height:20px;
                left:3px;
                position:relative;
                background-size: 100% 100%;
              `;
							var viptuji = ["vip0", "vip1", "vip2", "vip3", "vip4", "vip5", "vip6", "vip7"];
							vipimg.setBackgroundImage("extension/十周年UI/shoushaUI/character/images/vip/" + viptuji.randomGet() + ".png");
							wanjiaming.appendChild(vipimg);
							/*原版*
							           var gonghui = ui.create.div('.gonghui', bigdialog, get.translation(innerText = '公会：' + (num = ['武将美化群', '活动武将群', '萌新代码群', '萌新花园',  '爱门',  '美图交流群',  '无名杀十周年样式',  '无名杀主题样式', '无名杀琉璃版', '点草施法小鱼']).randomGet(1))+'<div style="width:40px;top:2px;height:15px;position:relative;left:20px;background-image: url(' + lib.assetURL + 'extension/十周年UI/shoushaUI/character/images/chengyuan.png); background-size: 100% 100%;"></div>');
							*/
							/*修改*/
							var gonghui = ui.create.div(".gonghui", bigdialog, get.translation((innerText = "公会：" + (num = ["武将美化群", "活动武将群", "萌新代码群", "萌新花园", "爱门", "爱莉爱莉爱", "小爱莉の动物园", "Ciallo～(∠・ω< )⌒★", "美图交流群", "无名杀十周年样式", "无名杀主题样式", "💎备用💎", "无名杀琉璃版", "点草施法小鱼"]).randomGet(1))));
							var gonghuiimg = document.createElement("div");
							gonghuiimg.id = "gonghui-img";
							gonghuiimg.style.cssText = `
                width:40px;
                top:2px;
                height:15px;
                left:20px;
                position:relative;
                background-size: 100% 100%;
              `;
							var gonghuituji = ["成员", "副会长", "会长"];
							gonghuiimg.setBackgroundImage("extension/十周年UI/shoushaUI/character/images/gonghui/" + gonghuituji.randomGet() + ".png");
							gonghui.appendChild(gonghuiimg);

							var xinyu = ui.create.div(".xinyu", bigdialog, get.translation((innerText = (num = Math.floor(Math.random() * (999 - 1 + 1) + 99)) + "<br>" + "信誉")));
							var meili = ui.create.div(".meili", bigdialog, get.translation((innerText = (num = Math.floor(Math.random() * (999 - 1 + 1) + 99)) + "<br>" + "魅力")));
							var shouhu = ui.create.div(".shouhu", bigdialog, get.translation((innerText = (num = Math.floor(Math.random() * (999 - 1 + 1) + 999)) + "<br>" + "守护")));
							var wujiang1 = ui.create.div(".wujiang1", bigdialog, get.translation((innerText = (num = Math.floor(Math.random() * (999 - 1 + 1) + 1000)) + "<br>" + "武将")));
							var pifu1 = ui.create.div(".pifu1", bigdialog, get.translation((innerText = (num = Math.floor(Math.random() * (999 - 1 + 1) + 3000)) + "<br>" + "皮肤")));
							var jiangling = ui.create.div(".jiangling", bigdialog, get.translation((innerText = (num = Math.floor(Math.random() * (99 - 1 + 1) + 10)) + "<br>" + "将灵")));
							var changyongwujiang = ui.create.div(".changyongwujiang", bigdialog, get.translation((innerText = "武将展示")));
							/*称号*/
							var minichenghao = ui.create.div(".minichenghao", bigdialog);
							var chenghaotu = ["不世之功", "等阶至尊", "斗地主之王", "高山流水", "冠秀绝代", "国战霸主", "赫赫战功", "唤灵魁首", "君子之交", "祈愿之星", "契合金兰", "身份霸主", "试道勇者", "统率霸主", "突破·帝皇境十变", "突破·轮回境三变", "突破·涅槃境五变", "突破·神王境九变", "突破·生死境四变", "突破·虚神境七变", "突破·玄幽境一变", "突破·真仙境八变", "万千宠爱", "万砂归宗", "唯我独尊·证道王者", "臻玉鎏金", "志同道合", "总角之好"];
							minichenghao.setBackgroundImage("extension/十周年UI/shoushaUI/character/images/chenghao/" + chenghaotu.randomGet() + ".png");
							/*拜师*/
							var baishi = ui.create.div(".baishi", bigdialog);
							var baishitu = ["b1", "b2", "b3"];
							baishi.setBackgroundImage("extension/十周年UI/shoushaUI/character/images/baishi/" + baishitu.randomGet() + ".png");
							/*历史最高*/
							var wngs = ui.create.div(".wngs", bigdialog);
							var wngstu = ["s1", "s2", "s3", "s4", "s5", "s6"];
							wngs.setBackgroundImage("extension/十周年UI/shoushaUI/character/images/wngs/" + wngstu.randomGet() + ".png"); /*将灯*/
							var deng = ui.create.div(".deng", bigdialog);
							var dengto = ["d1", "d2", "d3", "d4", "d5", "d6", "d7"];
							deng.setBackgroundImage("extension/十周年UI/shoushaUI/character/images/deng/" + dengto.randomGet() + ".png");
							/*关闭*/
							var haoyou3 = ui.create.div(".haoyou3", bigdialog, get.translation((innerText = "   ")));
							// 为haoyou3元素添加点击事件监听器，点击时关闭页面
							haoyou3.addEventListener("click", function (event) {
								game.playAudio("../extension/十周年UI/shoushaUI/lbtn/images/SSCD/caidan.mp3"); // 可选：播放关闭时的音频
								popuperContainer.delete(200); // 关闭页面或删除对话框容器
								event.stopPropagation(); // 阻止事件冒泡到父元素
							});

							//var shanchang = get.config('recentCharacter');
							var shanchang4 = ui.create.div(".shanchang4", bigdialog);
							shanchang4.style.backgroundImage = player.node.avatar.style.backgroundImage;

							/*var shanchang = ["bailingyun", "baosanniang", "beimihu", "bianyue", "caizhenji", "caohua", "caojinyu", "caoxian", "caoxiancaohua", "caoyi", "caoying", "clan_xuncai", 'clan_zhongyan', 'mb_guozhao', 'dc_yuezhoufei', 'dongwan', 'dongxie', 'duanqiaoxiao', 'dufuren', 'luyi', 'luyusheng', 'lvlingqi', 'ol_caifuren', 'ol_bianfuren', 'ol_dingshangwan', 'ol_wangyi', 'ol_zhangchunhua', 'quanhuijie', 'sb_xiahoushi', 'sb_sunshangxiang', 'sb_zhenji', 'sb_zhurong', 'shen_caocao', 'shen_caopi', 'shen_dengai', 'shen_dianwei', 'shen_diaochan', "shen_ganning", "shen_guanyu", "shen_guojia", "shen_huatuo", "shen_jiangwei", "shen_liubei", "shen_lusu", "shen_luxun", "shen_lvbu", "shen_lvmeng", "shen_machao", "shen_simayi", "shen_sunce", "shen_sunquan", "shen_taishici", "shen_zhangfei", "shen_xunyu", "shen_zhangjiao", "shen_zhangliao", "shen_zhaoyun", "shen_zhenji", "shen_zhouyu", "shen_zhugeliang", "wu_guanyu", "wu_luxun","wu_zhugeliang"];

							
							shanchang4.onclick = function () {           
							shanchang4.setBackgroundImage("image/character/" + shanchang.randomGet() + ".jpg");
							};          
							shanchang4.setBackgroundImage("image/character/" + shanchang.randomGet() + ".jpg");*/
							var minixingxiang = ui.create.div(".minixingxiang", bigdialog);
							//minixingxiang.style.backgroundImage = player.node.avatar.style.backgroundImage;
							//var houzhui = Math.floor(Math.random() * 5)
							var xingxiangtu = ["xingxiang0", "xingxiang1", "xingxiang2", "xingxiang3", "xingxiang4", "xingxiang5"];
							minixingxiang.setBackgroundImage("extension/十周年UI/shoushaUI/character/images/" + xingxiangtu.randomGet() + ".png");
						});

					//通过势力判断技能框的背景颜色
					var extensionPath = lib.assetURL + "extension/十周年UI/shoushaUI/";
					var group = player.group;
					if (group != "wei" && group != "shu" && group != "wu" && group != "qun" && group != "ye" && group != "jin" && group != "daqin" && group != "western" && group != "shen" && group != "key" && group != "Han" && group != "qin") group = "default";
					var url = extensionPath + "character/images/yemian.png";
					dialog.style.backgroundImage = 'url("' + url + '")';
					var skin1 = ui.create.div(".skin1", dialog);
					var skin2 = ui.create.div(".skin2", dialog);

					//判断是否隐藏，以及获取主副将的姓名
					var name = player.name1 || player.name;
					var name2 = player.name2;
					if (player.classList.contains("unseen") && player !== game.me) {
						name = "unknown";
					}
					if (player.classList.contains("unseen2") && player !== game.me) {
						name2 = "unknown";
					}
					//主将立绘
					var playerSkin;
					if (name != "unknown") {
						playerSkin = player.style.backgroundImage;
						if (!playerSkin) playerSkin = player.childNodes[0].style.backgroundImage;
						let originalPath = "";
						if (playerSkin.indexOf('url("') == 0) {
							originalPath = playerSkin.slice(5, playerSkin.indexOf('")'));
						} else if (playerSkin.indexOf("url('") == 0) {
							originalPath = playerSkin.slice(5, playerSkin.indexOf("')"));
						}
						let testImg = new Image();
						testImg.onerror = function () {
							skin1.style.backgroundImage = playerSkin;
						};
						testImg.onload = function () {
							skin1.style.backgroundImage = 'url("' + this.src + '")';
						};
						testImg.src = originalPath.replace(/image\/character/, "image/lihui");
					} else {
						var url = extensionPath + "character/images/unknown.png";
						skin1.style.backgroundImage = 'url("' + url + '")';
					}
					//副将立绘
					if (name2) {
						var playerSkin2;
						if (name2 != "unknown") {
							playerSkin2 = player.childNodes[1].style.backgroundImage;
							let originalPath = "";
							if (playerSkin2.indexOf('url("') == 0) {
								originalPath = playerSkin2.slice(5, playerSkin2.indexOf('")'));
							} else if (playerSkin2.indexOf("url('") == 0) {
								originalPath = playerSkin2.slice(5, playerSkin2.indexOf("')"));
							}
							let testImg = new Image();
							testImg.onerror = function () {
								skin2.style.backgroundImage = playerSkin2;
							};
							testImg.onload = function () {
								skin2.style.backgroundImage = 'url("' + this.src + '")';
							};
							testImg.src = originalPath.replace(/image\/character/, "image/lihui");
						} else {
							var url = extensionPath + "character/images/unknown.png";
							skin2.style.backgroundImage = 'url("' + url + '")';
						}
					}

					//等阶。适配最新版千幻
					var rarity = game.getRarity(name);
					if (!rarity) rarity = "junk";
					var pe = ui.create.div(".pe1", dialog);
					var url;
					if (lib.config["extension_千幻聆音_enable"]) {
						var temp;
						switch (game.qhly_getSkinLevel(name, game.qhly_getSkin(name), true, false)) {
							case "xiyou":
								temp = "rare";
								break;
							case "shishi":
								temp = "epic";
								break;
							case "chuanshuo":
								temp = "legend";
								break;
							case "putong":
								temp = "common";
								break;
							case "dongtai":
								temp = "legend";
								break;
							case "jueban":
								temp = "unique";
								break;
							case "xianding":
								temp = "restrictive";
								break;
							default:
								temp = "junk";
						}
						url = extensionPath + "character/images/pe_" + temp + ".png";
					} else url = extensionPath + "character/images/pe_" + rarity + ".png";
					pe.style.backgroundImage = 'url("' + url + '")';
					var value;
					if (lib.config["extension_千幻聆音_enable"]) {
						value = game.qhly_getSkin(name);
						if (value) value = value.substring(0, value.lastIndexOf("."));
						else value = "经典形象";
					} else value = "经典形象";
					var pn = ui.create.div(".pn1");
					/* var pn= ui.create.div('.pn1',value+'*'+get.translation(name));*/
					pe.appendChild(pn);

					/*新增龙框*/
					var longkuang = ui.create.div(".longkuang", dialog);

					longkuang.setBackgroundImage("extension/十周年UI/shoushaUI/character/images/longkuang/" + group + ".png");

					/*level等级第一页*/
					var level = ui.create.div(".level", dialog);
					var leveltu = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
					level.setBackgroundImage("extension/十周年UI/shoushaUI/character/images/level/" + leveltu.randomGet() + ".png");
					//新增技能框
					var wjkuang = ui.create.div(".wjkuang", dialog);

					wjkuang.setBackgroundImage("extension/十周年UI/shoushaUI/character/images/jineng.png");
					//武将技能展示
					var jineng = ui.create.div(".jineng", dialog, get.translation((innerText = "武将技能")));
					//修改第一页武将姓名
					var wjname = ui.create.div(".wjname", dialog, get.translation(player["name"]));
					//复用第二页面得随机名字
					var wanjiaming2 = ui.create.div(
						".wanjiaming2",
						dialog,
						player === game.me
							? lib.config.connect_nickname
							: get.translation(
									(innerText = num =
										[
											"氪金抽66",
											"卡宝真可爱",
											"蒸蒸日上",
											"√卡视我如父",
											"麒麟弓免疫枸杞",
											"坏可宣（老坏批）",
											"六千大败而归",
											"开局酒古锭",
											"遇事不决刷个乐",
											"见面两刀喜相逢",
											"改名出66",
											"时代的六万五",
											"韩旭",
											"司马长衫",
											"ogx",
											"狗卡不如无名杀",
											"王八万",
											"一拳兀突骨",
											"开局送神将",
											"丈八二桃",
											"装甲车车",
											"等我喝口酒",
											"Samuri",
											"马",
											"Log-Frunki",
											"aoe银钱豹",
											"没有丈八就托管",
											"无中yyds",
											"给咸鱼鸽鸽打call",
											"小零二哟～",
											"长歌最帅了",
											"大猫有侠者之风",
											"布灵布灵❤️",
											"我爱～摸鱼🐠～",
											"小寻寻真棒",
											"呲牙哥超爱笑",
											"是俺杀哒",
											"阿七阿七",
											"祖安·灰晖是龙王",
											"吃颗桃桃好遗计",
											"好可宣✓良民",
											"藏海表锅好",
											"金乎？木乎？水乎！！",
											"无法也无天",
											"西风不识相",
											"神秘喵酱",
											"星城在干嘛？",
											"子鱼今天摸鱼了吗？",
											"阳光苞里有阳光",
											"诗笺的小裙裙",
											"轮回中的消逝",
											"乱踢jb的云野",
											"小一是不是...是不是...",
											"美羊羊爱瑟瑟",
											"化梦的星辰",
											"杰哥带你登dua郎",
											"世中君子人",
											"叹年华未央",
											"短咕咕",
											"洛天依？！",
											"黄老板是好人～",
											"来点瑟瑟文和",
											"鲨鱼配辣椒",
											"萝卜～好萝卜",
											"废城君",
											"E佬细节鬼才",
											"感到棘手要怀念谁？",
											"半价小薯片",
											"JK欧拉欧拉欧拉",
											"新年快乐",
											"乔姐带你飞",
											"12345678？",
											"缘之空",
											"小小恐龙",
											"教主：杀我！",
											"才思泉涌的司马",
											"我是好人",
											"喜怒无常的大宝",
											"黄赌毒",
											"阴间杀～秋",
											"敢于劈瓜的关羽",
											"萌新陆逊",
											"猫猫虫",
											"芽衣姐，我不想死---",
											"暮暮子",
										].randomGet(1))
							  )
					);
					//分包
					var getPack = function (name) {
						for (const pak in lib.characterSort) {
							for (const package in lib.characterSort[pak]) {
								if (lib.characterSort[pak][package].contains(name)) {
									if (pak == "standard" || package == "sp_waitforsort" || package == "sp_qifu" || package == "sp_others" || package == "sp_guozhan2" || pak == "old" || pak == "diy" || pak == "collab") return lib.translate[pak + "_character_config"];
									if (pak == "sp") {
										if (get.translation(package).length > 6) return get.translation(package).slice(0, 2);
									}
									if (pak == "sp2") {
										if (get.translation(package).length > 6) return get.translation(package).slice(3, 7);
									}
									if (pak == "mobile") {
										if (get.translation(package).length > 6) return "手杀异构";
									}
									if (pak == "WeChatkill") return "微信三国杀";
									if (pak == "tw") return "海外";
									if (pak == "MiNikill") return "欢乐三国杀";
									switch (package) {
										case "sp_decade":
										case "extra_decade":
											return "限定";
										case "extra_tw":
											return "海外";
										case "mobile_default":
										case "mobile_sunben":
											return "手杀";
										case "offline_piracyE":
											return "官盗E系列";
										default:
											return get.translation(package);
									}
								}
							}
						}
						for (const pak in lib.characterPack) {
							for (const namein in lib.characterPack[pak]) {
								if (name == namein) return get.translation(pak + "_character_config");
							}
						}
						return "暂无分包";
					};
					var packinfo = ui.create.div(".pack", getPack(name), dialog);

					leftPane.innerHTML = "<div></div>";
					/*    createButton(name, leftPane.firstChild);
					    createButton(name2, leftPane.firstChild);
					    if (name && name2) {
					      dialog.classList.remove('single');
					    } else {
					      dialog.classList.add('single');
					    }*/

					rightPane.innerHTML = "<div></div>";
					lib.setScroll(rightPane.firstChild);
					var oSkills = player.getSkills(null, false, false).slice(0);
					oSkills = oSkills.filter(function (skill) {
						if (!lib.skill[skill] || skill == "jiu") return false;
						if (lib.skill[skill].nopop || lib.skill[skill].equipSkill) return false;
						return lib.translate[skill + "_info"] && lib.translate[skill + "_info"] != "";
					});
					if (player == game.me && player.hiddenSkills.length) oSkills.addArray(player.hiddenSkills);

					var allShown = player.isUnderControl() || (!game.observe && game.me && game.me.hasSkillTag("viewHandcard", null, player, true));
					var shownHs = player.getShownCards();
					if (shownHs.length) {
						ui.create.div(".xcaption", player.getCards("h").some(card => !shownHs.includes(card)) ? "明置的手牌" : "手牌区域", rightPane.firstChild);
						shownHs.forEach(function (item) {
							var card = game.createCard(get.name(item, false), get.suit(item, false), get.number(item, false), get.nature(item, false));
							card.style.zoom = "0.6";
							rightPane.firstChild.appendChild(card);
						});
						if (allShown) {
							var hs = player.getCards("h");
							hs.removeArray(shownHs);
							if (hs.length) {
								ui.create.div(".xcaption", "其他手牌", rightPane.firstChild);
								hs.forEach(function (item) {
									var card = game.createCard(get.name(item, false), get.suit(item, false), get.number(item, false), get.nature(item, false));
									card.style.zoom = "0.6";
									rightPane.firstChild.appendChild(card);
								});
							}
						}
					} else if (allShown) {
						var hs = player.getCards("h");
						if (hs.length) {
							ui.create.div(".xcaption", "手牌区域", rightPane.firstChild);
							hs.forEach(function (item) {
								var card = game.createCard(get.name(item, false), get.suit(item, false), get.number(item, false), get.nature(item, false));
								card.style.zoom = "0.6";
								rightPane.firstChild.appendChild(card);
							});
						}
					}

					if (oSkills.length) {
						ui.create.div(".xcaption", "武将技能", rightPane.firstChild);
						oSkills.forEach(function (name) {
							if (player.forbiddenSkills[name]) {
								if (player.forbiddenSkills[name].length) ui.create.div(".xskill", "<div data-color>" + '<span style="opacity:0.5">' + "【" + lib.translate[name] + "】" + "</span>" + "</div>" + "<div>" + '<span style="opacity:0.5">' + "（与" + get.translation(player.forbiddenSkills[name]) + "冲突）" + get.skillInfoTranslation(name, player) + "</span>" + "</div>", rightPane.firstChild);
								else ui.create.div(".xskill", "<div data-color>" + '<span style="opacity:0.5">' + "【" + lib.translate[name] + "】" + "</span>" + "</div>" + "<div>" + '<span style="opacity:0.5">' + "（双将禁用）" + get.skillInfoTranslation(name, player) + "</span>" + "</div>", rightPane.firstChild);
							} else if (player.hiddenSkills.includes(name)) {
								if (lib.skill[name].preHidden && get.mode() == "guozhan") {
									var id = name + "_idx";
									id = ui.create.div(".xskill", "<div data-color>" + '<span style="opacity:0.5">' + "【" + lib.translate[name] + "】" + "</span>" + "</div>" + "<div>" + '<span style="opacity:0.5">' + get.skillInfoTranslation(name, player) + "</span>" + '<br><div class="underlinenode on gray" style="position:relative;padding-left:0;padding-top:7px">预亮技能</div>' + "</div>", rightPane.firstChild);
									var underlinenode = id.querySelector(".underlinenode");
									if (_status.prehidden_skills.includes(name)) underlinenode.classList.remove("on");
									underlinenode.link = name;
									underlinenode.listen(ui.click.hiddenskill);
								} else ui.create.div(".xskill", "<div data-color>" + '<span style="opacity:0.5">' + "【" + lib.translate[name] + "】" + "</span>" + "</div>" + "<div>" + '<span style="opacity:0.5">' + get.skillInfoTranslation(name, player) + "</span>" + "</div>", rightPane.firstChild);
							} else if (!player.getSkills().includes(name) || player.awakenedSkills.includes(name)) ui.create.div(".xskill", "<div data-color>" + '<span style="opacity:0.5">' + "【" + lib.translate[name] + "】" + "</span>" + "</div>" + "<div>" + '<span style="opacity:0.5">' + get.skillInfoTranslation(name, player) + "</span>" + "</div>", rightPane.firstChild);
							else if (lib.skill[name].frequent || lib.skill[name].subfrequent) {
								var id = name + "_id";
								id = ui.create.div(".xskill", "<div data-color>" + "【" + lib.translate[name] + "】" + "</div>" + "<div>" + get.skillInfoTranslation(name, player) + '<br><div class="underlinenode on gray" style="position:relative;padding-left:0;padding-top:7px">自动发动</div>' + "</div>", rightPane.firstChild);
								var underlinenode = id.querySelector(".underlinenode");
								if (lib.skill[name].frequent) {
									if (lib.config.autoskilllist.includes(name)) {
										underlinenode.classList.remove("on");
									}
								}
								if (lib.skill[name].subfrequent) {
									for (var j = 0; j < lib.skill[name].subfrequent.length; j++) {
										if (lib.config.autoskilllist.includes(name + "_" + lib.skill[name].subfrequent[j])) {
											underlinenode.classList.remove("on");
										}
									}
								}
								if (lib.config.autoskilllist.includes(name)) underlinenode.classList.remove("on");
								underlinenode.link = name;
								underlinenode.listen(ui.click.autoskill2);
							} else if (lib.skill[name].clickable && player.isIn() && player.isUnderControl(true)) {
								var id = name + "_idy";
								id = ui.create.div(".xskill", "<div data-color>" + "【" + lib.translate[name] + "】" + "</div>" + "<div>" + get.skillInfoTranslation(name, player) + '<br><div class="menubutton skillbutton" style="position:relative;margin-top:5px">点击发动</div>' + "</div>", rightPane.firstChild);
								var intronode = id.querySelector(".skillbutton");
								if (!_status.gameStarted || (lib.skill[name].clickableFilter && !lib.skill[name].clickableFilter(player))) {
									intronode.classList.add("disabled");
									intronode.style.opacity = 0.5;
								} else {
									intronode.link = player;
									intronode.func = lib.skill[name].clickable;
									intronode.classList.add("pointerdiv");
									intronode.listen(ui.click.skillbutton);
								}
							} else ui.create.div(".xskill", "<div data-color>【" + lib.translate[name] + "】</div>" + "<div>" + get.skillInfoTranslation(name, player) + "</div>", rightPane.firstChild);
						});
					}

					var eSkills = player.getVCards("e");
					if (eSkills.length) {
						ui.create.div(".xcaption", "装备区域", rightPane.firstChild);
						eSkills.forEach(function (card) {
							let str = [get.translation(card), get.translation(card.name + "_info")];
							const cards = card.cards;
							if (cards?.length && (cards?.length !== 1 || cards[0].name !== card.name)) str[0] += "（" + get.translation(card.cards) + "）";
							const special = card.cards?.find(item => item.name == card.name && lib.card[item.name]?.cardPrompt);
							if (special) str[1] = lib.card[special.name].cardPrompt(special);
							ui.create.div(".xskill", "<div data-color>" + str[0] + "</div><div>" + str[1] + "</div>", rightPane.firstChild);
						});
					}

					var judges = player.getVCards("j");
					if (judges.length) {
						ui.create.div(".xcaption", "判定区域", rightPane.firstChild);
						judges.forEach(function (card) {
							const cards = card.cards;
							let str = get.translation(card);
							if (cards?.length && (cards?.length !== 1 || cards[0].name !== card.name)) {
								if (!lib.card[card]?.blankCard || player.isUnderControl(true)) str += "（" + get.translation(cards) + "）";
							}
							ui.create.div(".xskill", "<div data-color>" + str + "</div><div>" + get.translation(card.name + "_info") + "</div>", rightPane.firstChild);
						});
					}

					container.classList.remove("hidden");
					game.pause2();
				};
				plugin.characterDialog = container;
				container.show(this);
			},
		},
	};
	return plugin;
});
