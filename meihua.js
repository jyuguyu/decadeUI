"use strict";
decadeModule.import(function (lib, game, ui, get, ai, _status) {
	//神势力选择
	lib.skill._group = {
		charlotte: true,
		ruleSkill: true,
		trigger: {
			global: "gameStart",
			player: "enterGame",
		},
		forced: true,
		popup: false,
		silent: true,
		priority: 520,
		firstDo: true,
		direct: true,
		filter(event, player) {
			// 检查是否有特定技能和状态
			if (player.hasSkill("mbjsrgxiezheng")) return false;
			// 检查游戏模式
			if (!["doudizhu", "versus"].includes(get.mode())) return false;
			// 检查角色类型
			if (lib.character[player.name1][1] === "shen") return true;
		},
		content() {
			"step 0";
			const name = player.name1;
			let options;
			options = lib.group.filter(group => group !== "shen");
			player.chooseControl(options).set("prompt", "请选择神武将的势力");
			("step 1");
			if (result.control) {
				player.changeGroup(result.control);
			}
		},
	};

	//武将背景
	if (lib.config["extension_十周年UI_wujiangbeijing"]) {
		lib.skill._wjBackground = {
			charlotte: true,
			forced: true,
			popup: false,
			trigger: {
				global: ["gameStart", "modeSwitch"],
				player: ["enterGame", "showCharacterEnd"],
			},
			priority: 100,
			content() {
				const setBackground = player => {
					if (!player) return;
					// 检查游戏模式和双将设置
					const mode = get.mode();
					const isDoubleCharacter = lib.config.mode_config[mode] && lib.config.mode_config[mode].double_character;
					if (mode === "guozhan" || isDoubleCharacter) {
						// 国战模式或开启双将时使用bj2
						player.setAttribute("data-mode", "guozhan");
					} else {
						// 其他情况使用bj1
						player.setAttribute("data-mode", "normal");
					}
				};
				// 为所有玩家设置背景
				game.players.forEach(setBackground);
				game.dead.forEach(setBackground);
			},
		};
		// 添加全局技能
		if (!_status.connectMode) {
			game.addGlobalSkill("_wjBackground");
		}
		// 在游戏开始时检查并设置背景
		lib.arenaReady.push(function () {
			const mode = get.mode();
			const isDoubleCharacter = lib.config.mode_config[mode] && lib.config.mode_config[mode].double_character;
			if (mode === "guozhan" || isDoubleCharacter) {
				document.body.setAttribute("data-mode", "guozhan");
			} else {
				document.body.setAttribute("data-mode", "normal");
			}
		});
	}

	// 全选按钮功能 by奇妙工具做修改
	lib.hooks.checkBegin.add("Selectall", () => {
		const event = get.event();
		const needMultiSelect = event.selectCard?.[1] > 1;
		// 创建或移除全选按钮
		if (needMultiSelect && !ui.Selectall) {
			ui.Selectall = ui.create.control("全选", () => {
				// 选择所有手牌
				ai.basic.chooseCard(card => (get.position(card) === "h" ? 114514 : 0));
				// 执行自定义添加卡牌函数
				event.custom?.add?.card?.();
				// 更新选中卡牌显示
				ui.selected.cards?.forEach(card => card.updateTransform(true));
			});
		} else if (!needMultiSelect) {
			removeCardQX();
		}
	});
	lib.hooks.uncheckBegin.add("Selectall", () => {
		if (get.event().result?.bool) {
			removeCardQX();
		}
	});
	// 抽取移除按钮的公共函数
	const removeCardQX = () => {
		if (ui.Selectall) {
			ui.Selectall.remove();
			delete ui.Selectall;
		}
	};

	// 局内交互优化
	if (lib.config["extension_十周年UI_jiaohuyinxiao"]) {
		lib.skill._useCardAudio = {
			trigger: {
				player: "useCard",
			},
			forced: true,
			popup: false,
			priority: -10,
			content() {
				let card = trigger.card;
				let cardType = get.type(card);
				let cardName = get.name(card);
				let cardNature = get.nature(card);
				if (cardType == "basic") {
					switch (cardName) {
						case "sha":
							if (cardNature == "fire") {
								game.playAudio("..", "extension", "十周年UI", "audio/GameShowCard");
							} else if (cardNature == "thunder") {
								game.playAudio("..", "extension", "十周年UI", "audio/GameShowCard");
							} else {
								game.playAudio("..", "extension", "十周年UI", "audio/GameShowCard");
							}
							break;
						case "shan":
							game.playAudio("..", "extension", "十周年UI", "audio/GameShowCard");
							break;
						case "tao":
							game.playAudio("..", "extension", "十周年UI", "audio/GameShowCard");
							break;
						case "jiu":
							game.playAudio("..", "extension", "十周年UI", "audio/GameShowCard");
							break;
						default:
							game.playAudio("..", "extension", "十周年UI", "audio/GameShowCard");
					}
				} else if (cardType == "trick") {
					if (get.tag(card, "damage")) {
						game.playAudio("..", "extension", "十周年UI", "audio/GameShowCard");
					} else if (get.tag(card, "recover")) {
						game.playAudio("..", "extension", "十周年UI", "audio/GameShowCard");
					} else {
						game.playAudio("..", "extension", "十周年UI", "audio/GameShowCard");
					}
				} else if (cardType == "equip") {
					let equipType = get.subtype(card);
					switch (equipType) {
						case "equip1": // 武器
							game.playAudio("..", "extension", "十周年UI", "audio/weapon_equip");
							break;
						case "equip2": // 防具
							game.playAudio("..", "extension", "十周年UI", "audio/horse_equip");
							break;
						case "equip3": // -1马
							game.playAudio("..", "extension", "十周年UI", "audio/armor_equip");
							break;
						case "equip4": // +1马
							game.playAudio("..", "extension", "十周年UI", "audio/armor_equip");
							break;
						case "equip5": // 宝物
							game.playAudio("..", "extension", "十周年UI", "audio/horse_equip");
							break;
					}
				}
			},
		};
		if (!_status.connectMode) {
			game.addGlobalSkill("_useCardAudio");
		}
		if (!_status.connectMode) {
			game.addGlobalSkill("_phaseStartAudio");
		}
		// 处理按钮点击音效
		document.body.addEventListener("mousedown", function (e) {
			const target = e.target;
			if (target.closest("#dui-controls")) {
				if (target.classList.contains("control") || target.parentElement.classList.contains("control")) {
					game.playAudio("..", "extension", "十周年UI", "audio/BtnSure");
				}
			}
			if (target.classList.contains("menubutton") || target.classList.contains("button")) {
				game.playAudio("..", "extension", "十周年UI", "audio/card_click");
			}
			if (target.classList.contains("card")) {
				game.playAudio("..", "extension", "十周年UI", "audio/card_click");
			}
		});
		// 处理按钮缩放效果
		document.body.addEventListener("mousedown", function (e) {
			const control = e.target.closest(".control");
			if (control && !control.classList.contains("disabled")) {
				control.style.transform = "scale(0.95)";
				control.style.filter = "brightness(0.9)";
				setTimeout(() => {
					control.style.transform = "";
					control.style.filter = "";
				}, 100);
			}
		});
	}
	
	/*装备牌dom操作*/
	lib.element.player.$addVirtualEquip = function (card, cards) {
		const player = this;
		const isViewAsCard = cards.length !== 1 || cards[0].name !== card.name,
			info = get.info(card, false);
		let cardShownName = get.translation(card.name);
		const cardx = isViewAsCard ? game.createCard(card.name, cards.length == 1 ? get.suit(cards[0]) : "none", cards.length == 1 ? get.number(cards[0]) : 0) : cards[0];
		cardx.fix();
		const cardSymbol = Symbol("card");
		cardx.cardSymbol = cardSymbol;
		cardx[cardSymbol] = card;
		if (card.subtypes) cardx.subtypes = card.subtypes;
		cardx.style.transform = "";
		cardx.classList.remove("drawinghidden");
		delete cardx._transform;
		const suit = get.translation(cardx.suit),
			number = get.strNumber(cardx.number);
		if (isViewAsCard) {
			cardx.cards = cards || [];
			cardx.viewAs = card.name;
			cardx.node.name2.innerHTML = `${suit}${number} [${cardShownName}]`;
			cardx.classList.add("fakeequip");
		} else {
			delete cardx.viewAs;
			cardx.node.name2.innerHTML = `${suit}${number} ${cardShownName}`;
			cardx.classList.remove("fakeequip");
		}
		let equipped = false,
			equipNum = get.equipNum(cardx);
		/* 十周年装备 */
		cardx.node.name2.innerHTML = "";
		if (!nameH) var nameH = document.createElement("span");
		if (!suitH) var suitH = document.createElement("span");
		nameH.textContent = cardShownName;
		suitH.textContent = `${suit}${number}`;
		cardx.node.name2.appendChild(suitH);
		cardx.node.name2.appendChild(nameH);
		if (lib.config.extension_十周年UI_newDecadeStyle == "on") {
			var SSEquip = {
				如意金箍棒: "金箍棒",
				木牛流马: "木牛",
				爪黄飞电: "爪黄",
				吴六剑: "吴六剑2",
				机关弩: "机关弩1",
				雌雄双股剑: "2雌雄劍",
				方天画戟: "4方天戟",
				贯石斧: "3贯石斧",
				寒冰剑: "2寒冰剑",
				麒麟弓: "5麒麟弓",
				青釭剑: "2青釭剑",
				青龙偃月刀: "3青龙刀",
				丈八蛇矛: "3丈八矛",
				古锭刀: "2古锭刀",
				朱雀羽扇: "4朱雀扇",
				七宝刀: "2七宝刀",
				银月枪: "3银月枪",
				衠钢槊: "3衠钢槊",
				飞龙夺凤: "2飞龙刀",
				三尖两刃刀: "3三尖刀",
				诸葛连弩: "1諸葛弩",
				倚天剑: "2倚天剑",
				七星宝刀: "2七星刀",
				折戟: "0折戟",
				无锋剑: "1无锋剑",
				涯角枪: "3涯角枪",
				五行鹤翎扇: "4五行扇",
				断剑: "0断剑",
				霹雳车: "9霹雳车",
				水波剑: "2水波剑",
				红缎枪: "3红缎枪",
				天雷刃: "4天雷刃",
				混毒弯匕: "1混毒匕",
				元戎精械弩: "3精械弩",
				乌铁锁链: "3铁锁链",
				太极拂尘: "5太极拂",
				灵宝仙壶: "3灵宝壶",
				冲应神符: "冲应符",
				先天八卦阵: "先天八卦",
				照月狮子盔: "狮子盔",
				白银狮子: "白银狮",
				仁王金刚盾: "金剛盾",
				桐油百韧甲: "百韧甲",
				定澜夜明珠: "夜明珠",
			};
		}
		if (lib.config.extension_十周年UI_newDecadeStyle == "off") {
			var SSEquip = {
				木牛流马: "木牛",
				吴六剑: "吴六剑2",
				机关弩: "机关弩1",
				雌雄双股剑: "雌雄剑2",
				方天画戟: "方天戟4",
				贯石斧: "贯石斧3",
				寒冰剑: "寒冰剑2",
				麒麟弓: "麒麟弓5",
				青釭剑: "青釭剑2",
				青龙偃月刀: "青龙刀3",
				丈八蛇矛: "丈八矛3",
				古锭刀: "古锭刀2",
				朱雀羽扇: "朱雀扇4",
				七宝刀: "七宝刀2",
				银月枪: "银月枪3",
				衠钢槊: "衠钢槊3",
				飞龙夺凤: "飞龙刀2",
				三尖两刃刀: "三尖刀3",
				诸葛连弩: "诸葛弩1",
				倚天剑: "倚天剑2",
				七星宝刀: "七星刀2",
				折戟: "折戟0",
				无锋剑: "无锋剑1",
				涯角枪: "涯角枪3",
				五行鹤翎扇: "五行扇4",
				断剑: "断剑0",
				霹雳车: "霹雳车9",
				水波剑: "水波剑2",
				红缎枪: "红缎枪3",
				天雷刃: "天雷刃4",
				混毒弯匕: "混毒匕1",
				元戎精械弩: "精械弩3",
				乌铁锁链: "铁锁链3",
				太极拂尘: "太极拂5",
				灵宝仙壶: "灵宝壶3",
				冲应神符: "冲应符",
				先天八卦阵: "先天八卦",
				照月狮子盔: "狮子盔",
				白银狮子: "白银狮",
				仁王金刚盾: "金刚盾",
				桐油百韧甲: "百韧甲",
				定澜夜明珠: "夜明珠",
				镔铁双戟: "镔铁戟3",
				玲珑狮蛮带: "狮蛮带",
				束发紫金冠: "束发金冠",
				红棉百花袍: "百花袍",
				虚妄之冕: "虚妄之冕",
				无双方天戟: "无双戟4",
				鬼龙斩月刀: "斩月刀3",
				赤焰镇魂琴: "镇魂琴4",
			};
		}
		if (lib.config.extension_十周年UI_newDecadeStyle == "off") {
			if (!ele) if (!ele) var ele = cardx.node.name2;
			if (!(ele.length > 1)) {
				var e = ele.children;
				var subtype = cardx.getAttribute("data-card-subtype");
				var cardName = cardx.getAttribute("data-card-name");
				if (!(e[0].nodeName == "IMG")) {
					var colour = cardx.getAttribute("data-suit");
					if (subtype) {
						for (var i = 0; i < e.length; i++) {
							if (i == 0) {
								if (colour == "heart" || colour == "diamond") e[i].style.color = "#ef1806";
								else e[i].style.color = "#8dbede";
								e[i].style.fontSize = "13px";
								e[i].style.position = "absolute";
								e[i].style.left = "11%";
								e[i].style.top = "1px";
							} else {
								if (subtype == "equip3" || subtype == "equip4") {
									var b = subtype == "equip3" ? "+" : "-";
									var newele = document.createElement("img");
									newele.setAttribute("src", decadeUIPath + "/image/ass/" + b + "1.png");
									newele.style.height = "90%";
									newele.onerror = function () {
										this.src = decadeUIPath + "/image/ass/weizhi.png";
										this.onerror = null;
									};
									e[0].style.left = "18%";
									e[0].parentNode.insertBefore(newele, e[0]);
									e[i].parentNode.removeChild(e[i + 1]);
									continue;
								} else {
									e[i].style.color = "#e9e8e3";
									e[i].style.left = "30%";
									e[i].style.position = "absolute";
								}
								e[i].style.fontSize = "16px";
							}
							e[i].style.textShadow = "1px 0 0 black, 0 1px 0 black, -1px 0 0 black, 0 -1px 0 black";
						}
						if (!(subtype == "equip3" || subtype == "equip4")) {
							var newele = document.createElement("img");
							newele.setAttribute("src", decadeUIPath + "/image/ass/" + cardName + ".png");
							newele.style.height = "80%";
							newele.onerror = function () {
								this.src = decadeUIPath + "/image/ass/weizhi.png";
								this.onerror = null;
							};
							if (SSEquip) {
								var t = e[1].textContent;
								if (SSEquip[t]) {
									e[1].textContent = SSEquip[t];
								}
							}
							e[0].parentNode.insertBefore(newele, e[0]);
						}
					}
				} else {
					if (subtype) {
						if (SSEquip) {
							var t = e[2].textContent;
							if (SSEquip[t]) {
								e[2].textContent = SSEquip[t];
	
								if (!(subtype == "equip3" || subtype == "equip4")) {
									e[0].setAttribute("src", decadeUIPath + "/image/ass/" + cardName + ".png");
								}
							}
						}
					}
				}
			}
		} else {
			/*十周年装备*/
			if (!ele) var ele = cardx.node.name2;
			if (!lib.config["extension_Epix_SSEquip"]) {
				if (!(ele.length > 1)) {
					var e = ele.children;
					var cardType = cardx.getAttribute("data-card-type");
					var subtype = cardx.getAttribute("data-card-subtype");
					var cardName = cardx.getAttribute("data-card-name");
					if (!(e[0].nodeName == "IMG")) {
						var colour = cardx.getAttribute("data-suit");
						var nature = cardx.getAttribute("data-nature");
						if (subtype) {
							for (var i = 0; i < e.length; i++) {
								//2个武器，覆盖 判断拓展装备
								//  this.style.top = "";
								if (i == 0) {
									if (colour == "heart" || colour == "diamond") {
										e[i].style.color = "#ef1806";
										//    e[i].style.fontFamily = "suits";
										e[i].style.position = "absolute";
										// e[i].style.transform = "scale(0.7,1.1)";
										e[i].style.direction = "rtl";
										e[i].style.marginLeft = "68px"; //装备花色字体整体右移
										e[i].style.marginTop = "2px"; //花色字体上下
										e[i].style.fontSize = "11px"; //花色大小
										e[i].style.letterSpacing = "-1px";
									} else {
										e[i].style.color = "#181818";
										e[i].style.fontSize = "12px"; //花色大小
										//    e[i].style.fontFamily = "suits";
										e[i].style.position = "absolute";
										// e[i].style.transform = "scale(0.7,1.1)";
										e[i].style.direction = "rtl";
										e[i].style.letterSpacing = "-1px";
										e[i].style.marginLeft = "68px"; //装备花色字体整体右移
										e[i].style.marginTop = "2px"; //花色字体上下
										if (colour == "none") e[i].style.color = "#482a0a";
									}
								} else {
									if (cardName.indexOf("feichu_") == -1) {
										e[i].style.direction = "rtl";
										e[i].style.color = "#482a0a";
										e[i].style.marginLeft = "-8.5px";
										e[i].style.letterSpacing = "1px";
	
										e[i].style.fontSize = "15px"; //装备字体大小
										e[i].style.fontFamily = "yuanli";
										e[i].style.position = "absolute";
										e[i].style.marginTop = "2px"; //装备字体上下
									} else {
										e[i].style.display = "none";
									}
								}
								//	e[i].style.textShadow = "-1.3px 0px 2.2px #fff3d6, 0px -1.3px 2.2px #fff3d6, 1.3px 0px 2.2px #fff3d6 ,0px 1.3px 2.2px #fff3d6"; // 装备字体描边显示
							}
							var newele = document.createElement("img");
							if (cardName != "liulongcanjia" && cardName != "mengchong" && cardName.indexOf("qiexie") == "-1") {
								newele.setAttribute("src", decadeUIPath + "/image/ass/decade/" + subtype + ".png");
							} else if (cardName.indexOf("qiexie") != "-1") {
								e[0].innerHTML = "";
								newele.setAttribute("src", decadeUIPath + "/image/ass/decade/qiexie.png");
							} else {
								newele.setAttribute("src", decadeUIPath + "/image/ass/decade/liulongcanjia.png");
							}
							if (cardName.indexOf("feichu_") != -1) newele.setAttribute("src", decadeUIPath + "/image/ass/decade/" + cardName + ".png");
	
							newele.style.opacity = "0.83"; //图标透明度
							newele.style.width = "120%";
							// newele.style.borderRadius = "5px";
							newele.style.height = "112%";
							/*装备栏宽度*/
							if (lib.config.mode != "guozhan") {
								newele.style.marginLeft = " -2px"; /*-7.5*/
								//newele.style.marginRight = "-10px";
							} else {
								newele.style.width = "120%";
								newele.style.marginLeft = "-2px"; /*-5.5*/
								// newele.style.marginRight = "-1px";
							}
							if (SSEquip) {
								var t = e[1].textContent;
								if (SSEquip[t]) {
									e[1].textContent = SSEquip[t];
								}
							}
							if (lib.config.extension_十周年UI_aloneEquip) {
								if (get.player() != game.me) {
									e[0].parentNode.insertBefore(newele, e[0]);
								}
							} else {
								e[0].parentNode.insertBefore(newele, e[0]);
							}
						} else if (cardType) {
							for (var i = 0; i < e.length; i++) {
								if (i == 0) e[i].innerHTML = "";
								else {
									if (cardType == "basic") e[i].innerHTML = "基本牌";
									else if (cardType == "trick" || cardType == "delay") e[i].innerHTML = "锦囊牌";
									else if (cardType == "equip") e[i].innerHTML = "装备牌";
									e[i].style.direction = "rtl";
									e[i].style.color = "#482a0a";
									e[i].style.marginLeft = "-8.5px";
									e[i].style.letterSpacing = "1px";
	
									e[i].style.fontSize = "15px"; //装备字体大小
									e[i].style.fontFamily = "yuanli";
									e[i].style.position = "absolute";
								}
							}
	
							var newele = document.createElement("img");
							newele.setAttribute("src", decadeUIPath + "/image/ass/decade/bg.png");
							newele.style.opacity = "0.83"; //图标透明度
							newele.style.width = "100%";
							newele.style.height = "112%";
							if (cardx.subtypes) e[0].parentNode.parentNode.classList.add(cardx.subtypes[0]);
							e[0].parentNode.style.setProperty("width", "90px", "important");
							e[0].parentNode.style.left = "-8px";
							if (lib.config.extension_十周年UI_aloneEquip) {
								if (get.player() != game.me) {
									e[0].parentNode.insertBefore(newele, e[0]);
								}
							} else {
								e[0].parentNode.insertBefore(newele, e[0]);
							}
						}
					} else {
						if (subtype) {
							if (SSEquip) {
								var t = e[2].textContent;
								if (SSEquip[t]) {
									e[2].textContent = SSEquip[t];
								}
							}
						}
					}
				}
			}
		}
		//分割
		if (player.node.equips.childNodes.length) {
			for (let i = 0; i < player.node.equips.childNodes.length; i++) {
				if (get.equipNum(player.node.equips.childNodes[i]) >= equipNum) {
					equipped = true;
					player.node.equips.insertBefore(cardx, player.node.equips.childNodes[i]);
					break;
				}
			}
		}
		if (equipped === false) {
			player.node.equips.appendChild(cardx);
			if (cards?.length && _status.discarded) _status.discarded.removeArray(cards);
		}
	};
});
